import { atom } from 'recoil';
import { TaskType } from './types';

export const selectedTaskState = atom<TaskType>({
	key: 'task/selected',
	default: {
		id: 0,
		title: '',
		created_at: ''
	}
});
