import { writable } from 'svelte/store';

function createSignInModal() {
	const { subscribe, set } = writable<boolean>(false);

	return {
		subscribe,
		show: () => set(true),
		hide: () => set(false)
	};
}

export const signInModal = createSignInModal();
