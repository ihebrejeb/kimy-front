import React from 'react'
import { useSelector } from 'react-redux';
import Userr from './Userr'
import { Grid } from '@material-ui/core';
import useStyles from "./ListStyles"


function UsersList({setcurrentId}) {
    const classes= useStyles ;
    const users = useSelector(state => state.users.userslist.users)
    console.log("ija")
    console.log(users)
    return (
        <div>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {users.map((user) => (
          <Grid key={user._id} item xs={12} sm={4} md={3}>
            <Userr users={user}  setCurrentId={setcurrentId} />
          </Grid>
        ))}
      </Grid>
        </div>
    )
}

export default UsersList  

/* import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import {fetchUsers} from '../actions/actioncrud';
import Userr from './Userr'
import useStyles from "./ListStyles"


class UsersList extends Component {

  componentDidMount(){
    this.props.fetchUsers();
  }

  render() {
    this.props.fetchUsers();
    const {users} = state => state.users.userslist.users
    console.log(users)
    const classes= useStyles ;
    return (
      <div>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {users.map(
             user => <Userr user={user} key={user._id}/>
           )}
      </Grid>
        </div>
      
    );
  }

}

UsersList.propTypes={
    users:PropTypes.array.isRequired,
    fetchUser:PropTypes.func.isRequired
  }

const mapStateToProps = state=>{
    console.log(state);
    return {
    }
  };
  
  export default connect(mapStateToProps,{fetchUsers})(UsersList);  */


