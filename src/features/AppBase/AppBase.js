import React, { useState } from "react";
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
  useLocation,
  NavLink,
  useParams,
} from "react-router-dom";
import Courses from "../../Pages/Courses";
import Forum from "../../Pages/Forum";
import Calendrier from "../../Pages/Calendrier";
import Userprofile from "../../Pages/Userprofile";
import CourseActivitiesMainPage from "../../Pages/CourseActivitiesMainPage";
import { useSelector, useDispatch } from "react-redux";
import LiveChat from "../AppBase/chat/LiveChat";
import { logout } from "./user/actions/auth.js";
import CourseDemo from "./onlinseSession/CourseDemo";
import CourseRecordings from "./onlinseSession/CourseRecordings";
import Lobby from "./onlinseSession/Lobby";
import Attendance from "./onlinseSession/Attendance";
import AddPost from "./forum/AddPost";
import SinglePost from "./forum/SinglePost";
import { auth } from "../../Firebase";
import Testuser from "../../Pages/Testuser";
import { selectCourse, selectedcourse } from "./onlinseSession/CourseDemoSlice";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import {
  CalendarToday,
  ExitToApp,
  Person,
  SlowMotionVideo,
} from "@material-ui/icons";
import Container from "../../Pages/Container";
import { selectcourses } from "./courses/CoursesSlice";

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
    padding: theme.spacing(2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginRight: "20px",
  },
  avatar: {
    backgroundColor: blue[700],
    cursor: "pointer",
  },
}));

export default function ClippedDrawer() {
  /*   const user = useSelector(selectuser);
   */
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user.data.user);
  console.log(user.avatar)
  const course = useSelector(selectedcourse);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const doLogout = (e) => {
  
    console.log('const dologout')
    dispatch(logout());
    history.push('/')
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
              <NavLink
                to="/app/activites"
                className={classes.link}
                activeStyle={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "blue",
                }}
              >
                Activities
              </NavLink>
              <NavLink
                to={`/app/forum/${course.id}`}
                className={classes.link}
                activeStyle={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "blue",
                }}
              >
                Forum
              </NavLink>
              <NavLink
                to="/app/course/recordings"
                className={classes.link}
                activeStyle={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "blue",
                }}
              >
                Recordings
              </NavLink>
            </div>
          )}
          <div className={classes.flex}>
            {course && location.pathname !== "/app/video/" + course.id && (
              <Tooltip title="Start video conference">
                <IconButton color="primary" onClick={joinLobby}>
                  <SlowMotionVideo></SlowMotionVideo>
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Calendar">
              <IconButton
                color="primary"
                onClick={() => {
                  history.push("/app/calendar");
                }}
              >
                <CalendarToday></CalendarToday>
              </IconButton>
            </Tooltip>
            <Avatar
              className={classes.avatar}
              aria-controls="simple-menu"
              aria-haspopup="true"
              src={user.avatar}
              onClick={handleClick}
            >
            </Avatar>
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            console.log('aa')
                            history.push("/app/users");
                          }}
                        >
                          <ListItemIcon>
                            <Person fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Profile" />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            doLogout();
                          }}
                        >
                          <ListItemIcon>
                            <ExitToApp fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <Toolbar />

        <Switch>
          <Route exact path="/app">
            <Redirect to="/app/courses"></Redirect>
          </Route>

          <Route exact path="/app/courses">
            <Courses ></Courses>
          </Route>
          <Route exact path="/app/forum/:courseid">
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
          <Route exact path="/app/activites/">
            <CourseActivitiesMainPage />
          </Route>
          <Route exact path="/app/whiteboard">
            <Container />
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
