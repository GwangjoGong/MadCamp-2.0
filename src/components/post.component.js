import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import SyntaxHighLighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

const Comment = props => (
    <tr>
        <td width="20%">{props.comment.name}</td>
        <td wdith="80%">{props.comment.body}</td>
    </tr>
)

export default class Post extends Component{

    constructor(props){
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            post : [],
            postCode :'',
            margin_left : props.expanded ? 240 : 64,
            key : props.param.match.params.post_id,
            comments:[],
            name: '',
            comment:''
        }
    }

    onChangeComment(e){
        this.setState({
            comment : e.target.value
        });
    }
    onChangeName(e){
        this.setState({
            name : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        var newComment = {
            token: this.state.key,
            name: this.state.name,
            body: this.state.comment
        }

        axios.post("http://143.248.140.106:1580/post/comments/new",newComment)
            .then(res => console.log("RES"+res));

        this.setState({
            name: '',
            comment:''
        })
        
        window.location.reload()
    }

    componentDidMount() {
        var token = {
            token : this.state.key
        }

        axios.post('http://143.248.140.106:1580/post/getPost',token)
            .then(response => {
                console.log(response.data.postCode)
                this.setState({post: response.data});
                this.setState({comments: response.data.comments});
                if(response.data.postCode!=undefined){
                    this.setState({
                        postCode: response.data.postCode,
                        showCode:true
                    });
                }
            })
            .catch(function(err){
                console.log(err);
            })
    }

    commentList(){
        return this.state.comments.map(function(currentComment, i){
            console.log(currentComment)
            return <Comment comment = {currentComment} key ={i}/>;
        })
    }


    render(){
        return(
            <div style={{marginLeft:this.state.margin_left,padding:20,background:'lightgray'}}>
                <Paper>
                    <div align="center" style={{fontSize:50,fontWeight:'bold',padding:20}}>
                        {this.state.post.postName}
                    </div>  

                    <div align="right" style={{fontSize:20,fontWeight:'bold',color:'purple',padding:20,paddingBottom:0}}>
                        {this.state.post.postedBy}
                    </div>

                    <div align="right" style={{fontSize:15,paddingRight:20}}>
                        {this.state.post.updatedOn}
                    </div>

                    <div style={{padding:20}}>
                        <SyntaxHighLighter language='javascript' style={docco}>
                            {this.state.postCode}
                        </SyntaxHighLighter>
                    </div>   

                    <div style={{padding:20}}>
                        {this.state.post.postText}
                    </div>                   
                </Paper>
                <Paper style={{marginTop:20}}>
                    <div align="left" style={{fontSize:30,fontWeight:'bold',padding:20}}>
                        Comments
                    </div>
                    <table className="table" style={{marginTop: 20}}>
                        <tbody>
                            {this.commentList()}
                        </tbody>
                    </table>
                </Paper>
                <Paper style={{marginTop:20}}>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{padding:20,paddingBottom:0}}>
                        <label style={{fontFamily:"sans-serif",fontSize:'20',fontWeight:'bold'}}>Name</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group" style={{padding:20,paddingTop:0}}>
                        <label style={{fontFamily:"sans-serif",fontSize:'20',fontWeight:'bold'}}>Add Comment</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.comment}
                                onChange={this.onChangeComment}
                                />
                    </div>
                    <div className="form-group" style={{padding:20,paddingTop:0}}>
                        <input type="submit" value="Add Comment" className="btn btn-primary"/>
                    </div>
                    </form>
                </Paper>
            </div>
        )
    }
}