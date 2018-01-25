const MIN_WIDTH = 5;
const MAX_WIDTH = 30;
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 20;

export const updateWidth = width => {
    let newWidth = parseInt(width);

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
    let newHeight = parseInt(height);

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
