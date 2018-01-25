import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import { Board, boardPropType } from './Game/Board';
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
            </div>
        );
    }
}

AppComponent.propTypes = {
    board: boardPropType.isRequired,
    boardVisible: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onLoad: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    doingIntro: state.doingIntro,
    board: state.board,
    boardVisible: state.boardVisible,
    width: state.width,
    height: state.height,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(startIntro()),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
