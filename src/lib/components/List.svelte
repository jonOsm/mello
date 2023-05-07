<script lang="ts">
	import { enhance } from '$app/forms'
	import ListTitleForm from './ListTitleForm.svelte'
	interface Card {
		title: string
	}
	interface ListData {
		id?: string
		title: string
		ordinal: number
		boardId: string
		cards?: Card[]
	}

	export let data: ListData
	export let isEditingTitle = false

	let isEditMode = false
</script>

<div class="flex-none w-[300px] h-fit flex-col flex gap-1 p-3 bg-surface-200-700-token">
	{#if !isEditMode}
		<ListTitleForm
			{...data}
			on:editModeClick={() => (isEditMode = true)}
			bind:isEditingTitle
			on:blur
		/>
		<div>
			{#if data.cards && data.cards.length > 0}
				{#each data.cards as card}
					<div class="card">
						<div class="card-header">{card.title}</div>
						<div class="card-footer" />
					</div>
				{/each}
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
					<input type="hidden" name="id" bind:value={data.id} />
					delete
				</button>
			</form>
		</div>
	{/if}
</div>
