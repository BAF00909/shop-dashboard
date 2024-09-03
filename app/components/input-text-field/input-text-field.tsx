import styles from './input.module.css';
interface IProps {
	initValue: any,
	handler: (data: Record<string, any>) => void,
	lable: string,
	id: string,
	name: string,
	type?: 'text' | 'number' | 'date'
}

export const InputTextField = ({id, lable, initValue, name, handler, type = 'text'}: IProps) => {
	return (
			<div className={styles.wrapper}>
				<label htmlFor={id}>{lable}</label>
				<input
					className={styles.input}
					type={type}
					id={id}
					name={name}
					value={initValue || ''}
					onChange={(e) => {
						handler({[name]: e.target.value});
					}}
				/>
			</div>
	)
}
