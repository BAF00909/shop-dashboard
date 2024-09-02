'use client';

import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { Dispatch, SetStateAction } from "react";
import styles from './filter.module.css';
import { InputTextField } from "@/app/components/input-text-field/input-text-field";
import { withData } from "@/app/lib/hoc/withData";
import { HOST, ProductGrops } from "@/app/api/url";
import { IProductGroup } from "@/app/interfaces/common/product-groups.interface";
import { Select } from "@/app/components/select/select";

interface IProps {
	filterState: Record<string, any>,
	setFilterState: Dispatch<SetStateAction<Record<string, any>>>,
	setProductsState: Dispatch<SetStateAction<IPagination>>,
	list: Array<IProductGroup>
}

const Filter = ({filterState, setFilterState, setProductsState, list}: IProps) => {
	console.log(list);
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
					<Select
						id="ProductGroupId"
						name="ProductGroupId"
						lable="Категория"
						list={list}
						initValue={filterState?.ProductGroupId || ''}
						handler={(data: Record<string, any>) => {
							setFilterState(oldValue => ({...oldValue, ...data}));
						}}
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