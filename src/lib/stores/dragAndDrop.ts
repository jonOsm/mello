import { writable, type Writable } from 'svelte/store'
import type { Card } from '$lib/types/card'
//TODO: May wish to scope this in a context
// by default it is globally accessible
//TODO: Support list drag and drop
interface DragAndDrop {
	sourceItems: Card[] //array of what?
	destination: Card | null
	submit: boolean
}
export const dragAndDrop: Writable<DragAndDrop> = writable({
	sourceItems: [],
	destination: null,
	submit: false
})

export const submit = () => {
	dragAndDrop.update((dAndD) => {
		console.log(dAndD)
		if (
			dAndD.sourceItems.length > 0 &&
			dAndD.destination &&
			dAndD.sourceItems.find((d) => d.id !== dAndD.destination?.id)
		) {
			console.log('update ordinals and submit here')
			return { ...dAndD, submit: true }
		} else {
			console.log('missing either source items or destination')
		}
		return dAndD
	})
}

export const reset = () => {
	dragAndDrop.set({ sourceItems: [], destination: null, submit: false })
}
