const initializeBoard = (width, height) => {
    const board = [];

    for (let y = 0; y < height; ++y) {
        const row = [];

        for (let x = 0; x < width; ++x) {
            // Borders
            if (x === 0 || x === width - 1 ||
                y === 0 || y === height - 1) {
                row.push('X');
            }
            else {
                row.push(' ');
            }
        }

        board.push(row);
    }

    return board;
};

const initialState = {
    board: [],
    width: 20,
    height: 20,
};

initialState.board = initializeBoard(initialState.width, initialState.height);

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
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
