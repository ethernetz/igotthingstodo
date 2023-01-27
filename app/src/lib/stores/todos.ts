import type { User } from 'firebase/auth';
import { derived, type Readable } from 'svelte/store';
import { userData, firestore, ensureStoreValue } from '$lib/stores';
import type { Firestore, Timestamp } from 'firebase/firestore';

export interface FirestoreTodo {
	description: string;
	timestamp: Timestamp;
	complete: boolean;
}

export interface Todo extends FirestoreTodo {
	id: string;
}

function createUserData() {
	let todosCache: Todo | null | undefined;

	const { subscribe } = derived<[Readable<User | null>, Readable<Firestore>], Todo[] | null>(
		[userData, firestore],
		([$user, $firestore], set) => {
			/** Firebase user or firestore is not ready yet */
			if ($user === undefined || !$firestore) return;
			/** User is already cached, no reason to initialize */
			if (todosCache !== undefined) return;

			let unsubTodos: () => void;

			async function init() {
				/** User is not signed in yet */
				if (!$user) {
					set(null);
					return;
				}
				const todosRef = await firestore.userTodos($firestore, $user.uid);
				const { onSnapshot, orderBy, query } = await import('firebase/firestore');
				const todosQuery = query(todosRef, orderBy('timestamp'));
				unsubTodos = onSnapshot(todosQuery, (todosDocSnap) => {
					const todosData = todosDocSnap.docs;
					if (!todosData) {
						return;
					}
					set(todosData.map((todoSnapshot) => ({ ...todoSnapshot.data(), id: todoSnapshot.id })));
				});
			}
			init();

			return () => {
				todosCache = undefined;
				unsubTodos?.();
			};
		}
	);

	return {
		subscribe,
		addTodo: async (description: string) => {
			const $firestore = await ensureStoreValue(firestore);
			const $userData = await ensureStoreValue(userData);
			if (!$userData) return;

			const { addDoc, serverTimestamp } = await import('firebase/firestore');
			const todosRef = await firestore.userTodos($firestore, $userData.uid);
			await addDoc(todosRef, { description, timestamp: serverTimestamp(), complete: false });
		},
		completeTodo: async (todoid: string) => {
			const $firestore = await ensureStoreValue(firestore);
			const $userData = await ensureStoreValue(userData);
			if (!$userData) return;

			const { updateDoc } = await import('firebase/firestore');
			const todoRef = await firestore.userTodo($firestore, $userData.uid, todoid);
			await updateDoc(todoRef, { complete: true });
		},
		deleteTodo: async (todoid: string) => {
			const $firestore = await ensureStoreValue(firestore);
			const $userData = await ensureStoreValue(userData);
			if (!$userData) return;

			const { deleteDoc } = await import('firebase/firestore');
			const todoRef = await firestore.userTodo($firestore, $userData.uid, todoid);
			await deleteDoc(todoRef);
		}
	};
}

export const todos = createUserData();
