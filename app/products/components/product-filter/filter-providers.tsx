import { Select } from "@/app/components/select/select";
import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { Dispatch, SetStateAction } from "react";

interface IProps {
	filterState: Record<string, any>,
	setFilterState: Dispatch<SetStateAction<Record<string, any>>>,
	setProductsState: Dispatch<SetStateAction<IPagination>>,
	list: Array<Record<string, any>>
}

export const Provider = ({filterState, setFilterState, list}: IProps) => {
	return (
		<Select
			id="Supplies.Providers.ProviderName"
			name="Supplies.Providers.ProviderName"
			lable="Поставщик"
			list={list?.map((item) => ({value: item.ProviderName, text: `${item.ProviderName}`}))}
			initValue={filterState?.ProviderName || ''}
			handler={(data: Record<string, any>) => {
				setFilterState(oldValue => ({...oldValue, ...data}));
			}}
		/>
	)
}