import React from 'react';
import {convertDate} from '../../utils';
import Style from 'style-it';
import {Link} from 'react-router-dom';


export default function PostCard(props) {
	
	const {post} = props;
	
	return Style.it(styles,
		<article data-slug={post.slug} className={'postCard-root'}>
			<div className={'postCard-header'}>
				<img className={'postCard-cover'} src={`http://localhost:1337${post.cover.formats.small.url}`} alt={post.slug}/>
				<Link className={'postCard-link-img'} to={`/post/${post.slug}`}/>
				<div className={'postCard-tags'}>
					{post.tags && post.tags.map(e => <span key={e.name} className={'postCard-tag'}>{e.name}</span>)}
				</div>
			</div>
			<div className={'postCard-container'}>
				<h2 className={'postCard-title'}>
					<Link className={'postCard-link-title'} to={`/post/${post.slug}`}>
						{post.title}
					</Link>
				</h2>
				<span className={'postCard-text'}>{convertDate(post.created_at)}</span>
				<span
					className={'postCard-text postCard-author'}>
					By {post.created_by.username ? post.created_by.username : `${post.created_by.firstname} ${post.created_by.lastname}`}
				</span>
			</div>
		</article>
	);
}

const styles = `
.postCard-root {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	width: calc(33% - 16px);
	box-shadow: 1px 1px 20px 1px #00000033;
	margin: 8px;
}
.postCard-header {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 250px;
}
.postCard-link-img {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	transition: background-color .33s ease;
}
.postCard-link-img:hover {
	background-color: #00000033;
}
.postCard-header:hover > .postCard-cover {
	max-width: 110%;
	max-height: 110%;
}
.postCard-cover {
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	max-width: 100%;
	width: 150%;
	max-height: 100%;
	height: 150%;
	object-fit: cover;
	transition: max-width .33s ease, max-height .33s ease;
}
.postCard-tags {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-end;
	position: absolute;
	top: 8px;
	width: calc(100% - 16px);
	margin: 0 8px;
	user-select: none;
	transition: opacity .25s ease;
}
.postCard-tag {
	text-transform: capitalize;
	font-size: 12pt;
	background-color: #555;
	color: #FFF;
	border-radius: 4px;
	padding: 4px 8px;
	margin: 4px;
}
.postCard-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 32px 16px 32px;
}
.postCard-link-title {
	color: #000;
	text-decoration: none;
	transition: color .33s ease;
}
.postCard-link-title:hover {
	color: #444;
}
.postCard-title {
	font-size: 14pt;
}
.postCard-text {
	font-size: 12pt;
	white-space: nowrap;
}
.postCard-author {
	color: #666;
	margin-top: 8px;
}
@media screen and (max-width: 1024px) {
	.postCard-root {
		width: calc(50% - 16px);
	}
}
@media screen and (max-width: 512px) {
	.postCard-root {
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.postCard-container {
		align-self: flex-start;
	}
`;
