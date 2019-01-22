import React, {Component} from 'react';
import TextyAnim from 'rc-texty';
import "./homepage.css";

const keyboard2 = require('../image/keyboard4.jpg');

const divStyle ={
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundImage: `url(${keyboard2})`,
    backgroundSize: 'cover',
    justifyContent: 'center',
    position:'fixed',
    top:0,
    zIndex:2
}

export default class Homepage extends Component {

    constructor(props){
        super(props);
        this.state = {
            margin_left : props.expanded ? 240 : 64,
        };
    }

    render() {
        return (
            <div align="center">
                <div style={divStyle}>
                    <div className="newfont" style={{ fontFamily:'Playfair Display',  fontSize:100,color:'white',height:window.innerHeight,padding:(window.innerHeight/3)}}>
                         <TextyAnim className="newfont" type="alpha">
                             MADCAMP 2.0
                         </TextyAnim>
                         <TextyAnim type="alpha" style={{fontSize:50}}>
                             since 2010
                         </TextyAnim>
                         <TextyAnim type="alpha" onClick={()=>{window.location='/main'}} style={{fontSize:30,marginTop:20,color:'lightgray',opacity:0.5}}>
                            continue
                         </TextyAnim>
                     </div>
                </div>
            </div>
        );
    }
}