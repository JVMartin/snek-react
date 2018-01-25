import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import { Board, boardPropType } from './Game/Board';
import { startIntro } from '../actions/intro';
import { keyPress } from '../actions/game';

export class AppComponent extends Component {
    componentDidMount() {
        this.props.onLoad();

        document.addEventListener('keydown', this.props.onKeypress);
    }

    render() {
        const {
            board,
            boardVisible,
        } = this.props;

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
    onLoad: PropTypes.func.isRequired,
    onKeypress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    board: state.board,
    boardVisible: state.boardVisible,
    width: state.width,
    height: state.height,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(startIntro()),
    onKeypress: event => dispatch(keyPress(event)),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
