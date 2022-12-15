const Graph = () => {
	/*
           y
    0 1 2 3 4 5 6 7 8
  0
  1
  2
x 3
  4
  5
  6
  7
  8

*/
	const board = new Map();

	const addVertices = (squareSize = 8) => {
		//i represents the y axis and j represents the x
		for (let i = 0; i <= squareSize; i++) {
			for (let j = 0; j <= squareSize; j++) {
				key = `${j},${i}`;
				board.set(key, '');
			}
		}
	};

	const addEdges = () => {
		board.forEach((boardItem, boardItemKey) => {
			// start by getting the keys for the current boarditem
			const splitKey = boardItemKey.split(',');
			const x = Number(splitKey[0]);
			const y = Number(splitKey[1]);

			// now list out each of the possible moves that key can make
			const possibleMoves = [
				`${x + 1},${y + 2}`,
				`${x + 1},${y - 2}`,
				`${x - 1},${y + 2}`,
				`${x - 1},${y - 2}`,
				`${x + 2},${y + 1}`,
				`${x - 2},${y + 1}`,
				`${x + 2},${y - 1}`,
				`${x - 2},${y - 1}`,
			];

			const onBoardMoves = [];

			possibleMoves.forEach((move) => {
				// check graph to see if move is onboard
				if (board.has(move)) {
					// i.e. it's a valid onboad move
					onBoardMoves.push(move);
				}
			});
			// now add the allowed moves into the map
			board.set(boardItemKey, onBoardMoves);
		});
	};

	const knightMoves = (start, end) => {
		const startToString = `${start[0]},${start[1]}`;
		const endToString = `${end[0]},${end[1]}`;

		const result = breadthFirstSearch(startToString, endToString);
		const numberofMoves = result.length - 1;

		console.log(`You made it in ${numberofMoves}! Here's your path:`);

		result.forEach((result) => {
			console.log(`[${result}]`);
		});
	};

	const breadthFirstSearch = (root, end) => {
		const queue = [{ node: root, path: [] }];
		const visited = new Set();

		const traverse = () => {
			if (queue.length === 0) return;
			const { node, path } = queue.shift();
			if (node === end) return path.concat(node);

			visited.add(node);
			const children = board.get(node);

			for (const child of children) {
				queue.push({ node: child, path: path.concat(node) });
			}

			return traverse();
		};

		return traverse();
	};

	addVertices();
	addEdges();

	return {
		knightMoves,
	};
};

// driver code
const myGraph = Graph();
myGraph.knightMoves([0, 0], [8, 8]);
