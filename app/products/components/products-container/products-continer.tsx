'use client';

import api from "@/app/api/api";
import { HOST, Products } from "@/app/api/url";
import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { useEffect, useMemo, useState } from "react";
import { IProduct } from "./product.interface";
import { DataTable } from "@/app/components/data-table/data-table";
import { columns } from "./columns";
import { urlBuilder } from "@/app/lib/helper/queryUrlBuiler";
import Filter from "../product-filter/filter";

export const ProductsContainer = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [productsState, setProductsState] = useState<IPagination>({
		skip: 0,
		take: 10,
		page: 0,
		pageCount: 0,
		filterQuery: []
	});
	const [filterState, setFilterState] = useState<Record<string, any>>({})
	const productColumns = useMemo(() => columns, []);

	const getProductsList = async (skip: number, take: number) => {
		const response = await api.get(`${HOST}${Products}/all${urlBuilder(skip, take, productsState.filterQuery)}`);
		if (response) {
			setProducts(response.result.list)
			setProductsState(state => ({...state, pageCount: response.result.totalPage}))
		}
	}

	useEffect(() => {
		getProductsList(productsState.skip, productsState.take);
	}, [productsState.skip, productsState.take, productsState.filterQuery])

	const nextPrevPage = (value: number) => {
		setProductsState(state => ({
			...state,
			skip: value * state.take,
			page: value
		}))
	}

	return (
		<div>
			<Filter filterState={filterState} setFilterState={setFilterState} setProductsState={setProductsState} />
			<DataTable
				data={products}
				columns={productColumns}
				pagination={{
					pageIndex: productsState.page,
					pageSize: productsState.take
				}}
				pageCount={productsState.pageCount}
				onNextPrevPageHandler={nextPrevPage}
			/>
		</div>
	)
}