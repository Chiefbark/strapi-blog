import React from 'react';
import Style from 'style-it';
import {MdArrowBack, MdArrowForward} from 'react-icons/all';

export default function Pagination(props) {
	
	const {count, maxPerPage, current} = props;
	
	const nPages = Math.ceil(count / maxPerPage);
	let pages = [];
	if (current < 3)
		pages = [1, 2, 3];
	else if (current > nPages - 2)
		pages = [nPages - 2, nPages - 1, nPages];
	else {
		for (let ii = current - 1; ii <= current + 1; ii++)
			if (ii > 0) pages.push(ii);
	}
	while (nPages < pages.length)
		pages.pop();
	
	const handleClick = (event) => {
		props.onPageChanged && props.onPageChanged(parseInt(event.target.getAttribute('data-page')));
	}
	
	return Style.it(styles,
		<div className={'pagination-root'}>
			<button className={'pagination-index index-special'} disabled={current <= pages[0]} onClick={handleClick} data-page={1}>
				0
				<MdArrowBack className={'icon-special'}/>
			</button>
			{pages.map((e, index) =>
				<button key={`${e}`} className={`pagination-index ${pages[index] === current ? 'index-selected' : ''}`}
				        disabled={pages[index] === current}
				        onClick={handleClick} data-page={e}>{e}</button>)
			}
			<button className={'pagination-index index-special'} disabled={current + 1 > nPages} onClick={handleClick} data-page={nPages}>
				0
				<MdArrowForward className={'icon-special'}/>
			</button>
		</div>
	);
}

const styles = `
.pagination-root {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-self: flex-start;
	margin-top: 32px;
}
.pagination-index {
	font-weight: bold;
	cursor: pointer;
	border: none;
	outline: none;
	background-color: #FFF;
	box-shadow: 1px 1px 20px 1px #00000033;
	user-select: none;
	padding: 12px 16px;
	margin: 0 8px;
}
.pagination-index:disabled {
	box-shadow: initial;
	cursor: initial;
}
.pagination-index.index-special {
	position: relative;
	color: transparent;
}
.pagination-index:hover {
	background-color: #DDD;
}
.pagination-index:active {
	background-color: #EEE;
}
.pagination-index.index-selected {
	background-color: #007BFF;
	box-shadow: 1px 1px 20px 1px #007BFF33;
	color: #FFF;
}
.pagination-index[disabled=false] {
	transition: background-color .25s ease;
}
.pagination-index:disabled > .icon-special {
	color: #999;
}
.icon-special {
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	color: #000;
	pointer-events: none;
}
@media screen and (max-width: 1024px) {
	.pagination-root {
		justify-content: center;
	}
}
@media screen and (max-width: 512px) {
	.pagination-root {
		justify-content: center;
	}
}
`;
