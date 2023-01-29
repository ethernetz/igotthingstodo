<!-- Is signed in  -->
<script lang="ts">
	import { auth, AuthProviderType, signInModal } from '$lib/stores';

	async function signInWith(authProviderType: AuthProviderType) {
		try {
			await auth.signInWith(authProviderType);
			signInModal.hide();
		} catch {
			console.log('Something went wrong on signin');
		}
	}
</script>

{#if $signInModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<div class="my-6 w-3/4 max-w-md">
			<!--content-->
			<div class="relative flex w-full flex-col rounded-lg border-0 bg-zinc-800 shadow-lg">
				<button on:click={signInModal.hide} class="absolute top-5 right-5"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="h-6 w-6 stroke-white stroke-2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<!--body-->
				<div class="p-12">
					<h1 class="font-barlow mb-6 text-2xl font-bold text-white">Login</h1>
					<div class="flex flex-col gap-y-3">
						<button
							on:click={() => signInWith(AuthProviderType.Google)}
							class="h-10 rounded-lg bg-white text-lg font-medium text-black hover:bg-gray-200 "
						>
							Sign in with Google
						</button>
						<button
							on:click={() => signInWith(AuthProviderType.Apple)}
							class="h-10 rounded-lg  bg-black text-lg font-medium text-white hover:bg-neutral-900 "
						>
							Sign in with Apple
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
