import Link from 'next/link';
import { PostType } from '../lib/types';

type PropsType = {
	post: PostType;
};

export function Post({ post }: PropsType) {
	return (
		<div>
			<span>{post.id}</span>
			{' : '}
			<Link href={`/posts/${post.id}`}>
				<span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
					{post.title}
				</span>
			</Link>
		</div>
	);
}
