import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './App.css';
import { Board, boardPropType } from './Game/Board';
import { updateWidth, updateHeight } from '../actions/settings';
import { startIntro } from '../actions/intro';

export class AppComponent extends Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const {
            board,
            boardVisible,
            width,
            height,
            onWidthChange,
            onHeightChange,
            doingIntro,
        } = this.props;

        const handleKeyPress = (event, value, handler) => {
            if (event.key === 'ArrowUp') {
                handler(value + 1);
            }
            else if (event.key === 'ArrowDown') {
                handler(value - 1);
            }
        };

        return (
            <div id="masterWrap">
                <Board board={board} visible={boardVisible} />
                <table className={classNames({ hide: doingIntro })}>
                    <tbody>
                        <tr>
                            <td>Width:</td>
                            <td>
                                <input
                                    type="text"
                                    value={width}
                                    onChange={event => onWidthChange(event.target.value)}
                                    onKeyDown={event => handleKeyPress(event, width, onWidthChange)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Height:</td>
                            <td>
                                <input
                                    type="text"
                                    value={height}
                                    onChange={event => onHeightChange(event.target.value)}
                                    onKeyDown={event => handleKeyPress(event, height, onHeightChange)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

AppComponent.propTypes = {
    board: boardPropType.isRequired,
    boardVisible: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onWidthChange: PropTypes.func.isRequired,
    onHeightChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    doingIntro: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    doingIntro: state.doingIntro,
    board: state.board,
    boardVisible: state.boardVisible,
    width: state.width,
    height: state.height,
});

const mapDispatchToProps = dispatch => ({
    onWidthChange: width => dispatch(updateWidth(width)),
    onHeightChange: height => dispatch(updateHeight(height)),
    onLoad: () => dispatch(startIntro()),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
