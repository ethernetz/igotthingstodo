import type { Auth, User } from 'firebase/auth';
import { derived, type Readable } from 'svelte/store';
import { auth, firestore } from '$lib/stores';
import type { Firestore } from 'firebase/firestore';

function createUser() {
	let userCache: User | null | undefined;

	const { subscribe } = derived<[Readable<Auth>, Readable<Firestore>], User | null>(
		[auth, firestore],
		([$auth, $firestore], set) => {
			/** Firebase auth or firestore is not ready yet */
			if (!$auth || !$firestore) return;
			/** User is already cached, no reason to initialize */
			if (userCache !== undefined) return;

			let unsubAuth: () => void;

			async function init() {
				const { onAuthStateChanged } = await import('firebase/auth');
				unsubAuth = onAuthStateChanged($auth, async (nextUser) => {
					/** User is not signed in yet */
					if (!nextUser) {
						set(null);
						return;
					}
					set(nextUser);
				});
			}
			init();

			return () => {
				userCache = undefined;
				unsubAuth?.();
			};
		}
	);

	return { subscribe };
}

export const user = createUser();
