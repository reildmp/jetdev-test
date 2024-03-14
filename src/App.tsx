import React, { useState, useEffect } from 'react';
import { listAPI } from './api';
import data from './json/data.json';
import CardScore from './components/CardScore';
import Card from './models/Card';

function App() {
	const [isFetchData, setIsFetchData] = useState(true);
	const [listScore, setListScore] = useState<Card[]>();

	function compareByScore(a: Card, b: Card) {
		return b.score - a.score;
	}

	function randomScoreGenerate(max: number) {
		const result = Math.floor(Math.random() * (max - 0 + 1)) + 0;
		return result;
	}

	async function fetchMyAPI() {
		let response = await listAPI.fetchList();
		setListScore(response);
		setIsFetchData(false);
	}

	async function checkPosition(data: Card[]) {
		if (listScore !== undefined) {
			data.map((item, index) => {
				if (item.userID !== listScore[index].userID) {
					// add class move to all
					listScore.map((items) => {
						const position = document.getElementById(items.userID);
						position!.style!.top = `${position?.offsetTop}px`;
					});
					listScore.map((items) => {
						const position = document.getElementById(items.userID);
						position?.classList.add('move');
					});
					const newPosition = document.getElementById(item.userID);
					const oldPosition = document.getElementById(
						listScore[index].userID,
					);
					newPosition?.classList.add('top');
					oldPosition?.classList.add('behind');
					const intervalPosition = setInterval(async () => {
						newPosition!.style!.top = `${oldPosition?.offsetTop}px`;
						oldPosition!.style!.top = `${newPosition?.offsetTop}px`;
						clearInterval(intervalPosition);
					}, 1000);
					const interval = setInterval(async () => {
						listScore.map((items) => {
							const position = document.getElementById(
								items.userID,
							);
							position?.classList.remove('move');
						});
						clearInterval(interval);
					}, 1500);
				}
			});
		}
	}

	useEffect(() => {
		if (isFetchData) {
			fetchMyAPI();
		}
	}, []);

	useEffect(() => {
		if (listScore !== undefined) {
			let interval = setInterval(async () => {
				const index = randomScoreGenerate(listScore?.length - 1);
				const result = [...listScore];
				result[index].score += randomScoreGenerate(10000);
				result.sort(compareByScore);
				await checkPosition(result);
				setListScore(result);
				clearInterval(interval);
			}, 1500);
		}
	}, [listScore]);

	return (
		<div className='app'>
			{!isFetchData && (
				<div className='card'>
					{listScore?.map((item: Card, index: number) => (
						<CardScore
							data={item}
							index={index + 1}
							key={item.userID}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
