import update from 'immutability-helper';

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
};

initialState.board = initializeBoard(initialState.width, initialState.height, false);

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
        case 'SHOW_TILE':
            return update(state, {
                board: {
                    [action.y]: {
                        [action.x]: {
                            visible: { $set: true },
                        },
                    },
                },
            });
        case 'UPDATE_WIDTH':
            if (state.width === action.width) {
                return state;
            }
            return {
                ...state,
                board: initializeBoard(action.width, state.height),
                width: action.width,
            };
        case 'UPDATE_HEIGHT':
            if (state.height === action.height) {
                return state;
            }
            return {
                ...state,
                board: initializeBoard(state.width, action.height),
                height: action.height,
            };
        default:
            return state;
    }
};
