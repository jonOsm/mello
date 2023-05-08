import type { ActiveBoard } from '$lib/types/board'
import { writable, type Writable } from 'svelte/store'
//TODO: May wish to scope this in a context
// by default it is globally accessible
export const activeBoard: Writable<ActiveBoard> = writable({
	lists: [],
	showCreateForm: false,
	id: ''
})
