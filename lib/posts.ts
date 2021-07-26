import { PostType } from './types';

export const getAllPostsData = async () => {
	const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`;
	const res = await fetch(url);
	const posts = (await res.json()) as PostType[];
	const sortedPosts = posts.sort((a, b) =>
		new Date(b.created_at) > new Date(a.created_at) ? 1 : -1
	);
	return sortedPosts;
};

export const getAllPostIds = async () => {
	const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-post/`;
	const res = await fetch(url);
	const posts = (await res.json()) as PostType[];
	return posts.map(post => ({ params: { id: String(post.id) } }));
};

export const getPostData = async (id: string) => {
	const url = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-post/${id}/`;
	const res = await fetch(url);
	const post = (await res.json()) as PostType;
	return post;
};
