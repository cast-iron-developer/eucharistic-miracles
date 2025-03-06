import type { Actions, PageServerLoad } from './$types';
import type {
	CountryTableType,
	LanguageTableType,
	MiracleTableType,
	ServerErrorType
} from '$lib/utils/types/general-types';
import { genericApiCall } from '$lib/utils/apiUtils';
import { supabase } from '$lib/server/supabaseClient';
import { error } from '@sveltejs/kit';
import { editMiracleSchema } from '$lib/utils/authSchema/edit-miracle-schema';
import { ZodError } from 'zod';

export const load: PageServerLoad = async ({ params }) => {
	const [miracleData, miracleError]: [MiracleTableType[], ServerErrorType | null] =
		await genericApiCall<MiracleTableType>(
			supabase.from('miracles').select('*').eq('slug', params.slug).limit(1)
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
	update: async ({ request, locals: { supabase } }) => {
		const formData: any = Object.fromEntries(await request.formData());

		if (formData?.quotes) {
			let tempQuotes = formData.quotes.split(',');
			formData.quotes = tempQuotes.map((elem: string) => elem.trim());
		}

		if (formData?.deleted) {
			formData.deleted = formData.deleted === 'true';
		}

		if (formData?.draft) {
			formData.draft = formData.draft === 'true';
		}

		try {
			const result = editMiracleSchema.parse(formData);
		} catch (e: any) {
			if (e instanceof ZodError) {
				const { fieldErrors: errors } = e.flatten();

				return {
					data: formData,
					errors
				};
			}
		}
	}
};
