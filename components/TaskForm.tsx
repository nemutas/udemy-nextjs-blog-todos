import { useRecoilState, useResetRecoilState } from 'recoil';
import Cookie from 'universal-cookie';
import { selectedTaskState } from '../lib/store';

const cookie = new Cookie();

const taskApiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/`;

type PropsType = {
	taskCreated: () => void;
};

export function TaskForm({ taskCreated }: PropsType) {
	const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
	const resetSelectedTask = useResetRecoilState(selectedTaskState);

	const create = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await fetch(taskApiUrl, {
			method: 'POST',
			body: JSON.stringify({ title: selectedTask.title }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${cookie.get('access_token')}`
			}
		});
		switch (res.status) {
			case 401:
				alert('JWT Token not valid');
		}
		resetSelectedTask();
		taskCreated();
	};

	const update = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await fetch(taskApiUrl + selectedTask.id + '/', {
			method: 'PUT',
			body: JSON.stringify({ title: selectedTask.title }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `JWT ${cookie.get('access_token')}`
			}
		});
		switch (res.status) {
			case 401:
				alert('JWT Token not valid');
		}
		resetSelectedTask();
		taskCreated();
	};

	return (
		<div>
			<form onSubmit={selectedTask.id !== 0 ? update : create}>
				<input
					className="text-black mb-8 px-2 py-1"
					type="text"
					value={selectedTask.title}
					onChange={e => setSelectedTask({ ...selectedTask, title: e.target.value })}
				/>
				<button
					type="submit"
					className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase">
					{selectedTask.id !== 0 ? 'update' : 'create'}
				</button>
			</form>
		</div>
	);
}
