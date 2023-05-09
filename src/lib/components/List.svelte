<script lang="ts">
	import { enhance } from '$app/forms'
	import type { List } from '$lib/types/list'
	import type { Card as CardType } from '$lib/types/card'
	import ListTitleForm from './ListTitleForm.svelte'
	import Card from './Card.svelte'
	import NewCardForm from './NewCardForm.svelte'
	import { slide } from 'svelte/transition'
	import { activeBoard } from '$lib/stores/board'
	import { dragAndDrop, reset } from '$lib/stores/dragAndDrop'

	export let list: List
	export let isEditingTitle = false

	let isEditMode = false
	let isAddingCard = false

	let maxCardOrdinal: number
	$: if (list.cards) {
		maxCardOrdinal = Math.max(...list.cards?.map((c: CardType) => c.ordinal), 0)
	}
	let defaultCard: CardType
	$: defaultCard = { listId: list.id, title: '', ordinal: maxCardOrdinal + 1 }

	let bulkEdit: HTMLFormElement
	$: if ($dragAndDrop.submit) {
		bulkEdit.requestSubmit()
		reset()
	}
</script>

<form use:enhance bind:this={bulkEdit} method="post" action="?/cards/bulk/edit" class="hidden">
	<input type="hidden" name="incrementPastOrdinal" value={$dragAndDrop.destination?.id} />
	<input
		type="hidden"
		name="draggedIds"
		value={$dragAndDrop.sourceItems.map((d, i) => {
			return { id: d.id, newOrdinal: i + ($dragAndDrop.destination?.ordinal || 0) }
		})}
	/>
</form>
<div in:slide class="flex-none w-[300px] h-fit flex-col flex gap-1 p-3 bg-surface-200-700-token">
	{#if !isEditMode}
		<ListTitleForm
			{list}
			on:editModeClick={() => (isEditMode = true)}
			bind:isEditingTitle
			on:blur
		/>
		<div>
			{#if list.cards}
				{#each list.cards as card}
					<Card {card} />
				{/each}
			{/if}
			{#if isAddingCard}
				<NewCardForm card={defaultCard} on:submit={() => (isAddingCard = false)} />
			{:else if !$activeBoard.showCreateForm}
				<button
					class="btn variant-ghost-primary w-full"
					on:click={() => {
						isAddingCard = true
					}}>Add Card</button
				>
			{/if}
		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<div class="flex">
				<h3 class="w-full">Edit mode</h3>
				<button class="btn btn-icon-sm" on:click={() => (isEditMode = false)}> {'<'}</button>
			</div>
			<button class="btn w-full variant-filled-warning">Archive</button>
			<form method="post" action="?/lists/delete" use:enhance>
				<button class="btn w-full variant-filled-error">
					<input type="hidden" name="id" bind:value={list.id} />
					delete
				</button>
			</form>
		</div>
	{/if}
</div>
