const initialState = {
    width: 20,
    height: 20,
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
