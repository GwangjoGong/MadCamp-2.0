import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Button, ButtonToolbar, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import CreateUser from './components/create-user.component';
import ProjectSubmit from './components/project-submit.component';
import Notice from './components/notice-board.component'
import styled from 'styled-components';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import Homepage from './components/homepage';
import FreeBoard from './components/board.free.component';
import InformationBoard from './components/board.information.component';
import NewFreePost from './components/new.free.component';
import NewInformationPost from './components/new.information.component';
import Post from './components/post.component';
import Scrum from './components/scrum';

import { Icon } from 'gestalt';
import ProjectGallery from './components/project-gallery.component';
import MainPage from './components/main.component';
import { readdir } from 'fs';
import newFreePost from './components/new.free.component';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

class App extends Component {


  state = {
    selected: 'home',
    expanded: false,
    visible: false, //login modal
    visible2: false, //logout modal
    loggedIn: false,
    user_id: "",
    user_pw: "",
    user_name :""
  };

  // saveLogin = () => {
  //   const id = this.state.user_id;
    
  // }

  onSelect = (selected) => {
    this.setState({selected: selected});
  }

  onToggle = (expanded) => {
    this.setState({expanded: expanded});
  }

  pageTitle = {
    'home': ['MADCAMP 2.0'],
    'main': ['MADCAMP 2.0', '소개'],

    'noticeMain': ['PROJECT'],
    'submit': ['COMMUNITY', '프로젝트 제출'],
    'gallery': ['NOTICE', '우수 프로젝트'],

    'community': ['COMMUNITY'],
    'scrum': ['COMMUNITY', '스크럼 게시판'],
    'information': ['COMMUNITY', '질문/정보 게시판'],
    'free': ['COMMUNITY', '자유 게시판'],

    'noticeMain': ['NOTICE'],
    'notice': ['NOTICE', '공지사항'],
    'photo': ['PHOTO', '앨범']
  }

  navigate = (pathname) => () => {
    this.setState({ selected: pathname });
  };

  handleChange = event => {
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  loginRequest() {
    var key = { id: this.state.user_id, pw: this.state.user_pw }
    axios.post('http://143.248.140.106:1580/user/login', key)
      .then(res => {
        console.log(res.data.success)
        if(res.data.success === "0") {
          this.setState({
            loggedIn: true, 
            visible: false,
          })
          window.sessionStorage.setItem('id', key.id );
        }
      }).catch(function(err){
        console.log(err);
    })
  }

  componentDidMount() {
    const id = window.sessionStorage.getItem('id');
    if(id) this.setState({loggedIn: true, user_id: id});
  }

  render() {
    var expanded = false;
    var to;
    return (
      <Router>
        <Route render={({location, history}) => (
          <div>
            <div
              style={{
                marginLeft: expanded ? 240 : 64,
              }}>
            </div>
            <SideNav
              style={{position:'fixed',zIndex:1}}
              onSelect = {(selected) => {
                to = '/'+selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
              onToggle = {() =>{
                if (expanded === false) {
                  expanded = true;
                } else {
                  expanded = false;
                } history.push(to);
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav>
                <Button
                  bsSize="small" 
                  bsStyle="warning"
                  style={{ marginBottom: 10}}
                  onClick={()=>{this.state.loggedIn? this.setState({visible2:true}) : this.setState({visible:true})}} block>{this.state.loggedIn? 'Logout': 'Login'}</Button>
                <NavItem eventKey="home">
                  <NavIcon>
                    <Icon icon="send" color="darkgrey" size="24"/> 
                  </NavIcon>
                  <NavText style={{ paddingLeft: 20 }}>MADCAMP 2.0</NavText>
                  <NavItem eventKey="main">
                    <NavText style={{paddingLeft: 60}}>소개</NavText>
                  </NavItem>
                  <NavItem eventKey="notice">
                    <NavText style={{paddingLeft: 60}}>공지사항</NavText>
                  </NavItem>
                </NavItem>
                <NavItem eventKey="project">
                  <NavIcon>
                    <Icon icon="flag" color="darkgrey" size="24"/> 
                  </NavIcon>
                  <NavText style={{ paddingLeft: 20 }}>PROJECT</NavText>
                  <NavItem eventKey="submit">
                    <NavText style={{paddingLeft: 60}}>프로젝트 제출</NavText>
                  </NavItem>
                  <NavItem eventKey="gallery">
                    <NavText style={{paddingLeft: 60}}>우수 프로젝트</NavText>
                  </NavItem>
                </NavItem>
                <NavItem eventKey="conmmunity">
                  <NavIcon>
                    <Icon icon="speech" color="darkgrey" size="24"/> 
                  </NavIcon>
                  <NavText style={{ paddingLeft: 20 }}>COMMUNITY</NavText>
                  <NavItem eventKey="scrum">
                    <NavText style={{paddingLeft: 60}}>스크럼 게시판</NavText>
                  </NavItem>
                  <NavItem eventKey="qna">
                    <NavText style={{paddingLeft: 60}}>Q&A 게시판</NavText>
                  </NavItem>
                  <NavItem eventKey="free">
                    <NavText style={{paddingLeft: 60}}>자유 게시판</NavText>
                  </NavItem>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          <Main expanded={expanded}></Main>
          <main>
            <Modal 
              visible={this.state.visible}
              width="300"
              height="300"
              effect="fadeInUp"
              onClickAway={()=>{this.setState({visible:false})}}>
              <div className="container">
                <form onSubmit={this.handleSubmit}>
                  <h1 style={{marginBottom: 20, marginTop: 10}}>Login</h1>
                  <FormGroup 
                    controlId="user_id" 
                    bsSize="sm">
                    <ControlLabel>ID (KAIST UID): </ControlLabel>
                    <FormControl
                      autoFocus
                      type="id"
                      value={this.state.user_id}
                      placeholder="Enter ID"
                      onChange={this.handleChange}/><FormControl.Feedback/>
                  </FormGroup>
                  <FormGroup 
                    controlId="user_pw" 
                    bsSize="sm">
                    <ControlLabel>Password: </ControlLabel>
                    <FormControl
                      autoFocus
                      type="password"
                      value={this.state.user_pw}
                      placeholder="Enter password"
                      onChange={this.handleChange}/><FormControl.Feedback/>
                  </FormGroup>
                  <Button
                    bsSize="sm" 
                    bsStyle="warning"
                    style={{marginLeft: 200}}
                    onClick={()=>{this.loginRequest()}}>{this.state.loggedIn? 'Logout': 'Login'}</Button>
                </form>
              </div>
            </Modal>
            <Modal
              visible={this.state.visible2}
              width="300"
              height="150"
              effect="fadeInUp"
              onClickAway={()=>{this.setState({visible2:false})}}>
              <div className="container">
                <h1 style={{marginBottom: 20, marginTop: 10}}>Logout?</h1>
                <Button
                    bsSize="lr" 
                    bsStyle="warning"
                    style={{marginLeft: 200}}
                    onClick={()=>{this.setState({loggedIn: false, visible2:false})}} >{this.state.loggedIn? 'Logout': 'Login'}</Button>
                </div></Modal>
            <Route path="/" exact component={props => <Homepage />}></Route>
            <Route path="/notice" component={props => <Notice user_id={this.state.user_id}/>}></Route>
            <Route path="/submit" component={props => <ProjectSubmit expanded={expanded}/>}></Route>
            <Route path="/gallery" component={props => <ProjectGallery expanded={expanded}/>}></Route>
            <Route path="/main" component={props => <MainPage expanded={expanded}/>}></Route>
            <Route path="/qna" component={props => <InformationBoard expanded={expanded}/>}></Route>
            <Route path="/free" component={props => <FreeBoard expanded={expanded} param={props}/>}></Route>
            <Route path="/new/information" component={props => <NewInformationPost expanded={expanded} param={props} />}></Route>
            <Route path="/new/free" component={props => <NewFreePost expanded={expanded} />}></Route>
            <Route path="/post/:post_id" component={props => <Post expanded={expanded} param={props}/>}></Route>
            <Route path="/scrum" component={props => <Scrum expanded={expanded}/>}></Route>
            
          </main>
        </div>
        )}
        /></Router>
    );
  }
}

export default App;
