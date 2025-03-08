import { supabase } from '$lib/server/supabaseClient';
import {
	COUNTRY_DATA_SELECT_QUERY,
	genericApiCall,
	LIST_DATA_SELECT_QUERY
} from '$lib/utils/api-utils';
import type { FilterData, ListData, ServerErrorType } from '$lib/utils/types/general-types';
import { error } from '@sveltejs/kit';

export const load: ({ params }: { params: any }) => Promise<{
	miracleData: ListData[];
	countryData: FilterData[];
}> = async ({ params }) => {
	const [miracleData, miracleError]: [ListData[], ServerErrorType | null] =
		await genericApiCall<ListData>(
			supabase
				.from('miracles')
				.select(LIST_DATA_SELECT_QUERY)
				.eq('language_code', params.language_code)
				.eq('deleted', false)
				.eq('draft', false)
		);

	if (miracleError) {
		error(miracleError.status, {
			message: miracleError.statusText
		});
	}

	const countryKeys: string[] = miracleData
		.map((data: ListData) => data.countries?.id)
		.filter((id): id is string => id !== null && id !== undefined);

	if (countryKeys.length === 0) {
		error(418, 'Could not get Country ID from Miracle Data.');
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
		miracleData,
		countryData
	};
};
