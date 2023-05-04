<script lang="ts">
	import type { ActionData } from './$types'
	export let form: ActionData
	interface Card {
		title: string
	}

	interface List {
		title: string
		cards?: Card[]
	}
	const lists: List[] = []
	///obviously handle server-side
	if (form?.testing) {
		lists.push({ title: 'testing' })
	}
	// const lists: List[] = [ { title: 'backlog', cards: [{ title: 'this is a card' }, { title: 'this is another card' }] },
	// 	{ title: 'hold' },
	// 	{ title: 'ongoing' },
	// 	{ title: 'done' }
	// ]
</script>

<div class="flex p-3 gap-3 w-full h-full">
	{#if lists.length > 0}
		{#each lists as list}
			<div class="w-1/6 flex-col flex gap-1 p-3 bg-surface-200-700-token">
				<h3 class="text-center">{list.title}</h3>
				{#if list.cards && list.cards.length > 0}
					{#each list.cards as card}
						<div class="card">
							<div class="card-header">{card.title}</div>
							<div class="card-footer" />
						</div>
					{/each}
				{/if}
			</div>
		{/each}
	{:else}
		<div class="flex place-content-center w-full h-full items-center">
			<div class="">
				<h2 class="">No Lists Found</h2>
				<form method="post" action="?/lists/new">
					<label for="add-title">title</label>
					<button type="submit" class="text-primary-100-800-token btn btn-lg bg-primary-300 w-full">
						Add List
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>
