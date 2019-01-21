import React, {Component} from 'react';
// import * as React from 'react'
// import {Col} from 'gymnast'
import keyboard from "../image/keyboard4.jpg";
import "./scrum.css";
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import key2 from '../image/keyboard2.jpg';

import Modal from 'react-awesome-modal';
import {Button, FormGroup, ControlLabel,FormControl} from 'react-bootstrap';
import { fadeIn } from 'react-animations'
import Radium, {StyleRoot} from 'radium';

import PerfectScrollbar from 'react-perfect-scrollbar'




const styles = {
    fadeIn:{
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 400,
      height: 400,
      overflowY: 'auto',
    },
  };



class Post extends Component {

    constructor(props){
        super(props);
        this.state={
            post:props.post,
            visible:false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal(){
        this.setState({
            visible:true
        })
    }

    closeModal(){
        this.setState({
            visible:false
        })
    }


    render(){
        return(
            <Grid item xs={3} style={{padding:20}}>
                <Card style={{height:550}}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="Recipe">
                        웹
                        {/* 여기에 props.post.postItem(웹인지 앱인지 게임인지를 받아야함) */}
                    </Avatar>
                    }
                    title={this.state.post.postName}
                    subheader={this.state.post.updatedOn}
                />
                <CardMedia>
                    <img src={key2}/>
                </CardMedia>
                <CardContent>
                    <Typography className="p_wrap" component="p" style={{lineHeight:'2.0em',height:'8.0em',overflow:'hidden'}}>
                    {this.state.post.postText}
                    </Typography>
                    <Typography component="p">
                    ...
                    </Typography>
                    <Button 
                    bsSize="sm"
                    bsStyle="warning"
                    value="open"
                    onClick={this.openModal}>
                        더보기
                    </Button>
                    <Modal
                        visible= {this.state.visible} 
                        width="500" 
                        height="500" 
                        effect="fadeInUp" 
                        onClickAway={this.closeModal}>
                        <PerfectScrollbar>
                        <div style={{padding:15}}>
                            <h1>
                                <FormGroup>
                                    <ControlLabel>{this.state.post.postName}</ControlLabel>
                                </FormGroup>
                            </h1>
                            <p>
                                <FormGroup>
                                    <ControlLabel>{this.state.post.updatedOn}</ControlLabel>
                                </FormGroup>
                            </p>
                                <article>
                                    <FormGroup style={{height:300,overflowY:'scroll'}}>
                                        
                                        <ControlLabel className="p_wrap">
                                        {this.state.post.postText}</ControlLabel>
                                        
                                    </FormGroup>
                                </article>
                            <div align='right' style={{paddingRight:20}}>
                                <Button
                                bsSize="sm" 
                                bsStyle="warning"
                                href="javascript:void(0);" onClick={this.closeModal}
                                >
                                Close
                                </Button>
                            </div>
                        </div>
                        </PerfectScrollbar>
                    </Modal>
                </CardContent>
                </Card>
            </Grid>
        )
    }


}


export default class Scrum extends Component {
    
    constructor(props){
        super(props);
        console.log('constructorrr');

        this.onPostNameChanged = this.onPostNameChanged.bind(this);
        this.onPostTextChanged = this.onPostTextChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            margin_left : props.expanded ? 240 : 64,
            posts:[],
            visible : false,
            visible2: false,
            image: key2,
            postName : '',
            postText : '',
        };
    }

    // setImage(scrum_type){
    //     switch(scrum_type){
    //         case "Scrum_web":
    //             this.setState({image: "src"})
    //     }
    // }
    
    modal2(){
        console.log(123456)
        this.setState({
            visible2 : true
        });
        
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

    componentDidMount(){
        //server Code
        var postType = {
            postType : "Scrum"
        }
        axios.post("http://143.248.140.106:1580/post",postType)
            .then(response=>{
                this.setState({posts: response.data.reverse()});
            })
            .catch(function(err){
                console.log(err);
            })
    }

    onPostNameChanged(e){
        this.setState({
            postName : e.target.value
        })
    }

    onPostTextChanged(e){
        this.setState({
            postText : e.target.value
        })
    }

    postList(){
        return this.state.posts.map(function(currentPost,i){
            console.log(currentPost)
            return <Post post={currentPost}/>
        })
    }

    onSubmit(e){
        e.preventDefault();

        var currentDate = new Date().toDateString();
        var key = {postType: "Scrum", postName: this.state.postName, postText: this.state.postText, postedBy: "이정섭", privacy: 0, updatedOn: currentDate }
        
        axios.post('http://143.248.140.106:1580/post/new', key)
            .then(res => {
                console.log(res);
            })
            .catch(function(err){
                console.log(err);
            })

        this.setState({
            visible:false,
            postName:'',
            postText:''
        })

        window.location.reload();
    }

    render() {
        return (
            <div style={{marginLeft:this.state.margin_left}}>
                <div >
                    <Grid item xs={12} className="fit" style ={{backgroundColor:'#3c2c2c'}}>
                        <img align="center" className="fit-picture" src = {keyboard}  />
                    </Grid>
                </div>
                
                <div align="right" style={{fontFamily:"sans-serif",padding:20}}>
                <Button 
                    bsStyle="danger"
                    onClick={()=>{this.modal2()}}
                    >
                    글쓰기
                </Button>
                </div>

                <Grid container spacing={16}>
                    {this.postList()}
                </Grid> 

                <Modal 
                    visible={this.state.visible2}
                    width="300"
                    height="350"
                    effect="fadeInUp"
                    onClickAway={()=>{this.setState({visible2:false})}}>
                    <div className="container">
                        <form onSubmit={this.onSubmit}>
                        <h1 style={{marginBottom: 20, marginTop: 10}}>New Scrum</h1>
                            <FormGroup 
                                controlId="user_id" 
                                bsSize="large">
                            <ControlLabel>스크럼 제목: </ControlLabel>
                            <FormControl
                                autoFocus
                                type="scrumTitle"
                                value={this.state.postName}
                                placeholder="Enter Scrum Title"
                                onChange={this.onPostNameChanged}/><FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup 
                                controlId="user_pw" 
                                bsSize="sm">
                            <ControlLabel>스크럼 내용: </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                bsSize="large"
                                autoFocus
                                type="scrumArticle"
                                value={this.state.postText}
                                placeholder="Enter Scrum Article"
                                onChange={this.onPostTextChanged}/><FormControl.Feedback/>
                            </FormGroup>
                            <div align="right">
                                <input type="submit" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
            </Modal>
                


            </div>
        );
    }
}