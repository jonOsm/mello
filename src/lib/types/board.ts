import type { Board as PrismaBoard } from '@prisma/client'
import type { List } from '$lib/types/list'

export interface ActiveBoard extends Partial<PrismaBoard> {
	lists: List[]
	id: string
	showCreateForm: boolean
}
