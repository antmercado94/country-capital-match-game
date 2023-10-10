import { useCallback, useEffect, useState } from 'react';
import type { GameData, GridItem } from './types';
import useCountries from '../../lib/useCountries';
import generateCountryEntries from '../../lib/generateCountryEntries';
import generateGridItems from '../../lib/generateGridItems';
import Button from '../Button';

export default function CountryCapitalGame() {
	const { status, data: countries, error } = useCountries();
	const [gameData, setGameData] = useState<GameData>({
		allEntries: [],
		gridItems: [],
	});
	const [selected, setSelected] = useState<GridItem[] | null>();
	const [isMatch, setIsMatch] = useState<boolean | null>(null);
	const gridSize = 16; // 8 x 8
	const isSelectSingle = selected?.length === 1; // one item selected
	const isSelectPair = selected?.length === 2; // two items selected
	const isWin = gameData.allEntries.length && !gameData.gridItems.length;

	const getEntryMatch = useCallback(
		([selectedOne, selectedTwo]: GridItem[]) =>
			gameData.allEntries.find(
				(entry) =>
					entry.includes(selectedOne.name) && entry.includes(selectedTwo.name)
			),
		[gameData.allEntries]
	);

	const removeGridItems = useCallback(
		([itemOne, itemTwo]: string[]) =>
			setGameData((data) => ({
				...data,
				gridItems: gameData.gridItems.filter(
					(item) => !item.name.includes(itemOne) && !item.name.includes(itemTwo)
				),
			})),
		[gameData.gridItems]
	);

	// setup game data
	useEffect(() => {
		if (!countries) return;

		const limit = gridSize / 2;
		const entries = generateCountryEntries(countries, limit);

		setGameData({
			allEntries: entries,
			gridItems: generateGridItems(entries.flat()),
		});
	}, [countries]);

	// match selections
	useEffect(() => {
		if (!isSelectPair) return;

		const matchingEntry = getEntryMatch(selected);

		if (!matchingEntry) {
			setIsMatch(false);
			return;
		}

		removeGridItems(matchingEntry);
		setSelected(null);
	}, [selected, getEntryMatch, removeGridItems, isSelectPair]);

	const toggleMatchColor = (id: string) => {
		const itemMatch = selected?.find((item) => item.id === id);
		if (itemMatch) return isMatch === false ? '#FF0000' : '#409Bff';
	};

	const handleClick = ({ name, id }: GridItem) => {
		if (isSelectSingle) {
			const [selectedOne] = selected;
			selectedOne.id === id
				? setSelected(null)
				: setSelected([...selected, { name, id }]); // set second selection
			return;
		}
		setSelected([{ name, id }]); // set first selection
		if (isMatch === false) setIsMatch(null);
	};

	return (
		<section className={status !== 'loading' && !isWin ? '' : 'emptyContainer'}>
			{status === 'loading' && !gameData.allEntries.length ? (
				<span>Loading...</span>
			) : status === 'error' ? (
				<span>Error: {(error as Error).message}</span>
			) : (
				<>
					{!isWin ? (
						<div className='gameGrid'>
							{gameData.gridItems.map((item) => (
								<Button
									key={item.id}
									style={{ background: toggleMatchColor(item.id) }}
									onClick={() => handleClick(item)}
								>
									{item.name}
								</Button>
							))}
						</div>
					) : (
						<div>Congratulations!</div>
					)}
				</>
			)}
		</section>
	);
}
