import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import { Board, boardPropType } from './Game/Board';
import { startIntro } from '../actions/intro';
import { keyPress, tick } from '../actions/game';

export class AppComponent extends Component {
    componentDidMount() {
        this.props.onLoad();

        document.addEventListener('keydown', this.props.onKeypress);
        setInterval(this.props.tick, 150);
    }

    render() {
        const {
            board,
            boardVisible,
            snek,
            apple,
        } = this.props;

        return (
            <div id="masterWrap">
                <Board
                    board={board}
                    visible={boardVisible}
                    snek={snek}
                    apple={apple}
                />
            </div>
        );
    }
}

AppComponent.propTypes = {
    board: boardPropType.isRequired,
    boardVisible: PropTypes.bool.isRequired,
    snek: PropTypes.object.isRequired,
    apple: PropTypes.object.isRequired,
    onLoad: PropTypes.func.isRequired,
    onKeypress: PropTypes.func.isRequired,
    tick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    board: state.board,
    boardVisible: state.boardVisible,
    snek: state.snek,
    apple: state.apple,
    width: state.width,
    height: state.height,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(startIntro()),
    onKeypress: event => dispatch(keyPress(event)),
    tick: () => dispatch(tick()),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
