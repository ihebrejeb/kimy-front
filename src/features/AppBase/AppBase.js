import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import logo from "./Logo.png";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Courses from "../../Pages/Courses";
import Forum from "../../Pages/Forum";
import Calendar from "../../Pages/Calendar";
import CourseActivitiesMainPage from "../../Pages/CourseActivitiesMainPage";

import LiveChat from "../AppBase/chat/LiveChat";
import AddPost from "./forum/AddPost";
import SinglePost from "./forum/SinglePost";
import { auth } from "../../Firebase";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    height: "40px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src={logo} className={classes.logo} alt="logo"></img>

          <button onClick={signOut} className="Profile_screenSignOut">
            {" "}
            Sign Out
          </button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => history.push("/app/courses")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem button onClick={() => history.push("/app/chat")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="livechat" />
            </ListItem>
            <ListItem button onClick={() => history.push("/app/forum")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />

        <Switch>
          <Route exact path="/app">
            <Redirect to="/app/courses"></Redirect>
          </Route>
          <Route exact path="/app/courses">
            <Courses></Courses>
          </Route>
          <Route exact path="/app/forum">
            <Forum></Forum>
          </Route>
          <Route exact path="/app/singlepost">
            <SinglePost />
          </Route>
          <Route exact path="/app/addPost">
            <AddPost />
          </Route>
          <Route exact path="/app/chat">
            <LiveChat />
          </Route>
          <Route exact path="/app/calendar">
            <Calendar></Calendar>
          </Route>
          <Route exact path="/app/activites">
            <CourseActivitiesMainPage />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </main>
    </div>
  );
}
