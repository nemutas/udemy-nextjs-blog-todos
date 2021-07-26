import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Layout } from '../../components/Layout';
import { getAllTaskIds, getTaskData } from '../../lib/tasks';
import { TaskType } from '../../lib/types';

const fetcher = (url: string) => fetch(url).then<TaskType>(res => res.json());

type PropsType = {
	task: TaskType;
	id: number;
};

export default function Task({ task, id }: PropsType) {
	const router = useRouter();

	const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}`;
	const { data: dynamicTask, mutate } = useSWR(apiUrl, fetcher, {
		initialData: task
	});

	useEffect(() => {
		mutate(); // useSWRで取得するdataのキャッシュを最新の状態にする
	}, []);

	if (router.isFallback || !dynamicTask) return <div>Loading...</div>;

	return (
		<Layout title={dynamicTask.title}>
			<span className="mb-4">
				{'ID : '}
				{dynamicTask.id}
			</span>
			<p className="mb-4 text-xl font-bold">{dynamicTask.title}</p>
			<p className="mb-12">{dynamicTask.created_at}</p>

			<Link href="/task-page">
				<div className="flex cursor-pointer mt-8">
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
					<span>Back to task-page</span>
				</div>
			</Link>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getAllTaskIds();
	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const task = await getTaskData(params!.id as string);
	return {
		props: { id: task.id, task },
		revalidate: 3 // interval time (s) -> 3s
	};
};
