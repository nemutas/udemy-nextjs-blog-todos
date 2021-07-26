import { TaskType } from './types';

export const getAllTasksData = async () => {
	const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`;
	const res = await fetch(url);
	const tasks = (await res.json()) as TaskType[];
	const sortedTasks = tasks.sort((a, b) =>
		new Date(b.created_at) > new Date(a.created_at) ? 1 : -1
	);
	return sortedTasks;
};

export const getAllTaskIds = async () => {
	const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`;
	const res = await fetch(url);
	const tasks = (await res.json()) as TaskType[];
	return tasks.map(task => ({ params: { id: String(task.id) } }));
};

export const getTaskData = async (id: string) => {
	const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}/`;
	const res = await fetch(url);
	const task = (await res.json()) as TaskType;
	return task;
};
