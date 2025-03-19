import { z } from 'zod';
import moment from 'moment';
import { superRefineFeeder } from '$lib/utils/helpers/helper.utils';

export const editMiracleSchema = z
	.object({
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
	})
	.superRefine(({ occurrence_year }, ctx) => {
		let currentYear = moment().year();
		if (occurrence_year && occurrence_year > currentYear) {
			ctx.addIssue({
				code: 'custom',
				message: `Selected year: ${occurrence_year} is not valid. Please enter a valid year of occurrence.`,
				path: ['occurrence_year']
			});
		}
	})
	.superRefine(({ deleted, published, draft }, ctx) => {
		if (deleted && draft && published) {
			let fields = ['deleted', 'draft', 'published'];
			superRefineFeeder(
				fields,
				'A Record cannot be Published, Deleted, and in a Draft state.',
				ctx
			);
		} else if (deleted && published) {
			let fields = ['deleted', 'published'];
			superRefineFeeder(fields, 'A Record cannot be Published and Deleted.', ctx);
		} else if (published && draft) {
			let fields = ['published', 'draft'];
			superRefineFeeder(fields, 'A Record cannot be in both a Draft and a Published state.', ctx);
		} else if (draft && deleted) {
			let fields = ['deleted', 'draft'];
			superRefineFeeder(fields, 'A Record cannot be in both a Draft and a Deleted state.', ctx);
		}
	});