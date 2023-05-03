// import type {  PageServerLoad } from "./$types"
import type { Actions } from './$types'
// export const load = (({ params }) => {
//     return {
//     };
// }) satisfies PageServerLoad;

export const actions = {
	'lists/new': () => {
		console.log('running?')
		return { testing: 'testing' }
	}
} satisfies Actions
