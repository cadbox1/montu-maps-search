import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutoComplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";

config();

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
	const apiKey = process.env.TOMTOM_API_KEY!;

	describe("getAutoCompleteDetails", () => {
		it("returns a promise", async () => {
			const res = getAutoCompleteDetails("Charlotte Street");
			expect(res).toBeInstanceOf(Promise);
			await res; // tell jest to wait for the response so it can handle any errors
		});

		it("can fetch from the autocomplete api", async () => {
			const res = await getAutoCompleteDetails("Charlotte Street");
			const firstRes = res[0];
			expect(firstRes).toHaveProperty("placeId");
			expect(firstRes).toHaveProperty("streetNumber");
			expect(firstRes).toHaveProperty("countryCode");
			expect(firstRes).toHaveProperty("country");
			expect(firstRes).toHaveProperty("freeformAddress");
			expect(firstRes).toHaveProperty("municipality");
		});

		it("only fetches australian addresses", async () => {
			const res = await getAutoCompleteDetails("Charlotte Street");
			res.forEach((result) => {
				expect(result.countryCode).toBe("AU");
			});
		});
	});

	describe("getPlaceAutoComplete", () => {
		it("handles no results", async () => {
			const res = await getPlaceAutoComplete(
				apiKey,
				"asfasffasfasafsafs"
			);
			expect(res).toStrictEqual([]);
		});

		it("handles error", async () => {
			expect(getPlaceAutoComplete(apiKey, "")).rejects.toThrow();
		});
	});
});
