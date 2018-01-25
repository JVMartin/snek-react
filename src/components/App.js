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

    console.log(props);

    return (
        <div id="masterWrap">
            <Board width={width} height={height} />
            <table>
                <tbody>
                    <tr>
                        <td>Width:</td>
                        <td><input type="text" value={width} onChange={onWidthChange} /></td>
                        <td>{width}</td>
                    </tr>
                    <tr>
                        <td>Height:</td>
                        <td><input type="text" value={height} onChange={onHeightChange} /></td>
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
    onWidthChange: event => dispatch(updateWidth(event.target.value)),
    onHeightChange: event => dispatch(updateHeight(event.target.value)),
});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
