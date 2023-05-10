import type { Card as PrismaCard } from '@prisma/client'
export interface Card extends Partial<PrismaCard> {
	title: string
	ordinal: number
	midpointY?: number
}
