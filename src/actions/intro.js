import _ from 'lodash';

export const startIntro = () => (dispatch, getState) => {
    const state = getState();

    // Create 1d array of coordinates.
    const coords = [];
    for (let y = 0; y < state.height / 2; ++y) {
        for (let x = 0; x < state.width / 2; ++x) {
            coords.push([
                {
                    x,
                    y,
                },
                {
                    x: state.width - x - 1,
                    y: state.height - y - 1,
                },
                {
                    x,
                    y: state.height - y - 1,
                },
                {
                    x: state.width - x - 1,
                    y,
                },
            ]);
        }
    }

    // Reduce coordinates to promises.
    const tileMarch = _.reduce(coords, (promise, cs) => (
        promise.then(() => new Promise(resolve => {
            setTimeout(() => {
                dispatch({
                    type: 'SHOW_TILES',
                    coords: cs,
                });
                resolve();
            }, 1);
        }))
    ), Promise.resolve());

    return tileMarch.then(() => new Promise(resolve => {
        const timeBetweenBlinks = 250;
        const numBlinks = 3;
        for (let i = 0; i < numBlinks; ++i) {
            setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), i * timeBetweenBlinks);
            setTimeout(() => dispatch({ type: 'HIDE_BOARD' }), (i * timeBetweenBlinks) + (timeBetweenBlinks / 2));

            if (i === numBlinks - 1) {
                setTimeout(() => {
                    dispatch({ type: 'SHOW_BOARD' });
                    dispatch({ type: 'FINISH_INTRO' });
                    resolve();
                }, (i + 1) * timeBetweenBlinks);
            }
        }
    }));
};