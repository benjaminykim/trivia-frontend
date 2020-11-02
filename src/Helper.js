// Helper Functions Go Here

export function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

export function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

export function insert(array, index, item) {
	array.splice(index, 0, item);
	return array.join();
}