import React, {useState, useRef} from 'react';
import Style from 'style-it';
import {MdSearch, MdClose} from 'react-icons/md';

export default function Nav(props) {
	
	const {title, hasSearch} = props;
	
	const inputRef = useRef(null);
	const [slug, setSlug] = useState('');
	const [inputOpen, isInputOpen] = useState(false);
	
	return Style.it(
		styles,
		<nav className={'nav'}>
			<h1 className={'nav-title'}>{title}</h1>
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
.nav {
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
	padding: 8px 0;
	margin-right: 16px;
}
.search-input-open {
	width: 250px;
	padding: 8px 12px;
}
.nav-search-icon {
	cursor: pointer;
	color: #FFF;
	transition: color .25s ease;
}
`;
