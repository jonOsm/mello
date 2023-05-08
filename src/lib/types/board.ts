import type { Board as PrismaBoard } from '@prisma/client'
import type { List as PrismaList } from '@prisma/client'

export interface ActiveBoard extends Partial<PrismaBoard> {
	lists: PrismaList[]
	id: string
	showCreateForm: boolean
}
