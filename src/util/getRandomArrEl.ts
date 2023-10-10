export default function getRandomArrEl<T>(arr: T[]) {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr.splice(randomIndex, 1)[0];
}
