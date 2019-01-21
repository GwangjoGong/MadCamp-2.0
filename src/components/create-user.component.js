import React, {Component} from 'react';
import axios from 'axios';

// Schema-
//     id : String,
// 	pw: String,
// 	name: String.
// 	uid:String.
// 	class : Number (min :1 max :3)

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        this.onChangePasswd = this.onChangePasswd.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUid = this.onChangeUid.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            passwd: 'passwd',
            name: 'jihoo',
            uid: 'myUid',
            class: 1
        }
    }

    onChangePasswd(e){
        this.setState({
            passwd: e.target.value
        });
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeUid(e){
        this.setState({
            uid: e.target.value
        });
    }

    onChangeClass(e){
        this.setState({
            class: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newUser ={
            passwd: this.state.passwd,
            name: this.state.name,
            uid: this.state.uid,
            class: this.state.class
        }

        axios.post('143.248.140.106:1580/user/signup', newUser).then(res => console.log(res.data));

        this.setState({
            passwd: '',
            name: '',
            uid: '',
            class: -1
        })

    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>CREATE NEW USER</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>name: </label>
                        <input  type="text" 
                                className="form-control" 
                                value={this.state.name} 
                                onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>uid: </label>
                        <input  type="text" 
                                className="form-control" 
                                value={this.state.uid} 
                                onChange={this.onChangeUid} />
                    </div>
                    <div className="form-group">
                        <label>password: </label>
                        <input  type="text" 
                                className="form-control" 
                                value={this.state.passwd} 
                                onChange={this.onChangePasswd} />
                    </div>
                    <div className="form-group">
                        <label>class: </label>
                        <input  type="number" 
                                className="form-control" 
                                value={this.state.class} 
                                onChange={this.onChangeClass} />
                    </div>
                </form>
            </div>
        )
    }
    
}