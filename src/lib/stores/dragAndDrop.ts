import { writable, type Writable } from 'svelte/store'
import type { Card } from '$lib/types/card'
//TODO: May wish to scope this in a context
// by default it is globally accessible
//TODO: Support list drag and drop
interface DragAndDrop {
	item: Card | null //array of what?
	destination: Card | null
	activeListId: string
	submit: boolean
}
export const dragAndDrop: Writable<DragAndDrop> = writable({
	item: null,
	activeListId: '',
	destination: null,
	submit: false
})

export const submit = () => {
	dragAndDrop.update((dAndD) => {
		if (dAndD.item && dAndD.destination && dAndD.item.id !== dAndD.destination?.id) {
			console.log('update ordinals and submit here')
			return { ...dAndD, submit: true }
		} else {
			console.log('missing either source items or destination')
		}
		return dAndD
	})
}

export const reset = () => {
	dragAndDrop.set({ item: null, activeListId: '', destination: null, submit: false })
}
