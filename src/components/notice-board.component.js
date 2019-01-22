import React, {Component} from 'react';
import axios from 'axios';
import { Grid, Layout } from 'gymnast';
import "../components/notice-board.css";

import { Button, ButtonToolbar, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn, BootstrapButton } from 'react-bootstrap-table';
import Modal from 'react-awesome-modal';
import TextyAnim from 'rc-texty';
import Typography from '@material-ui/core/Typography';
import { PlacesSmokingRooms } from 'material-ui/svg-icons';


const title = "Notice"

const Not = props => (
    <tr>
        <td>{props.not.postName}</td>
        <td>{props.not.postText}</td>
        <td>{props.not.postedBy}</td>
        <td>{props.not.updatedOn}</td>
    </tr>
)

export default class Notice extends Component {

    // Post
    // {   
    //     postType: String,  // notice, information, scrum
    //     postName : String,
    //     postText: String,
    //     postedBy: String,
    //     privacy : Number,
    //     updatedOn: Date
    // }

    constructor(props) {
        super(props);

        this.state = {
            // postType: "notice",
            // postName: "",
            // postText: "",
            // postedBy: "",
            // privacy: 0,
            // updatedOn: "",

            notices: [],
            rowIndex: 0,
            postName: "",
            postText: "",
            postedBy: "",
            updatedOn: "",
            page: 0,
            sizePerPage: 0,
            
            visible: false,
            visible2: false,
            margin_left: props.expanded ? 240: 64
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
    }

    newNotice() {
        var currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          }).replace(/ /g, '-');
        var key = { postType: "Notice", postName: this.state.postName, postText: this.state.postText, postedBy: this.props.user_id, privacy: 0, updatedOn: formattedDate }
        axios.post('http://143.248.140.106:1580/post/new', key)
            .then(res => {
                console.log(1111);
            })
            .catch(function(err){
                console.log(err);
            })
        this.setState({visible: false});

        window.location.reload();
    }

    componentDidMount() {
        var key = {
            postType : "Notice"
        }
        axios.post('http://143.248.140.106:1580/post', key)
            .then(res => {
                this.setState({ notices: res.data });
                console.log(this.state.notices);
            })
            .catch(function(err){
                console.log(err);
            })
    }

    getNotices(){
        // var k=0;
        // for(var i in this.state.notices){
        //     this.setState(this.state.notices[i["rowIndex"]]) = k;
        //     k += 1
        // }
        return this.state.notices;
    }

    handleChange = event => {
        this.setState({
          [event.target.id] : event.target.value
        });
      }
    
    handleSubmit = event => {
        event.preventDefault();
    }

    onMouseEnter() {
        this.setState({visible2: true});
    }

    buttonFormatter(cell, row){
        return '<Button bsSize="sm" bsStyle="warning" onClick={this.openDetail}>details</Button>';
    }

    onClickProductSelected(cell, row, rowIndex){
        console.log('Product #', rowIndex);
        this.setState({
            visible2: true,
            postNum: this.state.notices[rowIndex].postNum,
            // 여기초 고침
            postName: this.state.notices[rowIndex].postName,
            postText: this.state.notices[rowIndex].postText,
            postedBy: this.state.notices[rowIndex].postedBy,
            updatedOn: this.state.notices[rowIndex].updatedOn
        })
    }
    
    cellButton(cell, row, enumObject, rowIndex) {

        var idx = (this.state.page - 1) * this.state.sizePerPage + rowIndex
        return (
        <Button 
            bsSize="sm" bsStyle="warning"
            onClick={ () =>
            this.onClickProductSelected(cell, row, idx)}> details </Button>
        )
    }

    openDetail() {
        this.setState({visible2: true});
    }

    closeDetail() {
        this.setState({
            visible2: false,
            postName : '',
            postText : ''
        });
    }

    onPageChange(page, sizePerPage) {
        this.state.page = page;
        this.state.sizePerPage = sizePerPage;
    }

    sessionCheck() {
        var id = window.sessionStorage.getItem('id');
        if(id) return true;
        else return false;
    }

    render() {
        const tableOptions = {
            sizePerPage: 10,
            onPageChange: this.onPageChange.bind(this),
            
        }
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
                </div>
                <div align="right" style={{paddingRight: 650}}>
                    <Button
                        bsSize="medium" 
                        bsStyle="danger"
                        onClick={()=>{
                            if(this.sessionCheck()){
                                this.setState({visible:true})
                            }
                            }}>new notice</Button>
                </div>    
                <Layout height="auto">
                    <div style={{marginTop: 20, paddingRight: 350}}>
                        <BootstrapTable
                            data={ this.getNotices() }
                            bordered={ false } 
                            options={ tableOptions} pagination>
                            {/* <TableHeaderColumn width='100' dataField='rowIndex'>Num</TableHeaderColumn> */}
                            <TableHeaderColumn width='300' dataField='postName'>Title</TableHeaderColumn>
                            {/* <TableHeaderColumn width='400' dataField='postText'>Contents</TableHeaderColumn> */}
                            <TableHeaderColumn width='300' dataField='postedBy' isKey={true}>Writer</TableHeaderColumn>
                            <TableHeaderColumn width='200' dataField='updatedOn'>Time</TableHeaderColumn>
                            <TableHeaderColumn width='200' dataField="button" dataFormat={this.cellButton.bind(this)}>Details</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                    {/* <table className="table table-striped" style={{marginTop: 20}}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>contents</th>
                                <th>writer</th>
                                <th>date</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.getNotices() }
                        </tbody>
                    </table> */}
                </Layout>
                <main>
                    <Modal 
                        visible={this.state.visible}
                        width="500"
                        height="500"
                        effect="fadeInUp"
                        onClickAway={() => this.setState({visible:false})}>
                        <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <h1 style={{marginBottom: 20, marginTop: 10}}>New Notice</h1>
                            <FormGroup 
                                controlId="postName" 
                                bsSize="large">
                                <ControlLabel>Title: </ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.postName}
                                    placeholder="title"
                                    onChange={this.handleChange}/><FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup 
                            controlId="postText" 
                            bsSize="large">
                            <ControlLabel>Contents: </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                autoFocus
                                type="text"
                                value={this.state.postText}
                                placeholder="contents"
                                onChange={this.handleChange}/><FormControl.Feedback/>
                            </FormGroup>
                            <div align="right" padding='15'>
                                <Button
                                    bsSize="medium" 
                                    bsStyle="warning"
                                    //style={{marginLeft: 800}}
                                    type="submit"
                                    onClick={()=>{this.newNotice()}}>post</Button>
                            </div> 
                        </form>
                        </div>
                    </Modal>
                    <Modal
                        visible={this.state.visible2}
                        width="500"
                        height="500"
                        effect="fadeInUp"
                        onClickAway={() => this.closeDetail()}>
                        <div style={{padding:15}}>
                            <h1>
                                <FormGroup>
                                    <ControlLabel 
                                        className="endline">
                                        {this.state.postName}</ControlLabel>
                                </FormGroup>
                            </h1>
                            <p>
                                <FormGroup>
                                    <ControlLabel
                                        className="endline">
                                        {this.state.updatedOn}</ControlLabel>
                                </FormGroup>
                            </p>
                                <article>
                                    <FormGroup className="endline" style={{height:300,overflowY:'scroll'}}>                                                <ControlLabel className="p_wrap">
                                        {this.state.postText}</ControlLabel>
                                    </FormGroup>
                                </article>
                            <div align='right' style={{paddingRight:20}}>
                                <Button
                                bsSize="sm" 
                                bsStyle="warning"
                                href="javascript:void(0);" onClick={() => this.closeDetail()}>
                                Close</Button>
                            </div>
                        </div>
                    </Modal>
                </main>
            </div>
        )
    }
}