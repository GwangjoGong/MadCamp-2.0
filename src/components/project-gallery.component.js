import React, {Component} from 'react';
import { Grid, Layout } from 'gymnast';
import TextyAnim from 'rc-texty';

const title = 'Best Projects';

class ProjectGallery extends Component {

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
                    <h1>
                        <TextyAnim
                        type="mask-top"
                        onEnd={(type) => {
                            console.log(type);
                        }}>
                        {title}
                        </TextyAnim>
                    </h1>
                    <div style={{paddingTop: 50}}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/7N_Sa1kvb3I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <text>2018년 겨울학기 1주차 우수 프로젝트</text>
                    <div style={{paddingTop: 30}}>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/9T8YpIk5-LE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <text>2018년 겨울학기 1주차 우수 프로젝트</text>
                </div>
            </div>
        )
    }
}

export default ProjectGallery;