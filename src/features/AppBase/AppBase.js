import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "./Logo.png";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  Link,
  useLocation,
} from "react-router-dom";
import Courses from "../../Pages/Courses";
import Forum from "../../Pages/Forum";
import Calendrier from "../../Pages/Calendrier";
import Userprofile from "../../Pages/Userprofile";
import CourseActivitiesMainPage from "../../Pages/CourseActivitiesMainPage";
import { useSelector } from "react-redux";
import LiveChat from "../AppBase/chat/LiveChat";
import CourseDemo from "./onlinseSession/CourseDemo";
import CourseRecordings from "./onlinseSession/CourseRecordings";
import Lobby from "./onlinseSession/Lobby";
import Attendance from "./onlinseSession/Attendance";
import AddPost from "./forum/AddPost";
import SinglePost from "./forum/SinglePost";
import { auth } from "../../Firebase";
import Testuser from "../../Pages/Testuser";
import { selectuser } from "./user/UserSlice";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  links: {
    display: "flex",
    gap: "15px",
  },
  link: { textDecoration: "none", color: "#36454F" },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    color: "black",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
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
    width: "100%",
    padding: theme.spacing(1),
  },
}));

export default function ClippedDrawer() {
  const user = useSelector(selectuser);
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  //const user = useSelector(state => state.user.user);
  const course = useSelector(selectedcourse);

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };
  const joinLobby = () => {
    history.push("/app/video/" + course.id);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar className={classes.appBar}>
          <img
            src={logo}
            className={classes.logo}
            alt="logo"
            onClick={() => history.push("/app/courses")}
          ></img>

          {course && (
            <div className={classes.links}>
              <Link to="/app/activites" className={classes.link}>
                Activities
              </Link>
              <Link to="/app/forum" className={classes.link}>
                Forum
              </Link>
              <Link to="/app/course/recordings" className={classes.link}>
                Recordings
              </Link>
            </div>
          )}
          <div>
            {course && location.pathname !== "/app/video/" + course.id && (
              <button onClick={joinLobby}>Join</button>
            )}
            <button onClick={signOut} className="Profile_screenSignOut">
              {" "}
              Sign Out
            </button>
          </div>
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
            <ListItem button onClick={() => history.push("/app/calendar")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItem>
            {/* <ListItem button onClick={() => history.push("/app/users")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem> 
            <ListItem button onClick={() => history.push("/app/activites")}>
              <ListItemIcon>
                <ViewCompactIcon></ViewCompactIcon>
              </ListItemIcon>
              <ListItemText primary="Activities" />
            </ListItem>
          </List>
        </div>
      </Drawer>*/}

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
            <Calendrier></Calendrier>
          </Route>
          <Route exact path="/app/activites">
            <CourseActivitiesMainPage />
          </Route>
          <Route exact path="/app/users">
            <Userprofile />
          </Route>
          <Route exact path="/app/userstest">
            <Testuser />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </main>
    </>
  );
}
