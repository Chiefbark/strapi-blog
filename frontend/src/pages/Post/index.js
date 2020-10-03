import React, {useEffect, useState} from 'react';
import Style from 'style-it';
import {convertDate} from '../../utils';
import {Remarkable} from 'remarkable';
import POST from '../../api/posts';

import Nav from '../../components/Nav';

const md = new Remarkable();

export default function Post(props) {
	const {match} = props;
	const [post, setPost] = useState(undefined);
	const [content, setContent] = useState('');
	
	useEffect(() => {
		POST.findPost(match.params.slug).then(r => {
			setPost(r[0]);
			const contentFixed = md.render(r[0].content).replace(/<img src="(.*)"/, '<img src="http://localhost:1337\$1"');
			setContent(contentFixed);
		});
	}, [match.params.slug]);
	
	return Style.it(styles,
		<div className={'post-root'}>
			<Nav title={'Chiefbark.dev'}/>
			{post &&
			<>
				<main className={'post-container'}>
					<img className={'post-cover'} src={`http://localhost:1337${post.cover.url}`} alt={post.title}/>
					<div className={'post-header'}>
						<div>
							<h2>{post.title}</h2>
							<span>{convertDate(post.created_at)}</span>
						</div>
						<div>
							<small>Written
								by <strong>{post.created_by.username ? post.created_by.username : `${post.created_by.firstname} ${post.created_by.lastname}`}</strong></small>
							{post && post.tags && post.tags.map(e => <span key={e.name} className={'post-tag'}>{e.name}</span>)}
						</div>
					</div>
					<hr/>
					<div dangerouslySetInnerHTML={{__html: content}} className={'post-content'}/>
				</main>
			</>
			}
		</div>
	)
}

const styles = `
.post-root {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.post-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 60%;
	padding: 80px 0 32px 0;
}
.post-cover {
	max-width: 100%;
	width: 100%;
}
.post-header {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.post-header > div {
	display: flex;
	align-items: center;
}
.post-tag {
	text-transform: capitalize;
	font-size: 12pt;
	background-color: #555;
	color: #FFF;
	border-radius: 4px;
	padding: 4px 8px;
	margin: 4px;
}
.post-tag:nth-last-child(1) {
	margin-right: 0;
}
hr {
	width: 100%;
	margin: 30px 0 10px 0;
}
.post-header>div>h2, .post-header>div>small {
	flex: 1;
}
.post-content img {
	max-width: 100%;
}
@media screen and (max-width: 1024px) {
	.post-container {
		width: 75%;
	}
}
@media screen and (max-width: 512px) {
	.post-container {
		width: 95%;
	}
}
`;
