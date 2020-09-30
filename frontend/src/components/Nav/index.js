import React, {useState, useRef} from 'react';
import Style from 'style-it';
import {MdSearch, MdClose} from 'react-icons/md';
import {Link} from 'react-router-dom';

export default function Nav(props) {
	
	const {title, hasSearch} = props;
	
	const inputRef = useRef(null);
	const [slug, setSlug] = useState('');
	const [inputOpen, isInputOpen] = useState(false);
	
	return Style.it(
		styles,
		<nav className={'nav-root'}>
			<h1 className={`nav-title ${inputOpen && 'search-input-open'}`}><Link to={'/'}>{title}</Link></h1>
			{hasSearch &&
			<div className={'nav-search-container'}>
				<input ref={inputRef} className={`nav-search-input ${inputOpen && 'search-input-open'}`} type={'text'} value={slug}
				       onChange={event => {
					       props.onSearchChange && props.onSearchChange(event.target.value);
					       setSlug(event.target.value)
				       }}
				       placeholder={'Search for posts...'}/>
				{!inputOpen && <MdSearch className={'nav-search-icon'} size={32} onClick={() => {
					isInputOpen(true);
					inputRef.current.focus();
				}}/>}
				{inputOpen && <MdClose className={'nav-search-icon'} size={32} onClick={() => {
					isInputOpen(false);
					props.onSearchChange && props.onSearchChange('');
					setSlug('');
				}}/>}
			</div>
			}
		</nav>
	);
}

const styles = `
.nav-root {
	position: fixed;
	z-index: 100;
	width: calc(100% - 128px);
	display: flex;
	align-items: center;
	background-color: #007BFF;
	color: #FFF;
	box-shadow: 0 0 5px 1px #003876AA;
	padding: 0 64px;
	margin-bottom: 32px;
}
.nav-title {
	flex: 1;
	text-transform: uppercase;
	white-space: nowrap;
	transition: opacity .25s ease;
}
.nav-title > a {
	color: #FFF;
	text-decoration: none;
}
.nav-search-container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}
.nav-search-input {
	position: relative;
	width: 0;
	border: unset;
	border-radius: 4px;
	outline: none;
	transition: width .25s ease, padding .25s ease;
	padding: 12px 0;
	margin-right: 16px;
}
.nav-search-input.search-input-open {
	width: 250px;
	padding: 12px;
}
.nav-search-icon {
	cursor: pointer;
	color: #FFF;
	transition: color .25s ease;
}

@media screen and (max-width: 1024px) {
	.nav {
		width: calc(100% - 64px);
		padding: 0 32px;
	}
	.nav-search-input.search-input-open {
		width: 200px;
	}
}
@media screen and (max-width: 512px) {
	.nav {
		width: calc(100% - 32px);
		padding: 0 16px;
	}
	.nav-title.search-input-open {
		opacity: .5;
	}
	.nav-search-input {
		position: absolute;
		transform: translate(0, -50%);
		top: 50%;
		right: 32px;
	}
	.nav-search-input.search-input-open {
		width: calc(100vw - 112px);
	}
}
`;
