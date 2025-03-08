import { genericApiCall } from '$lib/utils/api-utils';
import type { FullMiracleData, ServerErrorType } from '$lib/utils/types/general-types';
import { supabase } from '$lib/server/supabaseClient';
import { error } from '@sveltejs/kit';

export const load: ({ params }: { params: any }) => Promise<{
	miracleData: FullMiracleData[];
}> = async () => {
	const [miracleData, miracleError]: [FullMiracleData[], ServerErrorType | null] =
		await genericApiCall<FullMiracleData>(
			await supabase.from('miracles').select('*, countries (name, id), languages (name, code)')
		);

	if (miracleError) {
		error(miracleError.status, {
			message: miracleError.statusText
		});
	}
	return {
		miracleData
	};
};
