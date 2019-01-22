import React, { Component } from "react";
import "./homepage.css";
import TextyAnim from 'rc-texty';
import { Grid, Layout } from 'gymnast';
import Axios from "axios";

const divStyle ={
    width: '100%',
    height: '969px',
    justifyContent: 'center',
    position:'fixed',
    top:0
}

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            margin_left: props.expanded ? 240: 64,
            first : "",
            second: "",
            third : ""
        }
    }

    componentDidMount(){
        Axios.get("http://143.248.140.106:1580/word/getOne")
            .then(res=>{
                this.setState({
                    first: res.data.first,
                    second: res.data.second,
                    third : res.data.third
                })
            }).catch(function(err){
              console.log(err);
            })
    }


    render() {
        return (
            <div align="center">
                <div>
                    <div className="newfont" style={{ fontFamily:'Playfair Display',  fontSize:100,color:'black',height:969,padding:360}}>
                         <TextyAnim className="newfont" type="alpha" style={{fontSize:60}} >
                            {this.state.first}
                         </TextyAnim>
                         <TextyAnim type="alpha" style={{fontSize:50, marginTop:10}}>
                            {this.state.second}
                         </TextyAnim>
                         <TextyAnim type="alpha" style={{fontSize:30, opacity:0.7,marginTop:30}}>
                            {this.state.third}
                         </TextyAnim>
                     </div>
                </div>
            </div>
        )
    }
}