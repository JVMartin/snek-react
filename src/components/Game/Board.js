import React from 'react';
import {Tile} from "./Tile";
import './Board.css';

export const Board = props => {
    const { board } = props;

    const rows = [];
    for (let row of board) {
        const cols = [];
        for (let col of row) {
            cols.push(<Tile symbol={col} />);
        }
        rows.push(<div className="row">{cols}</div>);
    }

    return (
        <div>
            {rows}
        </div>
    );
};
