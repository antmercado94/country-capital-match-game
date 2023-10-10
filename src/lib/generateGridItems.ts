import type { GridItem } from '../components/game/types';
import generateId from '../util/generateId';
import getRandomArrEl from '../util/getRandomArrEl';

export default function generateGridItems(arr: string[]) {
	const randomizedItems: GridItem[] = [];

	while (arr.length) {
		randomizedItems.push({ name: getRandomArrEl(arr), id: generateId() });
	}

	return randomizedItems;
}
