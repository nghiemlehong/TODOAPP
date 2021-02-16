import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, Input, ListItem, ListItemAvatar, ListItemText, Slide, Typography } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import './Todo.css'
import { db } from './firebase'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export function Todo({ id, text, date, completed }) {
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

    const updateCompleted = () => {
        db.collection('todos').doc(id).set({
            completed: !completed
        }, { merge: true }
        )
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
                primary={<React.Fragment>
                    {completed ?
                        <Typography
                            style={{
                                textDecorationLine: 'line-through'
                            }}
                            variant="h5"
                        >
                            {text}
                        </Typography> :
                        <Typography
                            variant="h5"
                        >
                            {text}
                        </Typography>}
                </React.Fragment>}
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
            <IconButton onClick={updateCompleted} >
                {completed ? <Favorite /> : <FavoriteBorder />} 
            </IconButton>
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

