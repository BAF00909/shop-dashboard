'use client';

import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { Dispatch, SetStateAction } from "react";
import styles from './filter.module.css';
import { InputTextField } from "@/app/components/input-text-field/input-text-field";
import { withData } from "@/app/lib/hoc/withData";
import { HOST, ProductGrops, Supplies as SuppliesUrl } from "@/app/api/url";
import { Select } from "@/app/components/select/select";

interface IProps {
	filterState: Record<string, any>,
	setFilterState: Dispatch<SetStateAction<Record<string, any>>>,
	setProductsState: Dispatch<SetStateAction<IPagination>>,
	list: Array<Record<string, any>>
}

const ProductGroups = ({filterState, setFilterState, list}: IProps) => {
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
const ProductGroupsList = withData(ProductGroups, `${HOST}${ProductGrops}/all`);

const Supplies = ({filterState, setFilterState, list}: IProps) => {
	return (
		<Select
			id="SupplyId"
			name="SupplyId"
			lable="Поставка"
			list={list?.map((item) => ({value: item.Id, text: `${item.Number} - ${item.Date}`}))}
			initValue={filterState?.SupplyId || ''}
			handler={(data: Record<string, any>) => {
				setFilterState(oldValue => ({...oldValue, ...data}));
			}}
		/>
	)
}
const SuppliesList = withData(Supplies, `${HOST}${SuppliesUrl}/all`);

const Filter = ({filterState, setFilterState, setProductsState, list}: IProps) => {
	return (
		<div className={styles.filterContainer}>

				<div className={styles.fields}>
					<InputTextField
						id="ProductName"
						name="ProductName"
						lable="Наименование"
						initValue={filterState?.ProductName || ''}
						handler={(data: Record<string, any>) => {
							setFilterState(oldValue => ({...oldValue, ...data}));
						}}
					/>
					<InputTextField
						id="Art"
						name="Art"
						lable="Артикул"
						initValue={filterState?.Art || ''}
						handler={(data: Record<string, any>) => {
							setFilterState(oldValue => ({...oldValue, ...data}));
						}}
					/>
					<InputTextField
						id="Cost"
						name="Cost"
						lable="Цена"
						initValue={filterState?.Cost || ''}
						handler={(data: Record<string, any>) => {
							setFilterState(oldValue => ({...oldValue, ...data}));
						}}
					/>
					<ProductGroupsList
						filterState={filterState}
						setFilterState={setFilterState}
						setProductsState={setProductsState}
					/>
					<SuppliesList
						filterState={filterState}
						setFilterState={setFilterState}
						setProductsState={setProductsState}
					/>
				</div>

				<div className={styles.filterTools}>
					<button onClick={() => {
						setProductsState((oldValue) => ({
							...oldValue,
							filterQuery: oldValue.filterQuery ?
							[...oldValue.filterQuery, ...Object.entries(filterState).map(([prop, value]) => ({property: prop, value: value}))] :
							Object.entries(filterState).map(([prop, value]) => ({property: prop, value: value}))
						}))
					}}>Применить</button>
					<button onClick={() => {
						setProductsState((oldValue) => ({
							...oldValue,
							filterQuery: []}))
							setFilterState({})
					}}>Сбросить</button>
				</div>

		</div>
	)
}

export default withData(Filter, `${HOST}${ProductGrops}/all`)