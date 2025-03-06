import { z } from 'zod';

export const editMiracleSchema = z.object({
	base_translation: z.boolean().nullable(),
	blurb: z.string().nullable(),
	country_id: z.string({ required_error: 'Country is required.' }).uuid(),
	deleted: z.boolean().nullable(),
	draft: z.boolean().nullable(),
	language_code: z.string({ required_error: 'Language is required.' }),
	name: z
		.string({ required_error: 'Name is required.' })
		.min(1, { message: 'Name is required.' })
		.max(64, { message: 'Name must be less than 64 characters.' }),
	occurrence_year: z.number().nullable(),
	quotes: z.array(z.string()).nullable(),
	story: z
		.string({ required_error: 'Story is required.' })
		.min(1, { message: 'Email is required.' })
		.max(64, { message: 'Email must be less than 64 characters.' })
});