import { z } from 'zod';

export const toUpperCase = (str: string) => {
	return str.toUpperCase();
};

export const truncate = (str: string, maxLength: number) => {
	if (str.length < maxLength) return str;

	let reversed = str.substring(0, maxLength).split(' ').reverse();

	if (reversed[0].length < 3) {
		reversed = reversed.slice(2);
	} else {
		reversed = reversed.slice(1);
	}

	return reversed.reverse().join(' ') + '...';
};

export const convertBooleanValue = (fieldType: string, value: boolean): string => {
	let str: string = '';
	switch (fieldType) {
		case 'published':
			str = value ? 'Published' : 'Not Published';
			break;
		case 'deleted':
			str = value ? 'Deleted' : 'Not Deleted';
			break;
		default:
			str = 'Information not available';
	}
	return str;
};

export const superRefineFeeder = (fields: string[], msg: string, ctx: z.RefinementCtx) => {
	return fields.map((field: string) => {
		ctx.addIssue({
			code: 'custom',
			message: msg,
			path: [field]
		});
	});
};