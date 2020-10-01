import React, {useState, useEffect} from 'react';
import Style from 'style-it';

import POST from '../../api/posts';

import PostCard from '../../components/PostCard';
import Nav from '../../components/Nav';
import {Constants} from '../../utils';
import Pagination from '../../components/Pagination';

export default () => {
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);
	const [posts, setPosts] = useState(undefined);
	const [slug, setSlug] = useState('');
	
	useEffect(() => {
		POST.findPosts().then(r => setPosts(r));
	}, []);
	
	useEffect(() => {
		POST.findPostLike(slug, (page - 1) * Constants.MAX_LIMIT).then(r => setPosts(r));
	}, [page]);
	
	useEffect(() => {
		if (page === 1)
			POST.findPostLike(slug, (page - 1) * Constants.MAX_LIMIT).then(r => setPosts(r));
		else
			POST.findPostLike(slug, (page - 1) * Constants.MAX_LIMIT).then(r => setPosts([...posts, ...r]));
		const params = {};
		params[`slug${Constants.QUERY_CONTAINS}`] = slug;
		POST.findPostCount(params).then(r => setCount(r));
	}, [slug]);
	
	return Style.it(styles,
		<div className={'home-root'}>
			<Nav title={'Chiefbark.dev'} hasSearch={true} onSearchChange={value => setSlug(value)}/>
			<main className={'home-layout'}>
				{posts && posts.length !== 0 && posts.map((e, index) => {
					if (index < Constants.MAX_LIMIT)
						return <PostCard key={e.slug} post={e}/>
				})}
				{posts && posts.length === 0 && !slug &&
				<div className={'home-container'}>
					<img className={'home-empty'} src={require('./empty_list.png')} alt={'empty'}/>
					<p className={'home-text'}>We haven't published anything yet</p>
					<p className={'home-sub-text'}>Probably the author didn't write anything...</p>
				</div>
				}
				{posts && posts.length === 0 && slug &&
				<div className={'home-container'}>
					<img className={'home-empty'} src={require('./empty_search.png')} alt={'empty'}/>
					<p className={'home-text'}>We couldn't find any post!</p>
					<p className={'home-sub-text'}>Try some different keywords</p>
				</div>
				}
				{!posts &&
				<span className={'home-loader'}/>
				}
				{posts && posts.length !== 0 &&
				<Pagination current={page} count={count} maxPerPage={Constants.MAX_LIMIT} onPageChanged={e => setPage(e)}/>
				}
			</main>
		</div>
	)
}

const styles = `
.home-root {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.home-layout {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	width: 90%;
	flex-wrap: wrap;
	padding: 100px 0 32px 0;
}
.home-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-self: center;
	align-items: center;
	justify-content: center;
}
.home-empty {
	width: 33%;
}
.home-text, .home-sub-text {
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 16pt;
	color: #666;
}
.home-sub-text {
	text-transform: unset;
	font-weight: normal;
	font-size: 12pt;
	margin: 0 0 8px 0;
}
.home-load-more {
	border: none;
	color: #000;
	font-size: 12pt;
	cursor: pointer;
	outline: unset;
	padding: 16px 32px;
	margin-bottom: 32px;
	transition: background-color .25s ease;
}
.home-load-more:hover {
	background-color: #DDD;
}
.home-load-more:active {
	background-color: #EEE;
}
@media screen and (max-width: 512px) {
	.home-layout {
		width: 95%;
	}
}
`;
