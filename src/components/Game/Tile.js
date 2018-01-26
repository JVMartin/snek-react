import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Tile.css';

const classNameMap = {
    X: 'wall',
    S: 'snek',
    A: 'apple',
    T: 'tail',
};

export const Tile = props => {
    const {
        tile,
    } = props;

    const className = classNames('tile', classNameMap[tile.type], {
        hide: !tile.visible,
    });

    return (
        <div className={className} />
    );
};

Tile.propTypes = {
    tile: PropTypes.shape({
        type: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
    }).isRequired,
};
