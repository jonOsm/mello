import type { List as PrismaList } from '@prisma/client'
import type { Card } from '$lib/types/card'
export interface List extends Partial<PrismaList> {
	id?: string
	title: string
	ordinal: number
	boardId: string
	cards: Card[]
}
