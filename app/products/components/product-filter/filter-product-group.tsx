import { Select } from "@/app/components/select/select";
import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { Dispatch, SetStateAction } from "react";

interface IProps {
	filterState: Record<string, any>,
	setFilterState: Dispatch<SetStateAction<Record<string, any>>>,
	setProductsState: Dispatch<SetStateAction<IPagination>>,
	list: Array<Record<string, any>>
}

export const ProductGroups = ({filterState, setFilterState, list}: IProps) => {
	return (
		<Select
			id="ProductGroupId"
			name="ProductGroupId"
			lable="Категория"
			list={list?.map((item) => ({value: item.Id, text: item.GroupName}))}
			initValue={filterState?.ProductGroupId || ''}
			handler={(data: Record<string, any>) => {
				setFilterState(oldValue => ({...oldValue, ...data}));
			}}
		/>
	)
}
