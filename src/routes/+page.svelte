<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import List from '$lib/components/List.svelte'

	export let data: PageData

	interface Card {
		title: string
	}

	interface List {
		id?: string
		title: string
		ordinal: number
		cards?: Card[]
	}
	let lists: List[]
	$: lists = data.lists

	let maxOrdinal: number
	$: maxOrdinal = Math.max(...lists.map((l) => l.ordinal), 0)

	let defaultList: List
	$: defaultList = { title: '', ordinal: maxOrdinal + 1 }
	let showCreateForm: boolean = false
	const beginCreateNewList = () => {
		// lists = [...lists, { title: '', ordinal: maxOrdinal + 1 }]
		showCreateForm = true
	}
</script>

<div class="flex flex-nowrap h-full overflow-x-auto p-3 gap-3">
	{#if lists.length > 0}
		{#each lists as list (list.id)}
			<List data={list} isEditingTitle={!list.id} />
		{/each}
		{#if !showCreateForm}
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
	{#if lists.length <= 0 && !showCreateForm}
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
	{#if showCreateForm}
		<List data={defaultList} isEditingTitle on:blur={() => (showCreateForm = false)} />
	{/if}
</div>
