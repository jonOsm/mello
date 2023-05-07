<script lang="ts">
	import { enhance } from '$app/forms'
	import { focusTrap } from '@skeletonlabs/skeleton'
	import { modalStore } from '@skeletonlabs/skeleton'

	export let action: 'new' | 'edit' | 'delete'
	export let boardName = ''
	export let boardId: string | null = null
	console.log(boardId)
</script>

<form
	class="flex flex-col gap-3"
	on:submit={() => modalStore.close()}
	method="post"
	action="?/{action}"
	use:enhance
	use:focusTrap={action !== 'delete'}
>
	{#if action !== 'delete'}
		<label class="label">
			<span>Board Name </span>

			<input
				autofocus
				placeholder="My New Board"
				class="form-input input"
				name="name"
				bind:value={boardName}
			/>
		</label>
		<input type="hidden" name="id" bind:value={boardId} />
		<button type="submit" class="btn variant-filled-primary">Create</button>
		<button on:click={() => modalStore.close()} type="button" class="btn variant-filled-surface"
			>Cancel</button
		>
	{:else}
		<p class="label">
			<span
				>Are you sure you want to delete this board? All associated lists and cards will also be
				deleted.</span
			>
		</p>
		<input type="hidden" name="id" bind:value={boardId} />
		<button type="submit" class="btn variant-filled-error">I understand. Delete this board.</button>
		<button on:click={() => modalStore.close()} type="button" class="btn variant-filled-surface"
			>Cancel</button
		>
	{/if}
</form>
