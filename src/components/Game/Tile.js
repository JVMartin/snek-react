import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Tile.css';

const classNameMap = {
    X: 'wall',
};

export const Tile = props => {
    const {
        tile,
    } = props;

    return (
        <div className={classNames('tile', classNameMap[tile.symbol])} />
    );
};

Tile.propTypes = {
    tile: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
    }).isRequired,
};
