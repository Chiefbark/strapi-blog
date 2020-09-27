import React, {useState, useEffect} from 'react';
import {MdSearch} from 'react-icons/md';
import Style from 'style-it';

import PostCard from '../../components/PostCard';
import './styles.css';

const findPosts = async (slug = '') => {
	const payload = await fetch(`http://localhost:1337/posts/${slug}`);
	return await payload.json();
}

export default () => {
	const [posts, setPosts] = useState(undefined);
	const [filtered, setFiltered] = useState(undefined);
	const [slug, setSlug] = useState('');
	const [inputShown, isInputShown] = useState(false);
	
	useEffect(() => {
		findPosts().then(r => {
			setPosts(r);
		});
	}, []);
	
	useEffect(() => {
		if (posts) setFiltered(posts.filter(e => e.slug.includes(slug)));
	}, [slug, posts]);
	
	return Style.it(
		styles,
		<div className={'home-root'}>
			<nav className={'home-nav'}>
				<h2>HOME PAGE</h2>
				<div>
					<input type={'search'} placeholder={'Type to search posts...'} onChange={value => setSlug(value.target.value)}
					       className={inputShown ? 'shown' : ''}/>
					<MdSearch size={32} color={inputShown ? '#FFF' : ''} onClick={() => isInputShown(true)}/>
				</div>
			</nav>
			<main className={'home-layout'}>
				{filtered && filtered.length !== 0 && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.length !== 0 && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.length === 0 && !slug &&
				<div className={'home-container'}>
					<img className={'home-empty'} src={require('./empty_list.png')} alt={'empty'}/>
					<p className={'home-text'}>We haven't published anything yet</p>
					<p className={'home-sub-text'}>Probably the author didn't write anything...</p>
				</div>
				}
				{filtered && filtered.length === 0 && slug &&
				<div className={'home-container'}>
					<img className={'home-empty'} src={require('./empty_search.png')} alt={'empty'}/>
					<p className={'home-text'}>We couldn't find any post!</p>
					<p className={'home-sub-text'}>Try some different keywords</p>
				</div>
				}
				{!filtered &&
				<span className={'home-loader'}/>
				}
			</main>
		</div>
	)
}

const styles = `
.home-root {
	display: flex;
	justify-content: center;
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
@media screen and (max-width: 512px) {
	.home-layout {
		width: 95%;
	}
}
`;
