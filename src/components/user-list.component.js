import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.uid}</td>
        <td>{props.user.class}</td>
    </tr>
)

export default class UserList extends Component {

    constructor(props){
        super(props);
        this.state = { users: []};
    }

    componentDidMount(){
        axios.get('http://143.248.140.106:1580/user')
            .then(res => {
                this.setState({users: res.data});
            })
            .catch(function(err){
                console.log(err);
            })
    }

    getUserList(){
        return this.state.users.map(function(currentUser, i){
            return <User user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <p>User Info List</p>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>uid</th>
                            <th>class</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.getUserList() }
                    </tbody>
                </table>
            </div>
        )
    }
}