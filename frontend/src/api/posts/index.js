import path from 'path';
import {Constants, joinParams} from '../../utils';

const findPosts = async (start = 0) => {
	const params = {};
	params[Constants.QUERY_START] = start;
	params[Constants.QUERY_LIMIT] = Constants.MAX_LIMIT;
	params[Constants.QUERY_SORT] = 'created_at:DESC';
	
	const url = 'http://' + path.join(Constants.API_URL, Constants.END_POINT_POST) + joinParams(params);
	const res = await fetch(url);
	return await res.json();
}

const findPostLike = async (slug, start = 0) => {
	const params = {};
	params[Constants.QUERY_START] = start;
	params[Constants.QUERY_LIMIT] = Constants.MAX_LIMIT;
	params[`slug${Constants.QUERY_CONTAINS}`] = slug;
	params[Constants.QUERY_SORT] = 'created_at:DESC';
	
	const url = 'http://' + path.join(Constants.API_URL, Constants.END_POINT_POST) + joinParams(params);
	const res = await fetch(url);
	return await res.json();
}

const findPost = async (slug) => {
	const url = 'http://' + path.join(Constants.API_URL, Constants.END_POINT_POST, slug);
	const res = await fetch(url);
	return await res.json();
}

const findPostCount = async (params = {}) => {
	const url = 'http://' + path.join(Constants.API_URL, Constants.END_POINT_POST, Constants.END_POINT_COUNT) + joinParams(params);
	console.log(url);
	const res = await fetch(url);
	return await res.json();
}

export default {findPosts, findPostLike, findPost, findPostCount};
