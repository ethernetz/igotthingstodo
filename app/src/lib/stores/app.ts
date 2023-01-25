import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { readable } from 'svelte/store';
import { browser } from '$app/environment';

const options: FirebaseOptions = {
	apiKey: 'AIzaSyAY77oU1Dm8ILl6zo-ZEjhakGBIXtpy-sI',
	authDomain: 'igotthingstodo-f37db.firebaseapp.com',
	projectId: 'igotthingstodo-f37db',
	storageBucket: 'igotthingstodo-f37db.appspot.com',
	messagingSenderId: '586614250242',
	appId: '1:586614250242:web:16c55798b4c28c2ab1801b',
	measurementId: 'G-WT6NZN5XK8'
};

/** Only initalize the app on-demand so no firebase JS will be used until needed 🔥
 *  Other stores like auth & user will derive from this */
function createApp() {
	let appCache: FirebaseApp;

	const { subscribe } = readable<FirebaseApp>(undefined, (set) => {
		/** Only use firebase sdk on client */
		if (!browser) return;
		/** App is already created, no reason to initialize */
		if (appCache) return;

		async function init() {
			const { initializeApp } = await import('firebase/app');
			appCache = initializeApp(options);
			set(appCache);
		}

		init();
	});

	return { subscribe };
}

export const app = createApp();
