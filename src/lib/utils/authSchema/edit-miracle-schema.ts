import { z } from 'zod';

export const editMiracleSchema = z.object({
	base_translation: z.boolean().nullable(),
	blurb: z.string().nullable(),
	country_id: z.string({ required_error: 'Country is required.' }).uuid(),
	deleted: z.boolean(),
	draft: z.boolean(),
	language_code: z.string({ required_error: 'Language is required.' }),
	name: z
		.string({ required_error: 'Name is required.' })
		.min(1, { message: 'Name is required.' })
		.max(64, { message: 'Name must be less than 64 characters.' }),
	occurrence_year: z.number({ message: 'Please enter a valid year.' }).nullable(),
	quotes: z.array(z.string()).nullable(),
	story: z
		.string({ required_error: 'Story is required.' })
		.min(1, { message: 'Story is required.' }),
	published: z.boolean()
});