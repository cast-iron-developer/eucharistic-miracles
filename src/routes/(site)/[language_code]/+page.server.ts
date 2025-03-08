import { supabase } from '$lib/server/supabaseClient';
import { genericApiCall } from '$lib/utils/api-utils';
import type { Database } from '$lib/server/database.types';
import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes';
import { error } from '@sveltejs/kit';
import type {
	LanguageData,
	MiracleTableType,
	OurLadyTableType,
	SaintTableType,
	ServerErrorType
} from '$lib/utils/types/general-types';

type Saint = Database['public']['Tables']['saints']['Row'];

export const load: PageServerLoad = async ({ params }) => {
	if (params.language_code === null || params.language_code === undefined) {
		error(400, {
			message: 'Bad Request'
		});
	}

	const [languageData, languageError]: [LanguageData[], ServerErrorType | null] =
		await genericApiCall(supabase.from('languages').select('*').eq('code', params.language_code));

	if (languageError) {
		error(languageError.status, {
			message: languageError.statusText
		});
	}

	const [miracleData, miracleError]: [MiracleTableType[], ServerErrorType | null] =
		await genericApiCall(
			supabase
				.from('miracles')
				.select('*')
				.eq('deleted', false)
				.eq('draft', false)
				.eq('language_code', params.language_code)
		);

	if (miracleError) {
		error(miracleError.status, {
			message: miracleError.statusText
		});
	}

	const [saintData, saintError]: [SaintTableType[], ServerErrorType | null] =
		await genericApiCall<SaintTableType>(
			supabase
				.from('saints')
				.select('*')
				.eq('deleted', false)
				.eq('draft', false)
				.eq('language_code', params.language_code)
		);

	if (saintError) {
		error(saintError.status, {
			message: saintError.statusText
		});
	}

	const miraculousCommunions: {} = saintData
		? saintData.filter((item: Saint) => item.miraculous_communion)
		: {};
	const saints: {} = saintData ? saintData.filter((item: Saint) => !item.miraculous_communion) : {};

	const [ourLadyData, ourLadyError]: [OurLadyTableType[], ServerErrorType | null] =
		await genericApiCall<OurLadyTableType>(
			supabase
				.from('our_lady')
				.select('*')
				.eq('deleted', false)
				.eq('draft', false)
				.eq('language_code', params.language_code)
		);

	if (ourLadyError) {
		error(ourLadyError.status, {
			message: ourLadyError.statusText
		});
	}

	return {
		miracleData,
		communions: miraculousCommunions,
		saints: saints,
		ourLadyData,
		code: params.language_code
	};
};
