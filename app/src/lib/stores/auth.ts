import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { dev } from '$app/environment';
import { derived, type Readable } from 'svelte/store';
import { app, ensureStoreValue } from '$lib/stores';

export enum AuthProviderType {
	Google = 'google',
	Apple = 'apple'
}

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

	async function providerFor(providerType: AuthProviderType) {
		switch (providerType) {
			case AuthProviderType.Google: {
				const { GoogleAuthProvider } = await import('firebase/auth');
				return new GoogleAuthProvider();
			}
			case AuthProviderType.Apple: {
				const { OAuthProvider } = await import('firebase/auth');
				return new OAuthProvider('apple.com');
			}
		}
	}

	async function signInWith(providerType: AuthProviderType) {
		const $auth = await ensureStoreValue(auth);
		const { signInWithPopup } = await import('firebase/auth');
		const provider = await providerFor(providerType);
		await signInWithPopup($auth, provider);
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
