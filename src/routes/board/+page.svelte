<script lang="ts">
	import { enhance } from '$app/forms'
	import BoardForm from '$lib/components/BoardForm.svelte'
	import type { PageData } from './$types'
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton'
	export let data: PageData
	//

	const boardForm: ModalComponent = {
		// Pass a reference to your custom component
		ref: BoardForm,
		// Add the component properties as key/value pairs
		props: {},
		// Provide a template literal for the default component slot
		slot: '<p>Skeleton</p>'
	}

	const boardFormSettings: ModalSettings = {
		type: 'component',
		// Data
		component: boardForm
	}
</script>

<div class="grid grid-cols-12 p-3 gap-3">
	{#each data.boards as board (board.id)}
		<div class="col-span-12 sm:col-span-3 h-48 bg-surface-200-700-token" />
	{/each}
	<div>
		<button
			on:click={() => modalStore.trigger(boardFormSettings)}
			type="submit"
			class="text-primary-100-800-token btn btn-lg bg-primary-300 w-full"
		>
			Create Board
		</button>
	</div>
</div>
