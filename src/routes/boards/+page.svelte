<script lang="ts">
	import BoardForm from '$lib/components/BoardForm.svelte'
	import type { Board } from '@prisma/client'
	import type { PageData } from './$types'
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton'
	export let data: PageData
	//

	let action: string | null = null
	let formVisible = false
	let selectedBoard: Board | null = null

	// TODO: Reach out to sveltekit/skeleton pro and ask if this
	// is a silly way to handle dynamic modals
	$: {
		const boardForm: ModalComponent = {
			ref: BoardForm,
			props: { action, boardName: selectedBoard?.name, boardId: selectedBoard?.id }
		}

		let boardFormSettings: ModalSettings = {
			type: 'component',
			component: boardForm
		}

		if (action) {
			modalStore.trigger(boardFormSettings)
			// having to do this b/c  executing the same action
			// multiple times in a row won't trigger a recompute
			// kinda gross...
			action = null
		}
	}
</script>

<div class="grid grid-cols-12 p-3 gap-3">
	{#each data.boards as board (board.id)}
		<div
			class="col-span-12 sm:col-span-3 h-48 bg-surface-200-700-token flex flex-col justify-center items-center"
		>
			<a href="/boards/{board.id}">
				<h2>{board.name || '(unnamed board)'}</h2>
			</a>
			<button
				on:click|stopPropagation={() => {
					action = 'edit'
					selectedBoard = board
				}}
				class="btn-icon-sm">e</button
			>
			<button
				on:click|stopPropagation={() => {
					action = 'delete'
					selectedBoard = board
				}}
				class="btn-icon-sm">d</button
			>
		</div>
	{/each}
	<div>
		<button
			on:click={() => {
				action = 'create'
				selectedBoard = null
			}}
			type="submit"
			class="text-primary-100-800-token btn btn-lg bg-primary-300 w-full"
		>
			Create Board
		</button>
	</div>
</div>
