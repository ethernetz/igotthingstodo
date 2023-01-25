import type { Firestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import { dev } from '$app/environment';
import { derived, type Readable } from 'svelte/store';
import { app, type FirestoreTodo } from '$lib/stores';
import type { User } from 'firebase/auth';

const typedDoc = async <T>(firestore: Firestore, path: string, ...pathSegments: string[]) => {
	const { doc } = await import('firebase/firestore');
	return doc(firestore, path, ...pathSegments).withConverter({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		toFirestore: (data) => data as any,
		fromFirestore: (snap) => snap.data() as T
	});
};

const typedCollection = async <T>(
	firestore: Firestore,
	path: string,
	...pathSegments: string[]
) => {
	const { collection } = await import('firebase/firestore');
	return collection(firestore, path, ...pathSegments).withConverter({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		toFirestore: (data) => data as any,
		fromFirestore: (snap) => snap.data() as T
	});
};

const createFirestore = () => {
	let firestoreCache: Firestore;

	const { subscribe } = derived<Readable<FirebaseApp>, Firestore>(app, ($app, set) => {
		async function init() {
			/** Firebase app is not ready yet */
			if (!$app) return;
			/** Firestore is already created, no reason to initialize */
			if (firestoreCache) return;

			const { getFirestore, connectFirestoreEmulator } = await import('firebase/firestore');
			firestoreCache = getFirestore($app);
			if (dev) {
				connectFirestoreEmulator(firestoreCache, 'localhost', 8080);
			}
			set(firestoreCache);
		}

		init();
	});

	return {
		subscribe,
		user: (firestore: Firestore, uid: string) => typedDoc<User>(firestore, 'users', uid),
		userTodos: (firestore: Firestore, uid: string) =>
			typedCollection<FirestoreTodo>(firestore, 'users', uid, 'todos'),
		userTodo: (firestore: Firestore, uid: string, todoid: string) =>
			typedDoc<FirestoreTodo>(firestore, 'users', uid, 'todos', todoid)
	};
};

export const firestore = createFirestore();
