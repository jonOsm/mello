<script>
	import { enhance } from '$app/forms'
	import { focusTrap } from '@skeletonlabs/skeleton'
</script>

<form class="flex flex-col gap-3" method="post" action="?/create" use:enhance use:focusTrap={true}>
	<label class="label">
		<span>Board Name</span>
		<input autofocus placeholder="My New Board" class="form-input input" name="name" />
	</label>
	<button type="submit" class="btn variant-filled-primary">Create</button>
</form>
