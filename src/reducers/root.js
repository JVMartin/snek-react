import update from 'immutability-helper';
import _ from 'lodash';
import { HEIGHT, WIDTH } from '../components/Game/Board';
import { coordsEqual, randomInt } from '../utils';

const initializeBoard = (visible = true) => {
    const board = [];

    for (let y = 0; y < HEIGHT; ++y) {
        const row = [];

        for (let x = 0; x < WIDTH; ++x) {
            // Borders
            if (x === 0 || x === WIDTH - 1 ||
                y === 0 || y === HEIGHT - 1) {
                row.push({
                    type: 'X',
                    visible,
                });
            }
            else {
                row.push({
                    type: ' ',
                    visible,
                });
            }
        }

        board.push(row);
    }

    return board;
};

const initialState = {
    board: [],
    boardVisible: true,
    snek: {
        c: { x: null, y: null },
        v: { x: 0, y: 0 },
        tails: [],
    },
    apple: {
        c: { x: null, y: null },
    },
    width: WIDTH,
    height: HEIGHT,
    running: false,
};

initialState.board = initializeBoard(false);

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_BOARD':
            return {
                ...state,
                boardVisible: true,
            };
        case 'HIDE_BOARD':
            return {
                ...state,
                boardVisible: false,
            };
        case 'SHOW_TILES': {
            let newBoard = state.board;
            _.forEach(action.coords, c => {
                newBoard = update(newBoard, {
                    [c.y]: {
                        [c.x]: {
                            visible: { $set: true },
                        },
                    },
                });
            });

            return {
                ...state,
                board: newBoard,
            };
        }
        case 'HIDE_TILES': {
            let newBoard = state.board;
            _.forEach(action.coords, c => {
                newBoard = update(newBoard, {
                    [c.y]: {
                        [c.x]: {
                            visible: { $set: false },
                        },
                    },
                });
            });

            return {
                ...state,
                board: newBoard,
            };
        }
        case 'DROP_SNEK':
            return update(state, {
                snek: {
                    c: { $set: action.c },
                    tails: { $set: [] },
                },
            });
        case 'KEY_PRESS':
            if (!state.running) {
                return state;
            }

            switch (action.key) {
                case 'ArrowUp':
                    return update(state, {
                        snek: {
                            v: {
                                x: { $set: 0 },
                                y: { $set: -1 },
                            },
                        },
                    });
                case 'ArrowDown':
                    return update(state, {
                        snek: {
                            v: {
                                x: { $set: 0 },
                                y: { $set: 1 },
                            },
                        },
                    });
                case 'ArrowLeft':
                    return update(state, {
                        snek: {
                            v: {
                                x: { $set: -1 },
                                y: { $set: 0 },
                            },
                        },
                    });
                case 'ArrowRight':
                    return update(state, {
                        snek: {
                            v: {
                                x: { $set: 1 },
                                y: { $set: 0 },
                            },
                        },
                    });
                default:
                    return state;
            }
        case 'RUN':
            return {
                ...state,
                running: true,
            };
        case 'TICK':
            if (!state.running) {
                return state;
            }

            let { snek } = state;
            const snekCoords = snek.c;
            const snekVelocity = snek.v;
            const snekCoordsNew = update(snekCoords, {
                x: { $set: snekCoords.x + snekVelocity.x },
                y: { $set: snekCoords.y + snekVelocity.y },
            });
            snek = update(snek, {
                c: { $set: snekCoordsNew },
            });

            const snekTile = state.board[snekCoordsNew.y][snekCoordsNew.x];

            if (snekTile.type === 'X') {
                return {
                    ...state,
                    running: false,
                };
            }


            const { apple } = state;
            let appleCoords = apple.c;
            let appleCoordsNew = appleCoords;

            if (coordsEqual(snekCoordsNew, appleCoords)) {
                appleCoords = { x: null, y: null };
                snek = update(snek, {
                    tails: {
                        $set: [
                            ...snek.tails,
                            snekCoords,
                        ],
                    },
                });
            }

            // Generate a new apple.
            if (appleCoords.x === null) {
                do {
                    appleCoordsNew = {
                        x: randomInt(2, WIDTH - 2),
                        y: randomInt(2, HEIGHT - 2),
                    };
                } while (coordsEqual(appleCoordsNew, snekCoordsNew));
            }

            return update(state, {
                snek: { $set: snek },
                apple: {
                    c: { $set: appleCoordsNew },
                },
            });
        default:
            return state;
    }
};
