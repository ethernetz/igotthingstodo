import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { dev } from '$app/environment';
import { derived, type Readable } from 'svelte/store';
import { app, ensureStoreValue } from '$lib/stores';
const createAuth = () => {
	let authCache: Auth;

	const { subscribe } = derived<Readable<FirebaseApp>, Auth>(app, ($app, set) => {
		async function init() {
			/** Firebase app is not ready yet */
			if (!$app) return;
			/** Auth is already created, no reason to initialize */
			if (authCache) return;

			const { getAuth, connectAuthEmulator } = await import('firebase/auth');
			authCache = getAuth($app);
			if (dev) {
				connectAuthEmulator(authCache, 'http://localhost:9099');
			}
			set(authCache);
		}

		init();
	});

	async function providerFor(name: string) {
		const { GoogleAuthProvider } = await import('firebase/auth');
		switch (name) {
			case 'google':
				return new GoogleAuthProvider();
			default:
				throw 'unknown provider ' + name;
		}
	}

	async function signInWith(name: string) {
		const $auth = await ensureStoreValue(auth);
		const { signInWithRedirect } = await import('firebase/auth');
		const provider = await providerFor(name);
		await signInWithRedirect($auth, provider);
	}

	async function signOut() {
		const $auth = await ensureStoreValue(auth);
		const { signOut } = await import('firebase/auth');
		await signOut($auth);
	}

	return {
		subscribe,
		signInWith,
		signOut
	};
};

export const auth = createAuth();
