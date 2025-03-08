import type { PageServerLoad } from '../../../../../../.svelte-kit/types/src/routes';
import { genericApiCall } from '$lib/utils/api-utils';
import { supabase } from '$lib/server/supabaseClient';
import { carouselItems } from '$lib/utils/testData/carousel-items';
import type { CarouselItem } from '$lib/utils/types/general-types';

export const load: PageServerLoad = async ({ params }) => {
	const [miracleData, miracleError] = await genericApiCall(
		supabase
			.from('miracles')
			.select('*')
			.eq('language_code', params.language_code)
			.eq('slug', params.slug)
			.eq('deleted', false)
			.eq('draft', false)
	);

	if (miracleError) {
		console.error(`Error fetching data for ${params.slug}`);
		return { miracleData: [], carouselData: [] };
	}

	if (!miracleData || miracleData.length === 0) {
		console.warn(`No data found for ${params.slug}`);
		return { miracleData: [], carouselData: [] };
	}

	const carouselData: CarouselItem[] = carouselItems;

	return {
		miracleData,
		carouselData
	};
};
