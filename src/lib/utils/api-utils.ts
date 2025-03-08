import type { QueryError } from '@supabase/supabase-js';
import type { ServerErrorType } from '$lib/utils/types/general-types';

export const LIST_DATA_SELECT_QUERY: string = `id, name, blurb, type, slug, language_code, countries (name, id)`;
export const COUNTRY_DATA_SELECT_QUERY: string = 'id, name, type';
export const LANGUAGE_DATA_SELECT_QUERY: string = 'id, name, code';

export async function genericApiCall<T>(apiCall: any): Promise<[T[], ServerErrorType | null]> {
	let response;
	let serverError: ServerErrorType | undefined = undefined;
	try {
		response = await apiCall;
		if (response.error !== null || response.status !== 200 || response.data.length === 0) {
			throw new Error('Could not retrieve data');
		}

		return [response.data, null];
	} catch (error: unknown) {
		if (response.error !== null) {
			const errorCode = (response.error as QueryError).code ?? 500;
			const errorText = (response.error as QueryError).hint ?? 'Internal Server Error';
			serverError = {
				status: errorCode as unknown as number,
				statusText: errorText
			};
			return [[], serverError];
		}

		if (response.status === 200 && response.data.length === 0) {
			serverError = {
				status: 404,
				statusText: 'Not Found'
			};
			return [[], serverError];
		}

		serverError = {
			status: response.status,
			statusText: response.statusText
		};
		return [[], serverError];
	}
}
