import { writable, type Writable } from 'svelte/store'
import type { Card } from '$lib/types/card'
//TODO: May wish to scope this in a context
// by default it is globally accessible
//TODO: Support list drag and drop
interface DragAndDrop {
	sourceItems: Card[] //array of what?
	destination: Card | null
	submit: (destination: Card) => void
}
export const dragAndDrop: Writable<DragAndDrop> = writable({
	sourceItems: [],
	destination: null,
	submit: (destination: Card) => {
		console.log('submitting')
	}
})
