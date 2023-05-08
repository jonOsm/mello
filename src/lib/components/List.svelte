<script lang="ts">
	import { enhance } from '$app/forms'
	import type { List } from '$lib/types/list'
	import type { Card } from '$lib/types/card'
	import ListTitleForm from './ListTitleForm.svelte'

	export let list: List
	export let isEditingTitle = false
	export let cards: Card[]

	let isEditMode = false
	let isAddingCard = false
</script>

<div class="flex-none w-[300px] h-fit flex-col flex gap-1 p-3 bg-surface-200-700-token">
	{#if !isEditMode}
		<ListTitleForm
			{list}
			on:editModeClick={() => (isEditMode = true)}
			bind:isEditingTitle
			on:blur
		/>
		<div>
			{#if list.cards && list.cards.length > 0}
				{#each list.cards as card}
					<div class="card">
						<div class="card-header">{card.title}</div>
						<div class="card-footer" />
					</div>
				{/each}
			{/if}
			{#if !isAddingCard}
				<button class="btn variant-ghost-primary w-full">Add Card</button>
			{:else}
				<div class="card card-hover p4" />
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
