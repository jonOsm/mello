import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { z } from 'zod'

export const load = (async () => {
	return {
		lists: await prisma.list.findMany()
	}
}) satisfies PageServerLoad

const newListSchema = z.object({
	title: z.string().min(1)
})

const editListSchema = z.object({
	id: z.string().min(8),
	title: z.string().min(1)
})

export const actions = {
	//maybe just upsert and merge these endpoints?
	'lists/new': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = newListSchema.safeParse(rawData)

		if (parsedData.success) {
			return await prisma.list.create({ data: { title: parsedData.data.title } })
		} else {
			return fail(400, { errors: parsedData.error.errors })
		}
	},
	'lists/edit': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const parsedData = editListSchema.safeParse(rawData)

		if (parsedData.success) {
			console.log('running edit')
			await prisma.list.update({
				where: { id: parsedData.data.id },
				data: { title: parsedData.data.title }
			})
		} else {
			return fail(400, { errors: parsedData.error.errors })
		}

		return { testing: 'testing' }
	}
} satisfies Actions
