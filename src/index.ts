import { AutoCompleteResult, getPlaceAutoComplete } from "./maps-api";

/**
 * Get a list of possible addresses for a given search string.
 * The function will only return Australian addresses.
 *
 * @param input a search string used to filter addresses.
 * @returns AutoCompleteResult[], a list of possible addresses for the input string.
 */
export async function getAutoCompleteDetails(
	input: string
): Promise<AutoCompleteResult[]> {
	const apiKey = process.env.TOMTOM_API_KEY!;

	const res = await getPlaceAutoComplete(apiKey, input);

	return res;
}
