import type { Readable } from 'svelte/store';

export async function ensureStoreValue<T>(store: Readable<T>) {
	const storeHasValue = new Promise<T>((resolve) => {
		const unsubFunctions = store.subscribe((storeValue) => {
			if (!storeValue) return;
			resolve(storeValue);
			unsubFunctions();
		});
	});

	return storeHasValue;
}
