import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Layout } from '../components/Layout';
import { Task } from '../components/Task';
import { TaskForm } from '../components/TaskForm';
import { getAllTasksData } from '../lib/tasks';
import { TaskType } from '../lib/types';

const fetcher = (url: string) => fetch(url).then<TaskType[]>(res => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`;

type PropType = {
	tasks: TaskType[];
};

export default function TaskPage({ tasks }: PropType) {
	const { data: dynamicTasks, mutate } = useSWR(apiUrl, fetcher, {
		initialData: tasks
	});

	const sortedDynamicTasks = dynamicTasks?.sort((a, b) =>
		new Date(b.created_at) > new Date(a.created_at) ? 1 : -1
	);

	useEffect(() => {
		mutate(); // useSWRで取得するdataのキャッシュを最新の状態にする
	}, []);

	const update = () => {
		mutate();
	};

	return (
		<Layout title="Task page">
			<TaskForm taskCreated={update} />
			<ul>
				{sortedDynamicTasks &&
					sortedDynamicTasks.map(task => <Task key={task.id} task={task} taskDeleted={update} />)}
			</ul>

			<Link href="/main-page">
				<div className="flex cursor-pointer mt-12">
					<svg
						className="w-6 h-6 mr-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
						/>
					</svg>
					<span>Back to main page</span>
				</div>
			</Link>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const tasks = await getAllTasksData();
	return {
		props: { tasks },
		revalidate: 3
	};
};
