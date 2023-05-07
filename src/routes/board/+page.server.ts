import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { z } from 'zod'

export const load = (async () => {
	return {
		boards: await prisma.board.findMany({})
	}
}) satisfies PageServerLoad

const newBoardSchema = z.object({
	name: z.string()
})

const editBoardSchema = z.object({
	id: z.string().min(8),
	name: z.string()
})

const deleteBoardSchema = z.object({
	id: z.string().min(8)
})

export const actions = {
	create: async ({ request }) => {
		//TODO: authorization check
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = newBoardSchema.safeParse(rawData)
		if (parsedData.success) {
			const { name } = parsedData.data
			return await prisma.board.create({ data: { name } })
		}

		console.log(parsedData.error)
		return fail(400, { errors: parsedData.error.errors })
	},
	edit: async ({ request }) => {
		//TODO: authorization check
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = editBoardSchema.safeParse(rawData)
		if (parsedData.success) {
			const { name, id } = parsedData.data
			return await prisma.board.update({ where: { id }, data: { name } })
		}
		console.log(parsedData.error)
		return fail(400, { errors: parsedData.error.errors })
	},
	delete: async ({ request }) => {
		//TODO: authorization check
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = deleteBoardSchema.safeParse(rawData)
		if (parsedData.success) {
			const { id } = parsedData.data
			return await prisma.board.delete({ where: { id } })
		}

		console.log(parsedData.error)
		return fail(400, { errors: parsedData.error.errors })
	}
} satisfies Actions
