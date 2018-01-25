export const updateWidth = width => {
    const parsedWidth = parseInt(width);

    return {
        type: 'UPDATE_WIDTH',
        width: (parsedWidth > 1) ? parsedWidth : 1,
    };
};

export const updateHeight = height => {
    const parsedHeight = parseInt(height);

    return {
        type: 'UPDATE_HEIGHT',
        height: (parsedHeight > 1) ? parsedHeight : 1,
    };
};
