import axios from "axios";

export interface TomTomRequestParameters {
	key: string;
	countrySet: string;
	limit: number;
}

export interface TomTomResponse {
	results: [TomTomResult];
}

export interface TomTomResult {
	id: string;
	address: TomTomAddress;
}

export interface TomTomAddress {
	freeformAddress: string;
	streetNumber: string;
	streetName: string;
	municipality: string;
	countrySubdivision: string;
	country: string;
	countryCode: string;
	postalCode: string;
}

export interface AutoCompleteResult {
	placeId: string;
	freeformAddress: string;
	streetNumber: string;
	streetName: string;
	municipality: string;
	countrySubdivision: string;
	country: string;
	countryCode: string;
	postalCode: string;
}

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutoComplete(
	key: string,
	address: string
): Promise<AutoCompleteResult[]> {
	const params: TomTomRequestParameters = {
		key,
		countrySet: "AU",
		limit: 100,
	};

	const searchResponse = await axios.get<TomTomResponse>(
		`https://api.tomtom.com/search/2/search/${address}.json'`,
		{
			params,
		}
	);
	return searchResponse.data.results.map((result) => {
		const {
			freeformAddress,
			streetNumber,
			streetName,
			municipality,
			countrySubdivision,
			country,
			countryCode,
			postalCode,
		} = result.address;

		return {
			placeId: result.id,
			freeformAddress,
			streetNumber,
			streetName,
			municipality,
			countrySubdivision,
			country,
			countryCode,
			postalCode,
		};
	});
}
