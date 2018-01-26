import update from 'immutability-helper';
import _ from 'lodash';
import { HEIGHT, WIDTH } from '../components/Game/Board';

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
        tails: [],
    },
    width: WIDTH,
    height: HEIGHT,
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
        case 'DROP_SNEK':
            return update(state, {
                snek: {
                    c: { $set: action.c },
                    tails: { $set: [] },
                },
            });
        default:
            return state;
    }
};
