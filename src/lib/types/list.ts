import type { List as PrismaList } from '@prisma/client'
//TODO: move to own file
interface Card {
	title: string
	ordinal: number
}

export interface List extends Partial<PrismaList> {
	id?: string
	title: string
	ordinal: number
	boardId: string
	cards?: Card[]
}
