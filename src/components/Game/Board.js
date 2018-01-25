import React from 'react';
import {Tile} from "./Tile";
import './Board.css';

export const Board = props => {
    const { width, height } = props;

    const rows = [];
    for (let y = 0; y < height; ++y) {
        const cols = [];
        for (let x = 0; x < width; ++x) {
            cols.push(<Tile />);
        }
        rows.push(<div className="row">{cols}</div>);
    }

    return (
        <div>
            {rows}
        </div>
    );
};
