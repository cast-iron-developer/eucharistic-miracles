export type LoginFormType = {
	data?: {
		email: string;
	};
	errors?: {
		email?: string[];
		password?: string[];
		message: string;
	};
};

export type MiracleFormType = {
	data?: {
		base_translation: boolean;
		blurb: string;
		country_id: string;
		deleted: boolean;
		draft: boolean;
		language_code: boolean;
		name: string;
		story: string;
		occurrence_year: number;
		quotes: string[];
		published: boolean;
		type: string;
	};
	errors?: {
		base_translation: string[];
		blurb: string[];
		country_id: string[];
		deleted: string[];
		draft: string[];
		language_code: string[];
		name: string[];
		occurrence_year: string[];
		quotes: string[];
		story: string[];
		published: string[];
		type: string[];
		message: string;
	};
};