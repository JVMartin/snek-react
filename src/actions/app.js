import _ from 'lodash';

const MIN_WIDTH = 5;
const MAX_WIDTH = 30;
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 20;

export const startIntro = () => (dispatch, getState) => {
    const state = getState();

    // Create 1d array of coordinates.
    const coords = [];
    for (let y = 0; y < state.height / 2; ++y) {
        for (let x = 0; x < state.width / 2; ++x) {
            coords.push([
                { x, y },
                { x: state.width - x - 1, y: state.height - y - 1 },
            ]);
        }
    }

    // Reduce coordinates to promises.
    const tileMarch = _.reduce(coords, (promise, cs) => {
        return promise.then(() => new Promise(resolve => {
            setTimeout(() => {
                cs.forEach(c => {
                    dispatch({
                        type: 'SHOW_TILE',
                        x: c.x,
                        y: c.y,
                    });
                });
                resolve();
            }, 1);
        }));
    }, Promise.resolve());

    return tileMarch.then(() => {
        const timeBetweenBlinks = 150;
        const numBlinks = 5;
        for (let i = 1; i < numBlinks + 1; ++i) {
            setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), i * timeBetweenBlinks);
            setTimeout(() => dispatch({ type: 'HIDE_BOARD' }), (i * timeBetweenBlinks) + (timeBetweenBlinks / 2));

            if (i === numBlinks) {
                setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), (i + 1) * timeBetweenBlinks);
            }
        }
    });

    /*
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
