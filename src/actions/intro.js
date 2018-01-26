import _ from 'lodash';
import { randomInt } from '../utils';
import { HEIGHT, WIDTH } from '../components/Game/Board';

export const startIntro = () => dispatch => {
    const coordsSets = [];
    for (let y = 0; y < HEIGHT / 2; ++y) {
        for (let x = 0; x < WIDTH / 2; ++x) {
            coordsSets.push([
                {
                    x,
                    y,
                },
                {
                    x: WIDTH - x - 1,
                    y: HEIGHT - y - 1,
                },
                {
                    x,
                    y: HEIGHT - y - 1,
                },
                {
                    x: WIDTH - x - 1,
                    y,
                },
            ]);
        }
    }

    const tileMarch = _.reduce(coordsSets, (promise, coords) => (
        promise.then(() => new Promise(resolve => {
            setTimeout(() => {
                dispatch({
                    type: 'SHOW_TILES',
                    coords,
                });
                resolve();
            }, 1);
        }))
    ), Promise.resolve());

    return tileMarch.then(() => new Promise(resolve => {
        const timeBetweenBlinks = 125;
        setTimeout(() => dispatch({ type: 'HIDE_BOARD' }), timeBetweenBlinks);
        setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), timeBetweenBlinks * 2);
        setTimeout(() => dispatch({ type: 'HIDE_BOARD' }), timeBetweenBlinks * 3);
        setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), timeBetweenBlinks * 4);
        setTimeout(() => dispatch({ type: 'HIDE_BOARD' }), timeBetweenBlinks * 5);
        setTimeout(() => dispatch({ type: 'SHOW_BOARD' }), timeBetweenBlinks * 6);

        const snekCoords = {
            x: randomInt(1, WIDTH - 2),
            y: randomInt(1, HEIGHT - 2),
        };

        setTimeout(() => dispatch({ type: 'DROP_SNEK', c: snekCoords }), timeBetweenBlinks * 7);
        setTimeout(() => dispatch({ type: 'HIDE_TILES', coords: [snekCoords] }), timeBetweenBlinks * 8);
        setTimeout(() => dispatch({ type: 'SHOW_TILES', coords: [snekCoords] }), timeBetweenBlinks * 9);
        setTimeout(() => dispatch({ type: 'HIDE_TILES', coords: [snekCoords] }), timeBetweenBlinks * 10);
        setTimeout(() => {
            dispatch({ type: 'SHOW_TILES', coords: [snekCoords] });
            dispatch({ type: 'RUN' });
            resolve();
        }, timeBetweenBlinks * 11);
    }));
};
