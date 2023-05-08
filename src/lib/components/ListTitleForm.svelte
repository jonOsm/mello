<script lang="ts">
	import { enhance } from '$app/forms'
	import { createEventDispatcher } from 'svelte'
	import type { List } from '$lib/types/list'
	import { activeBoard } from '$lib/stores/board'

	const dispatch = createEventDispatcher()
	export let list: List
	export let isEditingTitle: boolean = false
	//
</script>

{#if isEditingTitle}
	<form method="POST" action="?/lists/{list.id ? 'edit' : 'new'}" use:enhance>
		<input type="hidden" value={list.id} name="id" />
		<input type="hidden" value={list.ordinal} name="ordinal" />
		<input type="hidden" value={list.boardId} name="boardId" />
		<input
			placeholder="Enter List Name"
			class="input"
			name="title"
			autofocus
			value={list.title}
			on:blur={(e) => {
				$activeBoard.showCreateForm = false
				isEditingTitle = false
				dispatch('blur', e)
			}}
		/>
	</form>
{:else}
	<div class="flex">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<h3 on:click={() => (isEditingTitle = true)} class="basis-full">
			{list.title || '(no title found)'}
		</h3>
		<button
			class="btn btn-icon-sm"
			on:click={() => {
				dispatch('editModeClick')
			}}>...</button
		>
	</div>
{/if}
