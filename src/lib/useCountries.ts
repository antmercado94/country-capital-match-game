import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { CountryData } from '../types';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital';

export default function useCountries() {
	return useQuery({
		queryKey: ['countries'],
		queryFn: async () => {
			const { data }: { data: CountryData[] } = await axios.get(API_URL);
			return data;
		},
	});
}
