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

Board.propTypes = {
    board: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.string,
        ),
    ).isRequired,
};
