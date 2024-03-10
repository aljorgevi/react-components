import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { create } from 'zustand'
import { INVALID_PARAMS_ERROR } from '../utils/error-messages'

const useParamsStore = create(set => ({
	params: {},
	setParams: params => set({ params })
}))

/**
 * @callback SetQueryParamsFunction
 * @param {Object<string, string>} params - An object containing the new query parameters, where keys and values are both strings.
 * @throws {Error} If the 'params' argument is not an object or is undefined.
 * @returns {void}
 */

/**
 * Custom hook for managing query parameters in the URL.
 *
 * @returns {{ searchParams: URLSearchParams, setQueryParams: SetQueryParamsFunction }} An object containing the current search
 * parameters object and a function to set new query parameters.
 */
export function useSetQueryParams() {
	const { pathname } = useLocation()
	const history = useHistory()
	const { params: currentQueryParams, setParams: setCurrentQueryParams } = useParamsStore()

	/** @type {SetQueryParamsFunction} */
	function setQueryParams(params) {
		if (typeof params !== 'object' || params === null) throw new Error(INVALID_PARAMS_ERROR)

		const newQueryParams = { ...currentQueryParams, ...params }
		setCurrentQueryParams(newQueryParams)

		history.push({ pathname, search: qs.stringify(newQueryParams) })
	}

	return { searchParams: currentQueryParams, setQueryParams }
}
