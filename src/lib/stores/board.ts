import type { Board } from '@prisma/client'
import { writable, type Writable } from 'svelte/store'

export const board: Writable<Partial<Board>> = writable({
	lists: [],
	id: ''
})
