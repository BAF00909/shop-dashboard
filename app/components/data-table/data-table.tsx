'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import styles from './data-table.module.css';
interface IProps {
	data: Record<string, any>[],
	columns: ColumnDef<Record<string, any>, any>[] | any,
	pagination: { pageIndex: number, pageSize: number },
	pageCount: number,
	onNextPrevPageHandler: (value: number) => void
}

export const DataTable = ({data, columns, pagination, pageCount, onNextPrevPageHandler }: IProps) => {
	const table = useReactTable({
		data,
		columns,
		defaultColumn: {
			size: 150,
			minSize: 100,
			maxSize: 250
		},
		pageCount,
		state: {
			pagination
		},
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: 'onEnd',
		manualPagination: true,
		onPaginationChange: (updater) => {
			const newPagination = typeof updater === 'function' ? updater({ ...pagination }) : null;
			if (newPagination) {
				onNextPrevPageHandler(newPagination?.pageIndex)
			}
		}
	});

	return (
		<div>
		<table className={styles.table}>
			<thead>
			{table.getHeaderGroups().map(headerGroup => (
				<tr key={headerGroup.id} className={styles.tr}>
				{headerGroup.headers.map(header => (
					<th key={header.id} className={styles.th} style={{width: header.getSize()}}>
					{header.isPlaceholder
						? null
						: flexRender(
							header.column.columnDef.header,
							header.getContext()
						)}
						<div
							onMouseDown={header.getResizeHandler()}
							className={styles.resizer}
							/>
					</th>
				))}
				</tr>
			))}
			</thead>
			<tbody>
			{table.getRowModel().rows.map(row => (
				<tr key={row.id} className={styles.tr}>
				{row.getVisibleCells().map(cell => (
					<td key={cell.id} className={styles.td}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				))}
				</tr>
			))}
			</tbody>
			<tfoot>
			{table.getFooterGroups().map(footerGroup => (
				<tr key={footerGroup.id} className={styles.tr}>
				{footerGroup.headers.map(header => (
					<th key={header.id} className={styles.td}>
					{header.isPlaceholder
						? null
						: flexRender(
							header.column.columnDef.footer,
							header.getContext()
						)}
					</th>
				))}
				</tr>
			))}
			</tfoot>
      	</table>
		<button
			disabled={!table.getCanPreviousPage()}
			onClick={() => table.previousPage()}
		>Назад</button>
		<span>
          Страница{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
          </strong>
        </span>
		<button
			disabled={!table.getCanNextPage()}
			onClick={() => table.nextPage()}
		>Вперед</button>
		</div>
	)
}