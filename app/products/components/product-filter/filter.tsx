'use client';

import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { Dispatch, SetStateAction } from "react";
import styles from './filter.module.css';
import { InputTextField } from "@/app/components/input-text-field/input-text-field";
import { withData } from "@/app/lib/hoc/withData";
import { HOST, ProductGrops, Providers, Supplies as SuppliesUrl } from "@/app/api/url";
import { ProductGroups } from "./filter-product-group";
import { Supplies } from "./filter-supplies";
import { Provider } from "./filter-providers";

interface IProps {
	filterState: Record<string, any>,
	setFilterState: Dispatch<SetStateAction<Record<string, any>>>,
	setProductsState: Dispatch<SetStateAction<IPagination>>,
	list: Array<Record<string, any>>
}

const ProductGroupsList = withData(ProductGroups, `${HOST}${ProductGrops}/all`);
const SuppliesList = withData(Supplies, `${HOST}${SuppliesUrl}/all`);
const ProvidersList = withData(Provider, `${HOST}${Providers}/all`);

const Filter = ({filterState, setFilterState, setProductsState, list}: IProps) => {
	return (
		<div className={styles.filterContainer}>

				<div className={styles.fields}>
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
						id="ProductName"
						name="ProductName"
						lable="Наименование"
						initValue={filterState?.ProductName || ''}
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
					<InputTextField
						type={'date'}
						id="DateIn"
						name="DateIn"
						lable="Дата прихода"
						initValue={filterState?.DateIn || ''}
						handler={(data: Record<string, any>) => {
							setFilterState(oldValue => ({...oldValue, ...data}));
						}}
					/>
					<SuppliesList
						filterState={filterState}
						setFilterState={setFilterState}
						setProductsState={setProductsState}
					/>
					<ProvidersList
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