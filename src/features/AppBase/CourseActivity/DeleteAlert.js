import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  Button,
  Slide,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "top",
  },
  dialogContent: {
    textAlign: "top",
    TextDecoder: "underline",
  },
  dialogAction: {
    justifyContent: "center",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DeleteAlert(props) {
  const { deleteAlert, confirmDelete } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={deleteAlert.isOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={classes.dialogTitle}></DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{deleteAlert.title}</Typography>
        <Typography variant="subtitle2">{deleteAlert.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => confirmDelete({ ...deleteAlert, isOpen: false })}
        >
          {" "}
          Cancel
        </Button>
        <button onClick={deleteAlert.onConfirm}> Delete </button>
      </DialogActions>
    </Dialog>
  );
}
