<script lang="ts">
	import { auth, user, userData, todos, AuthProviderType } from '$lib/stores';
	let todoInput = '';
</script>

<h1>igotthingstodo</h1>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

{#if $user}
	<button on:click={() => auth.signOut()}>Sign out</button>
{:else}
	<div>
		<button on:click={() => auth.signInWith(AuthProviderType.Google)}>Sign in with google</button>
		<button on:click={() => auth.signInWith(AuthProviderType.Apple)}>Sign in with apple</button>
	</div>
{/if}

{#if $user}
	<div>I am signed in!</div>
	<div>Name: {$user?.displayName}</div>

	{#if $userData}
		<form
			on:submit|preventDefault={() => {
				todos.addTodo(todoInput);
				todoInput = '';
			}}
		>
			<label>
				<input
					name="description"
					bind:value={todoInput}
					type="text"
					placeholder="new todo item.."
					required
				/>
			</label>
		</form>

		{#if $todos}
			<ul>
				{#each $todos as todo}
					<li class="todo">
						<form on:submit|preventDefault={() => todos.deleteTodo(todo.id)}>
							<input type="hidden" name="id" value={todo.id} />
							<button aria-label="Mark as complete">✔</button>
							{todo.description}
						</form>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
{/if}
