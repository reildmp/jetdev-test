import React from 'react';
import Card from '../models/Card';

type Props = {
	data: Card;
	index: number;
};

export const CardScore = (props: Props) => {
	const data = props.data;
	const position = props.index - 1;
	return (
		<div
			className='card__container'
			style={({ top: 74 * position })}
			id={data.userID}
		>
			<div className='card__container-profile'>
				<img
					className='card__container-profile-image'
					src={require('../assets/user.png')}
					alt='User'
				/>
				<div
					className={`card__container-profile-order + 
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
			</div>
			<div className='card__container-name'>{data.displayName}</div>
			<div className='card__container-score'>
				{data.score}{' '}
				<span className='card__container-score-title'>points</span>
			</div>
		</div>
	);
};

export default CardScore;
