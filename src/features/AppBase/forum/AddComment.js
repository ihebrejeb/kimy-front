import React from "react";

import { useDispatch } from "react-redux";
import { createComment } from "./ForumSlice";
import { useState } from "react";
import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert } from "@material-ui/lab";
const schema = yup.object().shape({
  text: yup.string().required("did you forget to write something ?"),
 
});
function AddComment({ postId }) {

  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schema),

  });

  const dispatch = useDispatch();
  const [CommentData, setCommentData] = useState({ text: "" });
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
  }));

  const classes = useStyles();

  const clear = () => {
    setCommentData({ text: "" });
  };
 
  const handleClick = () => {
    setOpen(true);
  };

  const submit = (e) => {
    dispatch(createComment({ postId, CommentData }));
    clear();
    handleClick()

  };
  const [open, setOpen] = React.useState(false);

 
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      style={{
        marginTop: "20 px",
        backgroundColor: "white",
        width: "2Ovw",
        padding: "15px",
        paddingleft: "15px",
        marginBottom: "15px",
      }}
    >
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <OutlinedInput
        {...register("text")} 
          id="outlined-adornment-amount"
          value={CommentData.text}
          onChange={(e) =>
            setCommentData({ ...CommentData, text: e.target.value })
          }
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle style={{ color: "blue" }} />
            </InputAdornment>
          }
          labelWidth={30}
          placeholder="write a comment...."
          endAdornment={
            <IconButton aria-label="view" onClick={handleSubmit(submit)}>
              {" "}
              <SendIcon style={{ color: "blue" }} />{" "}
            </IconButton>
          }
        />
        {errors.text?.message }
      </FormControl>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                 Your comment has been sent 
            </Alert>
          </Snackbar>
    </div>
  );
}

export default AddComment;
