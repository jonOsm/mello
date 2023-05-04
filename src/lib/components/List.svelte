<script lang="ts">
	import { enhance } from '$app/forms'
	import { tick } from 'svelte'

	interface Card {
		title: string
	}
	interface ListData {
		id?: string
		title: string
		ordinal: number
		cards?: Card[]
	}

	export let data: ListData
	export let isEditing = false
</script>

<div class="w-1/6 flex-col flex gap-1 p-3 bg-surface-200-700-token">
	{#if isEditing}
		<form method="POST" action="?/lists/{data.id ? 'edit' : 'new'}" use:enhance>
			<input type="hidden" value={data.id} name="id" />
			<input type="hidden" value={data.ordinal} name="ordinal" />
			<input
				placeholder="Enter List Name"
				class="input"
				name="title"
				autofocus
				bind:value={data.title}
				on:focus={async (e) => {}}
				on:blur={(e) => {
					isEditing = false
				}}
			/>
		</form>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
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
