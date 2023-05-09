<script lang="ts">
	import type { Card } from '$lib/types/card'

	export let card: Card
</script>

<div class="card card-hover">
	<div class="card-header">{card.title}</div>
	<div class="card-footer" />
</div>
