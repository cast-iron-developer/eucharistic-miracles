import type { Actions, PageServerLoad } from './$types';
import type {
	CountryTableType,
	FullMiracleData,
	LanguageTableType,
	ServerErrorType,
	UserDataTableType
} from '$lib/utils/types/general-types';
import { genericApiCall } from '$lib/utils/api-utils';
import { supabase } from '$lib/server/supabaseClient';
import { error, redirect } from '@sveltejs/kit';
import { editMiracleSchema } from '$lib/utils/authSchema/edit-miracle-schema';
import { ZodError } from 'zod';
import { AuthApiError, type User } from '@supabase/supabase-js';
import { useDebug } from '$lib/utils/helpers/client-environment-helpers';

export const load: PageServerLoad = async ({ params }) => {
	const [miracleData, miracleError]: [FullMiracleData[], ServerErrorType | null] =
		await genericApiCall<FullMiracleData>(
			supabase
				.from('miracles')
				.select(
					'*, creator_data:user_data!miracles_created_by_fkey(id, email), approver_data:user_data!miracles_approved_by_fkey(id, email)'
				)
				.eq('id', params.id)
		);

	if (miracleError) {
		error(miracleError.status || 500, {
			message: miracleError.statusText
		});
	}

	const [languageData, languageError]: [LanguageTableType[], ServerErrorType | null] =
		await genericApiCall<LanguageTableType>(supabase.from('languages').select('*'));

	if (languageError) {
		error(languageError.status, {
			message: languageError.statusText
		});
	}

	const [countryData, countryError]: [CountryTableType[], ServerErrorType | null] =
		await genericApiCall<CountryTableType>(supabase.from('countries').select('*'));

	if (countryError) {
		error(countryError.status, {
			message: countryError.statusText
		});
	}

	return {
		miracleData: miracleData[0],
		languageData,
		countryData
	};
};

export const actions: Actions = {
	update: async ({ request, locals: { supabase, user }, params }) => {
		const formData: any = Object.fromEntries(await request.formData());
		let [userData, userError]: [UserDataTableType[], ServerErrorType | null] = [[], null];

		try {
			[userData, userError] = await genericApiCall(
				supabase
					.from('user_data')
					.select('*')
					.eq('supabase_id', (user as User).id)
					.limit(1)
			);

			if (userError) {
				error(userError.status, {
					message: userError.statusText
				});

				throw new Error(`Unable to Retrieve User Data for: ${(user as User).email}`);
			}
		} catch (e: any) {
			return {
				data: formData,
				errors: {
					message: 'Unable to verify user.'
				}
			};
		}

		try {
			if (formData?.quotes) {
				let tempQuotes = formData.quotes.split(',');
				formData.quotes = tempQuotes.map((elem: string) => elem.trim());
			}

			formData.occurrence_year = isNaN(Math.abs(formData.occurrence_year))
				? ''
				: Math.abs(formData.occurrence_year);

			// set boolean values
			formData.draft = formData.draft === 'true';
			formData.deleted = formData.deleted === 'true';
			formData.base_translation = formData.base_translation === 'true';
			formData.published = formData.published === 'true';

			const result = editMiracleSchema.parse(formData);

			console.log('Result: ', result);

			const { data, error } = await supabase
				.from('miracles')
				.update(result)
				.eq('id', params.id)
				.select();

			if (data.length === 0) {
				if (useDebug()) {
					console.log(
						`User: ${(userData as unknown as UserDataTableType).supabase_id} is unable to update record: ${result.name}`
					);
				}

				throw new Error('Unable to process record on behalf of user');
			}

			if (error) {
				if (useDebug()) {
					console.log(`Unable to update record: ${result.name}`);
					console.warn(error);
				}

				throw new AuthApiError(error.message, error.status, error.code);
			}
		} catch (e: any) {
			if (e instanceof ZodError) {
				console.log('error: ', e);
				const { fieldErrors: errors } = e.flatten();
				return {
					data: formData,
					errors
				};
			} else if (e instanceof AuthApiError) {
				return {
					data: formData,
					errors: {
						message: e.message
					}
				};
			} else {
				return {
					data: formData,
					errors: {
						message: 'Unknown error encountered.'
					}
				};
			}
		}

		redirect(303, `/dashboard/miracles/${params.id}`);
	}
};
