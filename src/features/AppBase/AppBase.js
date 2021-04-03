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
import Attendance from "./onlinseSession/Attendance";
import AddPost from "./forum/AddPost";
import SinglePost from "./forum/SinglePost";
import { auth } from "../../Firebase";
import { useSelector } from "react-redux";
import { selectuser } from "./user/UserSlice";
import CourseActivitiesMainPage from "../../Pages/CourseActivitiesMainPage";

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
    backgroundColor: "#f3f2ef",
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function ClippedDrawer() {
  const user = useSelector(selectuser);

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
          <p> Welcome : {user.email}</p>

          <button onClick={signOut} className="Profile_screenSignOut">
            {" "}
            Sign Out
          </button>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {" "}
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
            <ListItem button onClick={() => history.push("/app/activites")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="Activities" />
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
          <Route exact path="/app/singlepost/:id">
            <SinglePost />
          </Route>
          <Route exact path="/app/addPost">
            <AddPost />
          </Route>
          <Route exact path="/app/chat">
            <LiveChat />
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
          <Route exact path="/app/attendance/:roomId">
            <Attendance></Attendance>
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
