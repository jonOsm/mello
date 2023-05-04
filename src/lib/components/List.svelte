<script lang="ts">
	interface Card {
		title: string
	}
	interface ListData {
		id?: string
		title: string
		cards?: Card[]
	}

	export let data: ListData
	let isEditing = false
</script>

<div class="w-1/6 flex-col flex gap-1 p-3 bg-surface-200-700-token">
	{#if isEditing}
		<form method="post" action="?/lists/{data.id ? 'edit' : 'create'}">
			<input type="hidden" value={data.id} name="id" />
			<input
				placeholder="Enter List Name"
				class="input"
				name="title"
				autofocus
				bind:value={data.title}
				on:focus={() => {}}
				on:blur={() => (isEditing = false)}
			/>
		</form>
	{:else}
		<h3 on:click={() => (isEditing = true)} class="text-center">
			{data.title}
		</h3>
	{/if}
	{#if data.cards && data.cards.length > 0}
		{#each data.cards as card}
			<div class="card">
				<div class="card-header">{card.title}</div>
				<div class="card-footer" />
			</div>
		{/each}
	{/if}
</div>
