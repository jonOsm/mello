<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import List from '$lib/components/List.svelte'
	export let form: ActionData
	export let data: PageData
	console.log(data.lists)
	let isAddingList = false

	interface Card {
		title: string
	}

	interface List {
		id?: string
		title: string
		cards?: Card[]
	}
	let lists: List[]
	$: lists = data.lists

	// $: lists: List = data.lists
	// const lists: List[] = [ { title: 'backlog', cards: [{ title: 'this is a card' }, { title: 'this is another card' }] },
	// 	{ title: 'hold' },
	// 	{ title: 'ongoing' },
	// 	{ title: 'done' }
	// ]

	const beginCreateNewList = () => {
		lists = [...lists, { title: 'new list' }]
	}
</script>

<div class="flex p-3 gap-3 w-full h-full">
	{#if lists.length > 0}
		{#each lists as list (list.id)}<List data={list} />{/each}
	{:else}
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
</div>
