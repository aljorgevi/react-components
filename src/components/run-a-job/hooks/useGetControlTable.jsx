// import { getDatasetIdToFetch, mockFileContentControllTableFetch, mockSearchCall } from '@/utils/helpers'
import data from '../../../../data/control_table_flow_input_categories_data.json'

// custom hook using react query to fetch the control table data
export function useGetControlTable(key) {
	return data
}
