<script lang="ts">
	import type { Card } from '$lib/types/card'
	import { slide } from 'svelte/transition'
	import { type ModalSettings, type ModalComponent, modalStore } from '@skeletonlabs/skeleton'
	import EditCardForm from './EditCardForm.svelte'
	import { dragAndDrop } from '$lib/stores/dragAndDrop'

	export let card: Card
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
	draggable="true"
	transition:slide
	class="card card-hover"
	on:dragstart={() => {
		console.log('dragging')
		$dragAndDrop.sourceItems = [card]
	}}
	on:dragend={() => {
		if ($dragAndDrop.destination) {
			$dragAndDrop.submit($dragAndDrop.destination)
		}
	}}
	on:dragover|preventDefault={() => {
		$dragAndDrop.destination = card
	}}
	on:click={() => {
		modalStore.trigger(cardEditFormSettings)
	}}
>
	<div class="card-header">{card.title}</div>
	<div class="card-footer" />
</div>
