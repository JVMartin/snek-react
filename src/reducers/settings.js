const initialState = {
    width: 10,
    height: 10,
};

export const settings = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_WIDTH':
            return {
                ...state,
                width: action.width,
            };
        case 'UPDATE_HEIGHT':
            return {
                ...state,
                height: action.height,
            };
        default:
            return state;
    }
};
