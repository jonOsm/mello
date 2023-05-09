<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import { activeBoard } from '$lib/stores/board'
	import type { List as ListType } from '$lib/types/list'
	import List from '$lib/components/List.svelte'

	export let data: PageData
	$: $activeBoard = { id: data.boardId, lists: data.lists, showCreateForm: false }

	let maxOrdinal: number
	$: maxOrdinal = Math.max(...$activeBoard.lists.map((l) => l.ordinal), 0)

	let defaultList: ListType
	$: defaultList = { title: '', ordinal: maxOrdinal + 1, boardId: $activeBoard?.id, cards: [] }

	const beginCreateNewList = () => {
		$activeBoard.showCreateForm = true
	}
</script>

<div class="flex flex-nowrap h-full overflow-x-auto p-3 gap-3">
	{#if $activeBoard.lists.length > 0}
		{#each $activeBoard.lists as list (list.id)}
			<List {list} isEditingTitle={!list.id} />
		{/each}
		{#if !$activeBoard.showCreateForm}
			<div>
				<button
					on:click={beginCreateNewList}
					type="submit"
					class="text-primary-100-800-token btn btn-lg bg-primary-300 w-full"
				>
					Add List
				</button>
			</div>
		{/if}
	{/if}
	{#if $activeBoard.lists.length <= 0 && !$activeBoard.showCreateForm}
		<div class="flex place-content-center w-full h-full items-center">
			<div class="">
				<h2 class="">No Lists Found</h2>
				<button
					on:click={beginCreateNewList}
					type="submit"
					class="text-primary-100-800-token btn btn-lg bg-primary-300 w-full"
				>
					Add List
				</button>
			</div>
		</div>
	{/if}
	{#if $activeBoard.showCreateForm}
		<List list={defaultList} isEditingTitle />
	{/if}
</div>
