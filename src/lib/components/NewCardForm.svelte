<script lang="ts">
	import { enhance } from '$app/forms'
	import { createEventDispatcher } from 'svelte'
	import type { Card } from '$lib/types/card'
	import { slide } from 'svelte/transition'

	export let card: Card
	const dispatch = createEventDispatcher()
</script>

<div transition:slide class="card p-4 flex flex-col gap-3">
	<!-- Fails without use:enhance -->
	<form
		use:enhance
		on:submit={(e) => {
			e.currentTarget.requestSubmit()
			dispatch('submit')
		}}
		method="post"
		action="?/card/new"
	>
		<input name="listId" type="hidden" value={card.listId} />
		<input name="ordinal" type="hidden" value={card.ordinal} />
		<textarea autofocus placeholder="Card Title" class="form-input input" name="title" />
		<button type="submit" class="btn btn-sm variant-filled-primary self-end">Create</button>
	</form>
</div>
