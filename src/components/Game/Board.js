import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Tile } from './Tile';
import './Board.css';

export const WIDTH = 20;
export const HEIGHT = 20;

export const Board = props => {
    const {
        board,
        visible,
    } = props;

    const rows = [];
    board.forEach((row, y) => {
        const cols = [];
        row.forEach((tile, x) => {
            cols.push(<Tile tile={tile} key={x} />);
        });
        rows.push(<div className="row" key={y}>{cols}</div>);
    });

    return (
        <div id="board" className={classNames({ hide: !visible })}>
            {rows}
        </div>
    );
};

export const boardPropType = PropTypes.arrayOf(
    PropTypes.arrayOf(
        PropTypes.string,
    ),
);

Board.propTypes = {
    board: boardPropType.isRequired,
    visible: PropTypes.bool.isRequired,
};
