import { createColumnHelper } from "@tanstack/react-table"
import { IProduct } from "../../../interfaces/products/product.interface"
import { format } from "date-fns";

const columnHelper = createColumnHelper<IProduct>();
export const columns = [
	columnHelper.accessor('Art', {id: 'art', header: 'Артикул'}),
	columnHelper.accessor('ProductName', {id: 'productName', header: 'Наименование'}),
	columnHelper.accessor('ProductGroups.GroupName', {id: 'productGroup', header: 'Категория'}),
	columnHelper.accessor('Cost', {id: 'cost', header: 'Цена'}),
	columnHelper.accessor('DateIn', {id: 'dateIn', header: 'Дата прихода', cell(props) {
		return <>{format(props.row.original.DateIn, 'dd.MM.yyyy')}</>
	},}),
	columnHelper.accessor('Supplies.Date', {id: 'dateSupply', header: 'Дата поставки', cell(props) {
		return <>{format(props.row.original.Supplies.Date, 'dd.MM.yyyy HH:mm:ss')}</>
	},}),
	columnHelper.accessor('Supplies.Providers.ProviderName', {id: 'provider', header: 'Поставщик'})
]