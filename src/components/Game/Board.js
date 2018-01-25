import React from 'react';
import {Tile} from "./Tile";
import './Board.css';

export const Board = props => {
    const { board } = props;

    const rows = [];
    for (const [y, row] of board.entries()) {
        const cols = [];
        for (const [x, col] of row.entries()) {
            cols.push(<Tile symbol={col} key={x} />);
        }
        rows.push(<div className="row" key={y}>{cols}</div>);
    }

    return (
        <div>
            {rows}
        </div>
    );
};
