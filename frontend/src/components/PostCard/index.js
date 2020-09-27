import React from 'react';
import moment from 'moment';

import './styles.css';
import {Link} from 'react-router-dom';

const convertDate = (iso_date) => {
	const date = moment(iso_date);
	
	return date.format('MMMM Do YYYY');
}

export default function PostCard(props) {
	
	const {post} = props;
	
	return (
		<article data-slug={post.slug} className={'postCard'}>
			<img src={`http://localhost:1337${post.thumbnail.url}`} alt={post.slug}/>
			<div>
				<h2>{post.title}</h2>
				<span>{convertDate(post.created_at)}</span>
				<span>{post.author.username}</span>
			</div>
			<Link to={`/post/${post.slug}`}/>
		</article>
	);
}
