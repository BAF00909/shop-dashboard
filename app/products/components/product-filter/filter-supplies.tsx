import { Select } from "@/app/components/select/select";
import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface IProps {
	filterState: Record<string, any>,
	setFilterState: Dispatch<SetStateAction<Record<string, any>>>,
	setProductsState: Dispatch<SetStateAction<IPagination>>,
	list: Array<Record<string, any>>
}

export const Supplies = ({filterState, setFilterState, list}: IProps) => {
	return (
		<Select
			id="SupplyId"
			name="SupplyId"
			lable="Поставка"
			list={list?.map((item) => ({value: item.Id, text: `${item.Number} - ${format(item.Date, 'dd.MM.yyyy HH:mm')}`}))}
			initValue={filterState?.SupplyId || ''}
			handler={(data: Record<string, any>) => {
				setFilterState(oldValue => ({...oldValue, ...data}));
			}}
		/>
	)
}