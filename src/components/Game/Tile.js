import React from 'react';
import classNames from 'classnames';

import './Tile.css';

const classNameMap = {
    'X': 'wall',
};

export const Tile = props => {
    const {
        symbol,
    } = props;

    return (
        <div className={classNames('tile', classNameMap[symbol])}>
        </div>
    );
};
