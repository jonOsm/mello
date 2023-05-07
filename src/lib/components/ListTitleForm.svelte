<script lang="ts">
	import { enhance } from '$app/forms'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	export let id: string | null = null
	export let ordinal: number
	export let title: string
	export let boardId: string | null = null
	export let isEditingTitle: boolean = false

	let form: HTMLFormElement
	//leave comment for syntax highlighting + prettier
</script>

{#if isEditingTitle}
	<form bind:this={form} method="POST" action="?/lists/{id ? 'edit' : 'new'}" use:enhance>
		<input type="hidden" value={id} name="id" />
		<input type="hidden" value={ordinal} name="ordinal" />
		<input type="hidden" value={boardId} name="boardId" />
		<input
			placeholder="Enter List Name"
			class="input"
			name="title"
			autofocus
			bind:value={title}
			on:blur={(e) => {
				isEditingTitle = false
				dispatch('blur', e)
			}}
		/>
	</form>
{:else}
	<div class="flex">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<h3 on:click={() => (isEditingTitle = true)} class="basis-full">
			{title || '(no title found)'}
		</h3>
		<button
			class="btn btn-icon-sm"
			on:click={() => {
				dispatch('editModeClick')
			}}>...</button
		>
	</div>
{/if}
