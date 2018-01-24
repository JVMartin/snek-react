import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Board from './Game/Board';
import { updateWidth, updateHeight } from "../actions/app";

export const AppComponent = props => {
    const {
        width,
        height,
        onWidthChange,
        onHeightChange,
    } = props;

    return (
        <div>
            <Board />
            <table>
                <tbody>
                    <tr>
                        <td>Width:</td>
                        <td><input type="text" value={width} onChange={onWidthChange} /></td>
                    </tr>
                    <tr>
                        <td>Height:</td>
                        <td><input type="text" value={height} onChange={onHeightChange} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = state => ({
    width: state.width,
    height: state.height,
});

const mapDispatchToProps = dispatch => ({
    onWidthChange: width => dispatch(updateWidth(width)),
    onHeightChange: height => dispatch(updateHeight(height)),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
