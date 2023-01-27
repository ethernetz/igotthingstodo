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
	<div class="fixed inset-0 z-50 justify-center items-center flex">
		<div class="w-3/4 my-6 max-w-md">
			<!--content-->
			<div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-800">
				<button on:click={signInModal.hide} class="absolute top-5 right-5"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="w-6 h-6 stroke-white stroke-2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<!--body-->
				<div class="p-12">
					<h1 class="text-2xl text-white font-barlow font-bold mb-6">Login</h1>
					<div class="flex flex-col gap-y-3">
						<button
							on:click={() => signInWith(AuthProviderType.Google)}
							class="h-10 rounded-lg bg-white hover:bg-gray-200 text-black font-medium  text-lg "
						>
							Sign in with Google
						</button>
						<button
							on:click={() => signInWith(AuthProviderType.Apple)}
							class="h-10 rounded-lg  bg-black hover:bg-neutral-900 text-white font-medium text-lg "
						>
							Sign in with Apple
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
