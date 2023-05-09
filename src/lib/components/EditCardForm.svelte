<script lang="ts">
	import { enhance } from '$app/forms'
	import type { Card } from '$lib/types/card'
	import { modalStore } from '@skeletonlabs/skeleton'

	export let card: Card
	//adding parent to silence modal warning
	export let parent
</script>

<!-- adding slot to silence modal warning -->
<slot />

<form on:submit={() => modalStore.close()} class="flex flex-col gap-3" method="post" use:enhance>
	<input name="id" type="hidden" value={card.id} />
	<label class="label">
		<span>Title</span>
		<input type="text" name="title" class="input form-input" value={card.title} />
	</label>
	<hr />
	<button type="submit" class="btn variant-filled-primary">Edit</button>
	<button on:click={() => modalStore.close()} type="button" class="btn variant-filled-surface"
		>Cancel</button
	>
</form>
