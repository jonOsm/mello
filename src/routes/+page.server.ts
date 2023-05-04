// import type {  PageServerLoad } from "./$types"
import type { Actions } from './$types'
import prisma from '$lib/prisma'
import { z } from 'zod'
// export const load = (({ params }) => {
//     return {
//     };
// }) satisfies PageServerLoad;

const listSchema = z.object({
	title: z.string().min(1)
})

export const actions = {
	'lists/new': async ({ request }) => {
		const rawData = Object.fromEntries(await request.formData())
		const data = listSchema.safeParse(rawData)

		if (data.success) {
			await prisma.list.create({ data: { title: data.data.title } })
		}

		return { testing: 'testing' }
	}
} satisfies Actions
