import qs from 'qs';

import { IStrapiResponse } from '../types/interfaces';

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ''): string {
	return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {RequestInfo} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns {Promise<IStrapiResponse>} Parsed API call response
 */
export async function fetchAPI<T = IStrapiResponse>(
	path: RequestInfo,
	urlParamsObject: object = {},
	options: object = {}
): Promise<IStrapiResponse | T> {
	// Merge default and user options
	const mergedOptions = {
		headers: {
			'Content-Type': 'application/json'
		},
		...options
	};

	// Build request URL
	const queryString = qs.stringify(urlParamsObject);
	const requestUrl = getStrapiURL(`/api${path}?${queryString || ''}`);

	// Trigger API call
	const response = await fetch(requestUrl, mergedOptions);

	// Handle response
	if (!response.ok) {
		console.log('Failed', requestUrl);
		console.error('An error occured ', response.statusText);
		throw new Error(`An error occured please try again`);
	}

	console.log('OK', requestUrl);
	const data: IStrapiResponse | T = (await response.json()) as IStrapiResponse;
	return data;
}
