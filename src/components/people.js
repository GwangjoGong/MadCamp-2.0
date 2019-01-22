import React, {Component} from 'react';
import gj from '../image/gj.png'
import js from '../image/js2.png'
import jh from '../image/jh.png'
import "./homepage.css";
import TextyAnim from 'rc-texty';



export default class People extends Component {
    constructor(props){
        super(props);

        this.state = {
            margin_left : props.expanded ? 240 : 64,
        };
    }

    render() {
        return (
            <div>
                <TextyAnim className="newfont" style={{fontSize:50, marginLeft:this.state.margin_left, padding:80, paddingBottom:0}}>
                    Developers
                </TextyAnim>
                <div style={{marginLeft:this.state.margin_left, marginTop: 100}} className="row">
                
                    <div className="col-sm-4" align='center'>
                        <img alt="" src={js} style={{flex: 1,resize:'stretch',overflow:'hidden', width:"500px"}}/>
                        <div className="korfont" style={{marginTop:20, fontSize:25, opacity:0.7}}>
                        <div className="korfont" style={{marginTop:20, fontSize:28, fontWeight:'bold'}}>
                            이정섭
                        </div>
                            존잘의 Programming<br/>어우롸잇!
                        </div>
                    </div>
                    <div className="col-sm-4" align='center'>
                        <img alt="" src={gj} style={{flex: 1,resize:'stretch',overflow:'hidden',width:"500px"}}/>
                        <div className="korfont" style={{marginTop:20, fontSize:25, opacity:0.7}}>
                            <div className="korfont" style={{marginTop:20, fontSize:28, fontWeight:'bold'}}>
                                공광조
                            </div>
                                숨겨진 천재 개발자<br/>촤하하하하하하하핳
                        </div>
                    </div>
                    <div className="col-sm-4" align='center'>
                        <img alt="" src={jh} style={{flex: 1,resize:'stretch',overflow:'hidden',width:"500px"}}/>
                        <div className="korfont" style={{marginTop:20, fontSize:25, opacity:0.7}}>
                            <div className="korfont" style={{marginTop:20, fontSize:28, fontWeight:'bold'}}>
                                김지후
                            </div>
                                존예로운 Artist<br/>우리 퇴근 언제해?
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}