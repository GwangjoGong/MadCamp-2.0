import React, { Component } from "react";
import { Grid, Layout } from 'gymnast';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            margin_left: props.expanded ? 240: 64
        }
    }


    render() {
        return (
            <div style={{marginLeft:this.state.margin_left+20,marginTop: 20}}>
                <div align="left" style={{paddingLeft: 300}}>
                    <h1>Main Page</h1>
                </div>
            </div>
        )
    }
}