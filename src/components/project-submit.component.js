import React, {Component} from 'react';
import { Grid, Layout } from 'gymnast';
import TextyAnim from 'rc-texty';

const title="Weekly Project Submission"
class ProjectSubmit extends Component {
    // https://goo.gl/forms/5Nsyq8R5cGqYa6rD2

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
                    <div style={{paddingTop: 20}}>
                        <a href="https://goo.gl/forms/5Nsyq8R5cGqYa6rD2">submit!</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProjectSubmit;