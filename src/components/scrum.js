import React, {Component} from 'react';

import "./scrum.css";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';

import app from '../image/app.jpg';
import web from '../image/web.jpg';
import game from '../image/game.jpg';

import Dotdotdot from 'react-dotdotdot';

import Modal from 'react-awesome-modal';
import {Button, FormGroup, ControlLabel,FormControl, Tab, Tabs, Radio} from 'react-bootstrap';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import TextyAnim from 'rc-texty';


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


export default class Scrum extends Component {
    
    constructor(props){
        super(props);

        this.onPostNameChanged = this.onPostNameChanged.bind(this);
        this.onPostTextChanged = this.onPostTextChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.app = this.app.bind(this);
        this.web = this.web.bind(this);
        this.game = this.game.bind(this);

        this.state = {
            margin_left : props.expanded ? 240 : 64,
            posts:[],
            visible : false,
            visible2: false,
            postType : '',
            postName : '',
            postText : '',
            sendType : ''
        };
        
    }

    // setImage(scrum_type){
    //     switch(scrum_type){
    //         case "Scrum_web":
    //             this.setState({image: "src"})
    //     }
    // }

    web(){
        this.setState({
            postType : "Scrum_web"
        },() => {
            this.update("Scrum_web");
        });
    }
    app(){
        this.setState({
            postType : "Scrum_app"
        },()=>{
            this.update("Scrum_app");
        });
    }
    game(){
        this.setState({
            postType : "Scrum_game"
        },()=>{
            this.update("Scrum_game");
        });
    }
    modal2(){
        this.setState({
            visible2 : true
        });
        
    }
    
    update(type){
        var key = {
            postType : type
        }
        axios.post("http://143.248.140.106:1580/post",key)
        .then(response => {
            console.log("update");
            console.log(response.data);
            this.setState({posts: response.data.reverse()},()=>{this.render()});
        })
        .catch(function(err){
            console.log(err);
        })
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
        console.log(this.state.postType)
        if(this.state.postType==""){
            var key = {
                postSort : "Scrum"
            }
            axios.post("http://143.248.140.106:1580/post/scrum",key)
            .then(response=>{
                this.setState({posts: response.data.reverse()});
            })
            .catch(function(err){
                console.log(err);
            })
        }else{
            var key = {
                postType : this.state.postType
            }
            axios.post("http://143.248.140.106:1580/post",key)
                .then(response=>{
                    console.log(response.data);
                    this.setState({posts: response.data.reverse()});
                })
                .catch(function(err){
                    console.log(err);
                })
        }
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
        console.log("postList Props")
        console.log(this.state.posts)
        var list = this.state.posts
        console.log(list);
        return list.map(function(currentPost){
            return <Post post={currentPost}/>
        })
    }

    onSubmit(e){
        e.preventDefault();

        console.log(this.state.sendType);

        var currentDate = new Date().toDateString();
        var key = {postSort: "Scrum", postType: this.state.sendType, postName: this.state.postName, postText: this.state.postText, postedBy: this.state.user_name, privacy: 0, updatedOn: currentDate }
        
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
        console.log("render")
        console.log(this.state.posts) 
        return (
            <div style={{marginLeft:this.state.margin_left,padding:50}}>
                <TextyAnim style={{fontWeight:'bold',fontSize:50}}>
                    Scrum
                </TextyAnim>
                <div align="right" style={{fontFamily:"sans-serif",padding:20}}>
                    <Button
                        bsStyle="primary"
                        onClick={()=>{
                            this.web()
                        }}>
                        Web
                    </Button>
                    <Button
                        bsStyle="success"
                        onClick={()=>{this.app()}}>
                        App
                    </Button>
                    <Button
                        style={{borderColor:'black'}}
                        onClick={()=>{this.game()}}>
                        Game
                    </Button>

                    <Button 
                        bsStyle="danger"
                        onClick={()=>{this.modal2()}}>
                        글쓰기
                    </Button>
                </div>

                <Grid container spacing={16}>
                    {this.postList()}
                </Grid> 

                <Modal 
                    visible={this.state.visible2}
                    width="500"
                    height="500"
                    effect="fadeInUp"
                    onClickAway={()=>{this.setState({visible2:false})}}>
                    <div className="container">
                        <form onSubmit={this.onSubmit}>
                        <h1 style={{marginBottom: 20, marginTop: 10}}>New Scrum</h1>
                        <FormGroup>
                            <Radio onClick={()=>{
                                this.setState({sendType : "Scrum_web"})}} style={{marginRight:30}} name="radioGroup" inline>
                                웹
                            </Radio>{'  '}
                            <Radio onClick={()=>{this.setState({
                                sendType : "Scrum_app"
                            })}} style={{marginRight:30}} name="radioGroup" inline>
                                앱
                            </Radio>{' '}
                            <Radio onClick={()=>{this.setState({
                                sendType : "Scrum_game"
                            })}} name="radioGroup" inline>
                                게임
                            </Radio>
                        </FormGroup>
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
                                height='200px'
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


class Post extends Component {

    constructor(props){
        super(props);
        console.log("post props")
        console.log(props);
        this.state ={
            post : props.post,
            visible : false,
            user_name : props.name
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        console.log("CONSTRUCTOR")
        console.log(this.state.post);
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


    chooseText(sType){
        switch(sType){
            case "Scrum_web":
                return "웹";
            case "Scrum_app":
                return "앱";
            case "Scrum_game":
                return "게임";
            default:
                return "";
        }
    }

    getDerivedStateFromProps(props){
        console.log("getDrived")
        this.setState({
            post: props.post,
            visible : false
        })
    }

    setImage(type){
        switch(type){
            case "Scrum_web":
                return web;
            case "Scrum_app":
                return app;
            case "Scrum_game":
                return game;
        }
    }


    render(){
        console.log(this.state.post)
        setTimeout(()=>{this.setState({
            post:this.props.post
        })},100);
        return(
            <Grid item xs={3} style={{padding:20}}>
                <Card style={{height:550}}>
                <CardHeader
                    avatar={
                    <Avatar style={{background:'black',fontWeight:"bold"}} aria-label="Recipe">
                        {this.chooseText(this.state.post.postType)}
                    </Avatar>
                    }
                    title={this.state.post.postName}
                    subheader={this.state.post.updatedOn}
                />
                <CardMedia>
                    <img style={{width:400, height:250}} src={this.setImage(this.state.post.postType)}/>
                    {/* 여기도 바꿔야함!! */}

                </CardMedia>
                <CardContent>
                    <Dotdotdot className='endline'clamp={4}>
                    {this.state.post.postText}
                    </Dotdotdot>
                    <Button 
                    style={{marginTop:60}}
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
                        </Modal>
                </CardContent>
                </Card>
            </Grid>
        )
    }
}