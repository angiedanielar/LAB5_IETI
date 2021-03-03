import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import ResponsiveDrawer from './ResponsiveDrawer';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const Filter = (props) => {
    const classes = useStyles();

    const [status, setStatus] = useState("Ready");
    const [responsible, setResponsible] = useState("");

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleResponsibleChange = (e) => {
        setResponsible(e.target.value);
    };

    const handleCleanFilters = () => {
        setResponsible("");
        setStatus("Ready");
    };

    const handleFilters = (e) => {
        e.preventDefault();
        const filters = {
            status: status,
            responsible: responsible
        };
        props.filter(filters);
        props.closeAction();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.closeAction}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <ResponsiveDrawer></ResponsiveDrawer>
                        <form className="todo-form">
                            <Typography variant="h2">New Task</Typography>
                            <FormControl margin="normal" required>
                                <InputLabel htmlFor="number">Responsible:</InputLabel>
                                <Input id="responsible" value={responsible} name="responsible" autoFocus onChange={handleResponsibleChange} />
                            </FormControl>
                            <br></br>
                            <br></br>
                            <FormControl margin="normal" required>
                                <InputLabel htmlFor="age-native-simple">Status:</InputLabel>
                                <Select
                                    native
                                    value={status}
                                    onChange={handleStatusChange}>
                                    <option value="Ready">Ready</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Done">Done</option>
                                </Select>
                            </FormControl>
                        </form>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button
                            onClick={handleCleanFilters}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Clear All</Button>
                        <br></br>
                        <br></br>
                        <Button
                            onClick={handleFilters}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Filter</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}