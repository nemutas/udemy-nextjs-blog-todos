import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';
import { getAllPostsData } from '../lib/posts';
import { PostType } from '../lib/types';

type PropsType = {
	posts: PostType[];
};

export default function BlogPage({ posts }: PropsType) {
	return (
		<Layout title="Blog page">
			<ul>{posts && posts.map(post => <Post key={post.id} post={post} />)}</ul>

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
	const posts = await getAllPostsData();
	return {
		props: { posts },
		revalidate: 3 // interval time (s) -> 3s
	};
};
