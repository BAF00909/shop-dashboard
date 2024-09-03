import styles from './select.module.css';
interface IProps {
	initValue: any,
	handler: (data: Record<string, any>) => void,
	lable: string,
	id: string,
	name: string,
	list: Array<Record<string, any>>
}
export const Select = ({id, initValue, lable, name, handler, list}: IProps) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={id}>{lable}</label>
			<select
			className={styles.select}
				id={id}
				name={name}
				value={initValue || ''}
				onChange={(e) => {
						handler({[name]: e.target.value});
					}}
			>
				{
					list?.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)
				}
			</select>
		</div>
	)
}