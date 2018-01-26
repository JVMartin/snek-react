export const keyPress = event => ({
    type: 'KEY_PRESS',
    key: event.key,
});

export const tick = () => ({
    type: 'TICK',
});
