import update from 'immutability-helper';
import _ from 'lodash';

const initializeBoard = (width, height, visible = true) => {
    const board = [];

    for (let y = 0; y < height; ++y) {
        const row = [];

        for (let x = 0; x < width; ++x) {
            // Borders
            if (x === 0 || x === width - 1 ||
                y === 0 || y === height - 1) {
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
    width: 20,
    height: 20,
    doingIntro: true,
};

initialState.board = initializeBoard(initialState.width, initialState.height, false);

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FINISH_INTRO':
            return {
                ...state,
                doingIntro: false,
            };
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
        default:
            return state;
    }
};
