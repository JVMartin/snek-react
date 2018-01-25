import React from 'react';
import PropTypes from 'prop-types';

import { Tile } from './Tile';
import './Board.css';

export const Board = props => {
    const { board } = props;

    const rows = [];
    board.forEach((row, y) => {
        const cols = [];
        row.forEach((col, x) => {
            cols.push(<Tile symbol={col} key={x} />);
        });
        rows.push(<div className="row" key={y}>{cols}</div>);
    });

    return (
        <div>
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
};
