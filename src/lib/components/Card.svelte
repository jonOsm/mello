<script lang="ts">
	import type { Card } from '$lib/types/card'
	import { slide } from 'svelte/transition'
	export let card: Card
</script>

<div transition:slide class="card card-hover">
	<div class="card-header">{card.title}</div>
	<div class="card-footer" />
</div>
