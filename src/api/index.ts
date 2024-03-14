import Card from '../models/Card';
import { data } from './mockData';

const fetchList = (): Promise<Card[]> => {
	return Promise.resolve(data);
};

export const listAPI = {
	fetchList,
};
