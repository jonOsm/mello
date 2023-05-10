<script lang="ts">
	import { enhance } from '$app/forms'
	import type { List } from '$lib/types/list'
	import type { Card as CardType } from '$lib/types/card'
	import ListTitleForm from './ListTitleForm.svelte'
	import Card from './Card.svelte'
	import NewCardForm from './NewCardForm.svelte'
	import { activeBoard } from '$lib/stores/board'
	import { dragAndDrop, reset } from '$lib/stores/dragAndDrop'

	export let list: List
	export let isEditingTitle = false

	let isEditMode = false
	let isAddingCard = false
	let cursorPosY = 0
	let maxCardOrdinal: number
	let selfRef: HTMLDivElement
	let midpoints: { card: CardType; midpointY: number }[] = []
	let dropHintOrdinal = 0
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

<form use:enhance bind:this={bulkEdit} method="post" action="?/cards/bulk/move" class="hidden">
	<input type="hidden" name="droppedAtOrdinal" value={$dragAndDrop.destination?.ordinal} />
	<input type="hidden" name="newListId" value={$dragAndDrop.destination?.listId} />
	<input type="hidden" name="draggedId" value={$dragAndDrop.item?.id} />
</form>

<div
	bind:this={selfRef}
	on:dragover={(e) => {
		cursorPosY = e.clientY
		const currentMidpoint = midpoints.find((info) => e.clientY < info.midpointY)
		dropHintOrdinal = currentMidpoint?.card.ordinal || maxCardOrdinal + 1
	}}
	on:dragenter={() => {
		$dragAndDrop.activeListId = list.id || ''
	}}
	on:drop={(e) => {}}
	class="list flex-none w-[300px] h-fit flex-col flex gap-1 p-3 bg-surface-200-700-token"
>
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
					{#if $dragAndDrop.activeListId === list.id && dropHintOrdinal === card.ordinal}
						<div id="drophint" class={'h-10 w-full bg-black'} />
					{/if}
					<Card {card} on:midpointUpdated={(e) => (midpoints = [...midpoints, e.detail])} />
				{/each}
				{#if $dragAndDrop.activeListId === list.id && dropHintOrdinal > maxCardOrdinal}
					<div id="drophint" class={'h-10 w-full bg-black'} />
				{/if}
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
