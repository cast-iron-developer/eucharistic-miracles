import { supabase } from '$lib/server/supabaseClient';

import type { FilterData, ListData, ServerErrorType } from '$lib/utils/types/general-types';
import {
	COUNTRY_DATA_SELECT_QUERY,
	genericApiCall,
	LIST_DATA_SELECT_QUERY
} from '$lib/utils/api-utils';
import { error } from '@sveltejs/kit';

export const load: ({ params }: { params: any }) => Promise<{
	communionData: ListData[];
	countryData: FilterData[];
}> = async ({ params }) => {
	const [communionData, communionError]: [ListData[], ServerErrorType | null] =
		await genericApiCall<ListData>(
			supabase
				.from('saints')
				.select(LIST_DATA_SELECT_QUERY)
				.eq('language_code', params.language_code)
				.eq('miraculous_communion', true)
				.eq('deleted', false)
				.eq('draft', false)
		);

	if (communionError) {
		error(communionError.status, {
			message: communionError.statusText
		});
	}

	const countryKeys: string[] = communionData
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
		communionData,
		countryData
	};
};
