import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormLabel, IconButton, Input, InputLabel, ListItem, ListItemAvatar, ListItemText, Slide, Typography } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import './Todo.css'
import { db } from './firebase'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export function Todo({ id, text, date }) {
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState('')

    React.useEffect(() => {
        setInput(text)
    }, [text])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateTodo = () => {
        db.collection('todos').doc(id).set({
            todo: input
        }, { merge: true })
        setOpen(false)
    }

    const deleteTodo = evt => { db.collection('todos').doc(id).delete() }

    return (<>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle >{"Edit Your Todo"}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <Input style={{ width: '500px' }} value={input}
                        onChange={evt => setInput(evt.target.value)} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button disabled={!input} onClick={updateTodo} color="primary">
                    Agree
                </Button>

            </DialogActions>
        </Dialog>
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" >📝</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={text}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {date}
                        </Typography>

                    </React.Fragment>
                }
            />
            <IconButton onClick={handleOpen} >
                <EditIcon />
            </IconButton>
            <IconButton onClick={deleteTodo} >
                <DeleteIcon />
            </IconButton>
        </ListItem>
        <Divider variant="inset" component="li" />
    </>
    )
}

