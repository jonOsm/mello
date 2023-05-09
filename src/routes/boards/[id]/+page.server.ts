import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { z } from 'zod'

export const load = (async ({ params }) => {
	return {
		lists: await prisma.list.findMany({
			where: { boardId: params.id },
			include: { cards: true },
			orderBy: [{ ordinal: 'asc' }]
		}),
		boardId: params.id
	}
}) satisfies PageServerLoad

const newListSchema = z.object({
	title: z.string(),
	ordinal: z.coerce.number(),
	boardId: z.string().min(8)
})

const editListSchema = z.object({
	id: z.string().min(8),
	title: z.string(),
	boardId: z.string().min(8),
	ordinal: z.coerce.number()
})

const deleteListSchema = z.object({
	id: z.string().min(8)
})

const newCardSchema = z.object({
	listId: z.string().min(8),
	title: z.string()
})

export const actions = {
	//maybe just upsert and merge these endpoints?
	'lists/new': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = newListSchema.safeParse(rawData)
		if (parsedData.success) {
			const { title, ordinal, boardId } = parsedData.data
			return await prisma.list.create({ data: { title, ordinal, boardId } })
		}
		return fail(400, { errors: parsedData.error.errors })
	},
	'lists/edit': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = editListSchema.safeParse(rawData)

		if (parsedData.success) {
			const { id, title, ordinal } = parsedData.data

			await prisma.list.update({
				where: { id },
				data: { title, ordinal }
			})
		} else {
			return fail(400, { errors: parsedData.error.errors })
		}
	},
	'lists/delete': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = deleteListSchema.safeParse(rawData)

		if (parsedData.success) {
			const { id } = parsedData.data

			await prisma.list.delete({
				where: { id }
			})
		} else {
			return fail(400, { errors: parsedData.error.errors })
		}
	},
	'card/new': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = newCardSchema.safeParse(rawData)

		if (parsedData.success) {
			const { listId, title } = parsedData.data

			return await prisma.card.create({
				data: { title, listId }
			})
		} else {
			return fail(400, { errors: parsedData.error.errors })
		}
	}
} satisfies Actions
