'use client';

import api from "@/app/api/api";
import { HOST, Products } from "@/app/api/url";
import { IPagination } from "@/app/interfaces/common/pagination.interface";
import { useEffect, useMemo, useState } from "react";
import { IProduct } from "./product.interface";
import { DataTable } from "@/app/components/data-table/data-table";
import { columns } from "./columns";

export const ProductsContainer = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const [productsState, setProductsState] = useState<IPagination>({
		skip: 0,
		take: 10,
		page: 0,
		pageCount: 0
	});
	const productColumns = useMemo(() => columns, []);

	useEffect(() => {
		const getProductsList = async () => {
			const response = await api.get(`${HOST}${Products}/all?skip=${productsState.skip}&take=${productsState.take}`);
			if (response) {
				setProducts(response.result.list)
				setProductsState(state => ({...state, pageCount: response.result.totalPage}))
			}
		}
		getProductsList();
	}, [productsState.skip, productsState.take])

	const nextPrevPage = (value: number) => {
		setProductsState(state => ({
			...state,
			skip: value * state.take,
			page: value
		}))
	}

	return (
		<div>
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