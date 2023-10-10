export type CountryData = {
	name: {
		common: string;
		official: string;
		nativeName: {
			[key: string]: {
				official: string;
				common: string;
			};
		};
	};
	capital: string[];
};
