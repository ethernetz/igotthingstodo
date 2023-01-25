import type { User } from 'firebase/auth';
import { derived, type Readable } from 'svelte/store';
import { user, firestore } from '$lib/stores';
import type { Firestore } from 'firebase/firestore';

function createUserData() {
	let userDataCache: User | null | undefined;

	const { subscribe } = derived<[Readable<User | null>, Readable<Firestore>], User | null>(
		[user, firestore],
		([$user, $firestore], set) => {
			/** Firebase user or firestore is not ready yet */
			if ($user === undefined || !$firestore) return;
			/** User is already cached, no reason to initialize */
			if (userDataCache !== undefined) return;

			let unsubUser: () => void;

			async function init() {
				/** User is not signed in yet */
				if (!$user) {
					set(null);
					return;
				}
				const userRef = await firestore.user($firestore, $user.uid);
				const { onSnapshot } = await import('firebase/firestore');
				unsubUser = onSnapshot(userRef, (userDocSnap) => {
					const userData = userDocSnap.data();
					/** User just created an account but it hasn't been added to firestore yet */
					if (!userData) {
						return;
					}
					set(userData);
				});
			}
			init();

			return () => {
				userDataCache = undefined;
				unsubUser?.();
			};
		}
	);

	return {
		subscribe
	};
}

export const userData = createUserData();
