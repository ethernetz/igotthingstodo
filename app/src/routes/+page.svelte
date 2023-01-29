<script lang="ts">
	import { auth, user, userData, todos, signInModal, completedTodos } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import FireIcon from '$lib/components/FireIcon.svelte';

	let todoInput = '';
</script>

<div class="flex h-full flex-col">
	<nav class="mb-8 flex items-center justify-between px-16 pt-8">
		<div class="flex items-center justify-center">
			<h1 class="font-barlow mr-1 text-xl font-bold text-white">i got things todo</h1>
			<FireIcon />
		</div>
		{#if $user}
			<button
				class="font-barlow text-xl text-white opacity-20 hover:opacity-100"
				on:click={() => auth.signOut()}>Logout</button
			>
		{:else}
			<button class="font-barlow text-xl text-white" on:click={signInModal.show}>Login</button>
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
					class="mwd font-rubik w-3/4 max-w-lg border-b-2 border-orange-500 bg-transparent text-2xl text-white caret-orange-500 outline-0 focus:border-opacity-40"
				/>
			</form>

			{#if $todos}
				<ul class="m-auto mt-6 h-full w-3/4 max-w-lg self-center overflow-auto">
					{#each $todos as todo (todo.id)}
						<li
							on:click={() => todos.toggleTodo(todo)}
							on:keydown={() => todos.toggleTodo(todo)}
							animate:flip={{ duration: 200 }}
							class="font-rubik hoverable:hover:before:content-checkbox_checked flex cursor-pointer break-all text-2xl text-white before:mr-2 before:mt-1
								{todo.complete ? 'before:content-checkbox_checked' : 'before:content-checkbox_unchecked'} 
								{todo.complete && 'opacity-20'}"
						>
							{todo.description}
						</li>
					{/each}
				</ul>

				<button
					on:click={() => todos.deleteTodos($completedTodos)}
					class="class font-rubik mt-5 mb-10 h-10	w-fit self-center rounded-md border-2 border-white px-8 text-lg text-white opacity-20
					{$completedTodos.length === 0 && 'invisible'}"
				>
					clear completed todos
				</button>
			{/if}
		{/if}
	{/if}
</div>

<SignInModal />
