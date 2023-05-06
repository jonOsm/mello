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
		cards?: Card[]
	}

	export let data: ListData
	export let isEditingTitle = false
	const renderContextPopup = (e:MouseEvent) => {
				
	}
</script>

<div class="w-1/6 flex-col flex gap-1 p-3 bg-surface-200-700-token" on:contextmenu={renderContextPopup}>
	{#if isEditingTitle}
		<ListTitleForm {...data} onBlur={() => isEditingTitle = false}/>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<h3 on:click={() => (isEditingTitle = true)} class="text-center">
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
