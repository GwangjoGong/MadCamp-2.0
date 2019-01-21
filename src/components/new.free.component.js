import React,{Component} from 'react';
import axios from 'axios';

import Card from '@material-ui/core/Card'


export default class newFreePost extends Component{

    constructor(props){
        super(props);

        this.onChangePostName = this.onChangePostName.bind(this);
        this.onChangePostText = this.onChangePostText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            post_name : '',
            post_text : '',
            user_name : '',
            margin_left : props.expanded ? 240:64
        };
        
    }

    componentDidMount(){
        var key = {
            id: window.sessionStorage.getItem('id')
        }

        axios.post("http://143.248.140.106:1580/user/getUser",key)
        .then(res => {
            console.log(res);
            this.setState({
                user_name:res.data.name
            },console.log(this.state.user_name))
        });
        
    }

    onChangePostName(e){
        this.setState({
            post_name : e.target.value
        })
    }

    onChangePostText(e){
        this.setState({
            post_text : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();

        var date = new Date().toDateString();

        console.log(this.state.user_name);

        var newPost = {
            postType: "Free",
            postName: this.state.post_name,
            postText: this.state.post_text,
            postCode: this.state.post_code,
            postedBy: this.state.user_name,
            privacy: 0,
            updatedOn: date
        }

        axios.post("http://143.248.140.106:1580/post/new",newPost)
        .then(res => console.log(res));

        this.setState({
            post_name:'',
            post_text:'',
            post_code:''
        })

        window.location = '/free';
    }


    render(){
        return(
            
            <div align='center' style={{marginLeft:this.state.margin_left,background:'lightgray',padding:20}}>
            <Card align="left" style={{width:1000}}>
                <h1 align="left" style={{padding:20}}>New Free Post</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-sm-12">
                        <div className="form-group" style={{padding:20}}>
                            <label style={{fontFamily:"sans-serif",fontSize:'20',fontWeight:'bold'}}>Post Name</label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.post_name}
                                    onChange={this.onChangePostName}
                                    />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group" style={{padding:20,paddingTop:0}}>
                                <label style={{fontFamily:"sans-serif",fontSize:'20',fontWeight:'bold'}}>Post Text</label>
                                <input type="text"
                                        className="form-control"
                                        value={this.state.post_text}
                                        onChange={this.onChangePostText}
                                        style={{height:500}}
                                        />

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group" style={{padding:40,paddingTop:0}}>
                            <input type="submit" value="Add Post" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </Card>
            </div>
        )
    }
}