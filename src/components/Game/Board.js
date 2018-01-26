import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Tile } from './Tile';
import './Board.css';
import { coordsEqual } from '../../utils';

export const WIDTH = 20;
export const HEIGHT = 20;

export const Board = props => {
    const {
        board,
        visible,
        snek,
        apple,
    } = props;

    const rows = [];
    board.forEach((row, y) => {
        const cols = [];
        row.forEach((tile, x) => {
            const coords = { x, y };
            const isSnek = coordsEqual(snek.c, coords);
            const isApple = coordsEqual(apple.c, coords);

            let tileType = tile.type;
            if (isSnek) {
                tileType = 'S';
            }
            else if (isApple) {
                tileType = 'A';
            }
            const t = {
                ...tile,
                type: tileType,
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
    apple: PropTypes.object.isRequired,
};
