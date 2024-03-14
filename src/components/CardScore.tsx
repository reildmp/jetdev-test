import React from 'react';
import Card from '../models/Card';

type Props = {
	data: Card;
	index: number;
};

export const CardScore = (props: Props) => {
	const data = props.data;
	return (
		<div className='card__container' id={data.userID}>
			<div
				className={`card__container-order + 
					${
						props.index === 1
							? 'first'
							: props.index === 2
							? 'second'
							: props.index === 3
							? 'third'
							: ''
					}
				`}
			>
				{props.index}
			</div>
			<div>{data.picture}</div>
			<div>{data.displayName}</div>
			<div className='card__container-score'>{data.score} pts</div>
		</div>
	);
};

export default CardScore;
