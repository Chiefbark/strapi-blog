import React, {useState, useEffect} from 'react';
import {MdSearch} from 'react-icons/md';

import PostCard from '../../components/PostCard';
import './styles.css';

const findPosts = async (slug = '') => {
	const payload = await fetch(`http://localhost:1337/posts/${slug}`);
	return await payload.json();
}

export default () => {
	const [posts, setPosts] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [slug, setSlug] = useState(undefined);
	const [inputShown, isInputShown] = useState(false);
	
	useEffect(() => {
		findPosts().then(r => {
			setPosts(r);
			setFiltered(r);
		});
	}, []);
	
	useEffect(() => {
		const list = posts.filter(e => e.slug.includes(slug));
		setFiltered(list);
	}, [slug]);
	
	return (
		<div>
			<nav className={'home-nav'}>
				<h2>HOME PAGE</h2>
				<div>
					<input type={'search'} placeholder={'Type to search posts...'} onChange={value => setSlug(value.target.value)}
					       className={inputShown && 'shown'}/>
					<MdSearch size={32} color={inputShown && '#FFF'} onClick={() => isInputShown(true)}/>
				</div>
			</nav>
			<main className={'home-layout'}>
				{filtered && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
				{filtered && filtered.map(e => <PostCard key={e.slug} post={e}/>)}
			</main>
		</div>
	)
}
