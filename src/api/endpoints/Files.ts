import type { AxiosResponse } from 'axios';

import { API } from '~/api';
import type { XMLItem } from '~/App';

export async function create(data: XMLItem): Promise<AxiosResponse<void>> {
	const response = await API.post('/files', data);
	return response;
}
