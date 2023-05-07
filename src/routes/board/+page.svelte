<script lang="ts">
	import { enhance } from "$app/forms"
  import type {PageData} from "./$types"

  export let data:PageData
</script>
<div class="grid grid-cols-12 p-3 gap-3">
  {#each data.boards as board (board.id)}
  
  <div class="col-span-12 sm:col-span-3 h-48 bg-surface-200-700-token">
  </div>
  {/each}
  <div>
        <form method="post" action="?/create" use:enhance>
          <button
            type="submit"
            class="text-primary-100-800-token btn btn-lg bg-primary-300 w-full"
          >
            Create Board
          </button>
        </form>
			</div>
</div>