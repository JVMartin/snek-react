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
        snek,
    } = props;

    const rows = [];
    board.forEach((row, y) => {
        const cols = [];
        row.forEach((tile, x) => {
            const isSnek = (snek.c.x === x && snek.c.y === y);
            const t = {
                ...tile,
                type: (isSnek) ? 'S' : tile.type,
            };
            cols.push(<Tile tile={t} key={x} />);
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
    snek: PropTypes.object.isRequired,
};
