

import React, { Component } from 'react';
import {connect} from 'react-redux';
import UsersList from '../features/AppBase/user/UsersList'
import { fetchUsers } from '../features/AppBase/actions/actioncrud';


class Testuser extends Component {

  componentDidMount(){
    this.props.fetchUsers();
  }

  render() {
    this.props.fetchUsers();
    return (
      <div>

      <div>  <UsersList/>  </div>
          
          
         
    </div>
      
    );
  }

}



const mapStateToProps = state=>{
    console.log(state);
    return {
    }
  };
  
  export default connect(mapStateToProps,{fetchUsers})(Testuser); 
