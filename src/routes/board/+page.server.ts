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

export const actions = {
	create: async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = newBoardSchema.safeParse(rawData)
		if (parsedData.success) {
			const { name } = parsedData.data
			return await prisma.board.create({ data: { name } })
		} else {
			console.log(parsedData.error)
			return fail(400, { errors: parsedData.error.errors })
		}
	}
} satisfies Actions
