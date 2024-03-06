import { tracFlowInputCategoriesData } from '../../../../data/local-data'
// import { getDatasetIdToFetch, mockFileContentControllTableFetch, mockSearchCall } from '@/utils/helpers'

export function useGetControlTable(key) {
	// the idea behind this is that we have a hook that uses react-query to fetch the data and is available in sync state.
	// async function fetchData() {
	// 	const searchResponse = await mockSearchCall('file_content', { attr: '', value: '' })
	// 	const datasetId = getDatasetIdToFetch(searchResponse)
	// 	const data = await mockFileContentControllTableFetch(datasetId)

	// 	return data
	// }

	return tracFlowInputCategoriesData
} // Path: components/run-a-job/hooks/useRunAJob.jsx
