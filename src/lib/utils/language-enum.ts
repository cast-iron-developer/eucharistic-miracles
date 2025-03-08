enum LanguageEnum {
	Chinese = 'zh',
	German = 'de',
	English = 'en',
	Spanish = 'es',
	Filipino = 'fil',
	French = 'fr',
	Greek = 'el',
	Magyar = 'hun',
	Italian = 'it',
	Dutch = 'nl',
	Polish = 'pl',
	Portuguese = 'pt',
	Russian = 'ru',
	Vietnamese = 'vi'
}

export const validLanguageCode = (value: string): boolean => {
	return Object.values(LanguageEnum).includes(value as LanguageEnum);
};
