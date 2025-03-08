import { supabase } from '$lib/server/supabaseClient';

import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes';
import {
	COUNTRY_DATA_SELECT_QUERY,
	genericApiCall,
	LIST_DATA_SELECT_QUERY
} from '$lib/utils/api-utils';
import type { FilterData, ListData, ServerErrorType } from '$lib/utils/types/general-types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const [ourLadyData, ourLadyError]: [ListData[], ServerErrorType | null] =
		await genericApiCall<ListData>(
			supabase
				.from('our_lady')
				.select(LIST_DATA_SELECT_QUERY)
				.eq('language_code', params.language_code)
				.eq('deleted', false)
				.eq('draft', false)
		);

	if (ourLadyError) {
		error(ourLadyError.status, {
			message: ourLadyError.statusText
		});
	}

	const countryKeys: string[] = ourLadyData
		.map((data: ListData) => data.countries?.id)
		.filter((id): id is string => id !== null && id !== undefined);

	if (countryKeys.length === 0) {
		error(404, {
			message: "Could not get Country ID from Our Lady's Data."
		});
	}

	const [countryData, countryError]: [FilterData[], ServerErrorType | null] =
		await genericApiCall<FilterData>(
			supabase.from('countries').select(COUNTRY_DATA_SELECT_QUERY).in('id', countryKeys)
		);

	if (countryError) {
		error(countryError.status, {
			message: countryError.statusText
		});
	}

	return {
		ourLadyData,
		countryData
	};
};
