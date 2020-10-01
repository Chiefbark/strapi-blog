import moment from 'moment';

export const joinParams = (params) => {
	const entries = Object.entries(params);
	let query = '?';
	for (let entry of entries) query += `${entry[0]}=${entry[1]}&`;
	return query;
}

export const convertDate = (iso_date) => {
	const date = moment(iso_date);
	return date.format('MMMM D, YYYY');
}

export const Constants = {
	API_URL: 'localhost:1337',
	END_POINT_POST: 'posts',
	END_POINT_COUNT: 'count',
	MAX_LIMIT: 6,
	QUERY_CONTAINS: '_contains',
	QUERY_START: '_start',
	QUERY_LIMIT: '_limit',
	QUERY_SORT: '_sort'
}
