'use client';
import { HOST, ProductGrops } from "@/app/api/url";
import { ComponentType, ReactNode, useEffect, useState } from "react";

export const withData = <T extends object>(Component: ComponentType<T>, url: string) => {
	const HOC =  (props: any) => {
		const [list, setList] = useState<Array<Record<string, any>>>()
		const getData = async (url: string) => {
			try {
				const response = await fetch(url);
				const grops = await response.json();
				setList(grops.result);
			} catch (error) {
				console.log(error);
			}
		}
		useEffect(() => {
			getData(url)
		}, [])
		return (<Component {...props} list={list}/>)
	}

	HOC.displayName  = `${Component.displayName || Component.name || 'Component'}`;

	return HOC;
}

withData.displayName = 'withData'