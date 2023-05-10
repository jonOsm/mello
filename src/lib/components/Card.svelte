<script lang="ts">
	import type { Card } from '$lib/types/card'
	import { type ModalSettings, type ModalComponent, modalStore } from '@skeletonlabs/skeleton'
	import EditCardForm from './EditCardForm.svelte'
	import { dragAndDrop, submit } from '$lib/stores/dragAndDrop'
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte'

	export let card: Card

	const dispatch = createEventDispatcher()

	let cardNode: HTMLDivElement
	let verticalMidpoint: number
	let cursorPosY: number
	let showDropZone: boolean

	onMount(() => {
		verticalMidpoint =
			cardNode.getBoundingClientRect().bottom - cardNode.getBoundingClientRect().height / 2
		dispatch('midpointUpdated', { card, midpointY: verticalMidpoint })
	})

	let cardEditForm: ModalComponent
	$: cardEditForm = {
		ref: EditCardForm,
		props: { card }
	}
	let cardEditFormSettings: ModalSettings
	$: cardEditFormSettings = {
		type: 'component',
		component: cardEditForm
	}
	// modalStore.trigger(cardEditFormSettings)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={cardNode}
	draggable="true"
	class="card card-hover"
	on:dragleave|stopPropagation
	on:dragstart={() => {
		console.log('dragging')
		$dragAndDrop.item = card
	}}
	on:click={() => {
		modalStore.trigger(cardEditFormSettings)
	}}
>
	<div class="card-header">{card.title}</div>
	<div class="card-footer" />
</div>
