import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dotdotdot from 'react-dotdotdot';
import {Button} from 'react-bootstrap';
import AceEditor from 'react-ace';

import Free from '../image/free_board.jpg'

import 'brace/mode/java';
import 'brace/theme/github';

const Post = props => (
    <Grid item xs={3} style={{padding:30}} onClick={props.onClick}>
        <Paper style={{height:500,padding:20}} >
            <div align="left" style={{fontFamily:'sans-serif',fontSize:'15px',color:'purple'}}>
                {props.post.postedBy}         
            </div>
            <div align="left" style={{fontFamily:'sans-serif',fontSize:'30px',fontWeight:'bold',color:'black'}}>
                <Dotdotdot clamp={1}>
                    {props.post.postName}
                </Dotdotdot>
            </div>
            <div align="left" style={{fontFamily:'sans-serif',fontSize:'15px',color:'black'}} >
                {props.post.updatedOn}
            </div>
            <div align="left" >
                <Dotdotdot clamp={9}>
                    {props.post.postText}
                </Dotdotdot>
            </div>
            <Link to={{
                pathname: "/post/"+props.post._id,
            }} >더 보기</Link>
        </Paper>
    </Grid>
)

export default class UserList extends Component{

    constructor(props){
        super(props);

        this.onChangePostName = this.onChangePostName.bind(this);
        this.onChangePostText = this.onChangePostText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            posts: [],
            margin_left : props.expanded ? 240 : 64,
            visible : false,
            post_name:'',
            post_text:''
        };
    }
    componentDidMount() {
        var type = {
            postType : "Free"
        }
        axios.post('http://143.248.140.106:1580/post',type)
            .then(response => {
                this.setState({posts: response.data});
            })
            .catch(function(err){
                console.log(err);
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

        var newPost = {
            postType: "Information",
            postName: this.state.post_name,
            postText: this.state.post_text,
            postedBy: "공광조",
            privacy: 0,
            updatedOn: date
        }

        axios.post("http://143.248.140.106:1580/post/new",newPost)
        .then(res => console.log(res));

        this.setState({
            post_name:'',
            post_text:''
        })
        
        window.location.reload();
    }

    openModal() {
        this.setState({
            visible : true
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }
    
    postList(){
        return this.state.posts.map(function(currentPost, i){
            return <Post post = {currentPost} key={i} onClick = {()=>{console.log(currentPost)}}/>;
        })
    }

    onChange(newValue) {
        console.log('change',newValue);
    }

    render(){
        return(
            <div style={{marginLeft:this.state.margin_left,background:'lightgray',overflow:'hidden'}}>
                <div className="row">
                    <img alt="" src={Free} style={{flex: 1,resize:'stretch',overflow:'hidden'}}/>
                </div>
                <div align="right" style={{padding:20}}>
                    <Button bsStyle="danger" onClick={()=>{
                        window.location = '/new/free'
                        }}>글쓰기</Button>
                </div>
                    <Grid container spacing={16}>
                        {this.postList()}
                    </Grid>
            </div>
        )
    }
}