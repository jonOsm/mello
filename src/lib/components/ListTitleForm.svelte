<script lang="ts">
	import { enhance } from "$app/forms"

  export let id : string | null = null
  export let ordinal : number 
  export let title : string 
  export let onBlur : (e:FocusEvent) => void
</script>

<form method="POST" action="?/lists/{id ? 'edit' : 'new'}" use:enhance>
  <input type="hidden" value={id} name="id" />
  <input type="hidden" value={ordinal} name="ordinal" />
  <input
    placeholder="Enter List Name"
    class="input"
    name="title"
    autofocus
    bind:value={title}
    on:focus={async (e) => {}}
    on:blur={onBlur}
  />
</form>