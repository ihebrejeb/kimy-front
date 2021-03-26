import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "./Logo.png";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Courses from "../../Pages/Courses";
import Forum from "../../Pages/Forum";
import Calendar from "../../Pages/Calendar";
import LiveChat from "../AppBase/chat/LiveChat";
import CourseDemo from "./onlinseSession/CourseDemo";
import CourseRecordings from "./onlinseSession/CourseRecordings";
import Lobby from "./onlinseSession/Lobby";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
  },
  logo: {
    height: "40px",
    cursor: "pointer",
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
    padding: theme.spacing(1),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img
            src={logo}
            className={classes.logo}
            alt="logo"
            onClick={() => history.push("/app")}
          ></img>
        </Toolbar>
      </AppBar>
      {/* <Drawer
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
       */}
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
          <Route exact path="/app/chat">
            <LiveChat />
          </Route>

          <Route exact path="/app/calendar">
            <Calendar></Calendar>
          </Route>
          {/*   demo video chat */}
          <Route exact path="/app/videodemo">
            <CourseDemo></CourseDemo>
          </Route>
          <Route exact path="/app/course/recordings">
            <CourseRecordings />
          </Route>
          <Route exact path="/app/video/:roomName">
            <Lobby></Lobby>
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </main>
    </div>
  );
}
