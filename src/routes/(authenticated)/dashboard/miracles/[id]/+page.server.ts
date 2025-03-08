import type { Actions, PageServerLoad } from './$types';
import type {
	CountryTableType,
	LanguageTableType,
	MiracleTableType,
	ServerErrorType,
	UserDataTableType
} from '$lib/utils/types/general-types';
import { genericApiCall } from '$lib/utils/api-utils';
import { supabase } from '$lib/server/supabaseClient';
import { error } from '@sveltejs/kit';
import { editMiracleSchema } from '$lib/utils/authSchema/edit-miracle-schema';
import { ZodError } from 'zod';
import { AuthApiError, type User } from '@supabase/supabase-js';
import { useDebug } from '$lib/utils/helpers/client-environment-helpers';
import { hasPermission } from '$lib/utils/role-permissions';

export const load: PageServerLoad = async ({ params }) => {
	const [miracleData, miracleError]: [MiracleTableType[], ServerErrorType | null] =
		await genericApiCall<MiracleTableType>(
			supabase.from('miracles').select('*').eq('id', params.id).limit(1)
		);

	if (miracleError) {
		error(miracleError.status, {
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
			console.log('hrklejl;jlej;');
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
			if (hasPermission(userData[0], 'miracles', 'delete')) {
				formData.deleted = formData.published === 'true';
			} else {
				formData.deleted = false;
			}
			formData.deleted = formData.deleted === 'true';
			formData.draft = formData.draft === 'true';
			formData.base_translation = formData.base_translation === 'true';
			if (hasPermission(userData[0], 'miracles', 'approve')) {
				formData.published = formData.published === 'true';
			} else {
				formData.published = false;
			}

			const result = editMiracleSchema.parse(formData);

			const { data, error } = await supabase
				.from('miracles')
				.update(result)
				.eq('id', params.id)
				.select();

			console.log('data: ', data);

			if (error) {
				if (useDebug()) {
					console.log(`Unable to update record: ${result.name}`);
					console.warn(error);
				}

				throw new AuthApiError(error.message, error.status, error.code);
			}
		} catch (e: any) {
			console.log('catch?');
			if (e instanceof ZodError) {
				console.log('here??????');
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
	}
};
