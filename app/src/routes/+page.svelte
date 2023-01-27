<script lang="ts">
	import { auth, user, userData, todos, signInModal } from '$lib/stores';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import FireIcon from '$lib/components/FireIcon.svelte';

	let todoInput = '';
</script>

<nav class="flex justify-between px-16 pt-8 mb-8 items-center">
	<div class="flex justify-center items-center">
		<h1 class="text-white text-xl font-barlow font-bold mr-1">i got things todo</h1>
		<FireIcon />
	</div>
	{#if $user}
		<button class="text-white text-xl font-barlow opacity-60" on:click={() => auth.signOut()}
			>Logout</button
		>
	{:else}
		<button class="text-white text-xl font-barlow" on:click={signInModal.show}>Login</button>
	{/if}
</nav>

{#if $user}
	{#if $userData}
		<form
			on:submit|preventDefault={() => {
				todos.addTodo(todoInput);
				todoInput = '';
			}}
			class="text-center"
		>
			<input
				name="add a todo"
				bind:value={todoInput}
				type="text"
				placeholder="today i want to..."
				required
				class="w-3/4 max-w-lg mwd bg-transparent border-b-2 outline-0 border-orange-500 focus:border-opacity-40 text-white font-rubik text-2xl caret-orange-500"
			/>
		</form>

		{#if $todos}
			<ul class="w-3/4 max-w-lg self-center m-auto mt-6">
				{#each $todos as todo}
					<li
						on:click={() => todos.toggleTodo(todo)}
						on:keydown={() => todos.toggleTodo(todo)}
						class="text-white font-rubik text-2xl  break-all flex hover:before:content-checkbox_checked
						{todo.complete ? 'before:content-checkbox_checked' : 'before:content-checkbox_unchecked'}
						{todo.complete && 'opacity-20'}
						before:mr-2  before:mt-1 cursor-pointer"
					>
						{todo.description}
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
{/if}

<SignInModal />
