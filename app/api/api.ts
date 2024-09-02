import axios from 'axios';

class API {
	async get(url: string) {
		try {
			const response = await axios.get(url);
			const result = response.data;
			return result;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}
}

const api = new API();

export default api;