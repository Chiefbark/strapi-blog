const API_URL = 'http://localhost:1337/';

/**
 * If `post_id` provided, returns that specific post, otherwise, returns all post available
 * @param post_id Id of the post. Default `''`
 * @return {Promise<void>}
 */
const findPosts = async (post_id = '') => {
	const payload = await fetch(API_URL + `posts/${post_id}`);
	const res = await payload.json();
	
	console.log(res);
}

const API = {findPosts}
export default API;
