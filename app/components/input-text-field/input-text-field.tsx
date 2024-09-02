interface IProps {
	initValue: any,
	handler: (data: Record<string, any>) => void,
	lable: string,
	id: string,
	name: string
}

export const InputTextField = ({id, lable, initValue, name, handler}: IProps) => {
	return (
			<div>
				<label htmlFor={id}>{lable}</label>
				<input
					type="text"
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
