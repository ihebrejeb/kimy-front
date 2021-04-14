import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles,  Button } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(30)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
              
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions >
                <Button
                    
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} > Close</Button>
                <button
                   
                    onClick={confirmDialog.onConfirm} > Confirm </button> 
            </DialogActions>
        </Dialog>
    )
}