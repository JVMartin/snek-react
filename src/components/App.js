import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import { Board } from './Game/Board';
import { updateWidth, updateHeight } from "../actions/app";

export const AppComponent = props => {
    const {
        width,
        height,
        onWidthChange,
        onHeightChange,
    } = props;

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
            <Board width={width} height={height} />
            <table>
                <tbody>
                    <tr>
                        <td>Width:</td>
                        <td>
                            <input type="text"
                                   value={width}
                                   onChange={event => onWidthChange(event.target.value)}
                                   onKeyDown={event => handleKeyPress(event, width, onWidthChange)} />
                        </td>
                        <td>{width}</td>
                    </tr>
                    <tr>
                        <td>Height:</td>
                        <td>
                            <input type="text"
                                   value={height}
                                   onChange={event => onHeightChange(event.target.value)}
                                   onKeyDown={event => handleKeyPress(event, height, onHeightChange)} />
                        </td>
                        <td>{height}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = state => ({
    width: state.settings.width,
    height: state.settings.height,
});

const mapDispatchToProps = dispatch => ({
    onWidthChange: width => dispatch(updateWidth(width)),
    onHeightChange: height => dispatch(updateHeight(height)),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
