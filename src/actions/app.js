const MIN_WIDTH = 5;
const MAX_WIDTH = 30;
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 20;

export const startIntro = () => (dispatch, getState) => {
    const state = getState();

    const w = state.width;
    const h = state.height;

    dispatch({ type: 'SHOW_TILE', x: 0, y: 0 });
    /*
    const timeBetweenBlinks = 150;
    const numBlinks = 3;
    for (let i = 1; i < numBlinks + 1; ++i) {
        setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), i * timeBetweenBlinks);
        setTimeout(() => dispatch({ type: 'HIDE_BOARD' }), (i * timeBetweenBlinks) + (timeBetweenBlinks / 2));

        if (i === numBlinks) {
            setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), (i + 1) * timeBetweenBlinks);
        }
    }
    */
};

export const updateWidth = width => {
    let newWidth = parseInt(width, 10);

    if (newWidth < MIN_WIDTH) {
        newWidth = MIN_WIDTH;
    }
    else if (newWidth > MAX_WIDTH) {
        newWidth = MAX_WIDTH;
    }

    return {
        type: 'UPDATE_WIDTH',
        width: newWidth,
    };
};

export const updateHeight = height => {
    let newHeight = parseInt(height, 10);

    if (newHeight < MIN_HEIGHT) {
        newHeight = MIN_HEIGHT;
    }
    else if (newHeight > MAX_HEIGHT) {
        newHeight = MAX_HEIGHT;
    }

    return {
        type: 'UPDATE_HEIGHT',
        height: newHeight,
    };
};
