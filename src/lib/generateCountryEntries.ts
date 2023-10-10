import type { CountryData } from '../types';
import getRandomArrEl from '../util/getRandomArrEl';

export default function generateCountryEntries(
	countries: CountryData[],
	limit: number
) {
	const randEntries: string[][] = [];

	while (randEntries.length < limit) {
		const {
			name: { common: country },
			capital: [capital],
		} = getRandomArrEl(countries);

		if (country && capital) randEntries.push([country, capital]);
	}

	return randEntries;
}
