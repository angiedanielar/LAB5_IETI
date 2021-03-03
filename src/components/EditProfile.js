import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from './ResponsiveDrawer';
import axios from "axios";
import Swal from 'sweetalert2';

export const EditProfile = ({update}) => {

    let user = localStorage.getItem("user");
    let pass = localStorage.getItem("pass");

    console.log(update)
    const [name, setName] = useState(update[2]);
    const [email, setEmail] = useState(user);
    const [password, setPassword] = useState(pass);
    const [confirmPass, setConfirmPass] = useState(pass);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!name.length || !email.length || !password.length || !confirmPass.length)
            return;

        if (password===confirmPass) {

            const newUser = {
                "name": name,
                "email": email,
                "password": password,
                "confirmPass": confirmPass
            };
    
            axios.put("https://ieti-d8d81-default-rtdb.firebaseio.com/user.json", newUser)
                .then(response => {
                    
                }).catch(error => {
                    alert("An error occurred while trying to connect to the database.");
                });

                Swal.fire(
                    'Yei!',
                    'Usuario actualizado',
                    'success'
                )
        }
        else {
            Swal.fire({
                title: 'Ops!',
                text: 'The password does not match.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPass(e.target.value);
    }

    return (
        <div className="Edit">
            <ResponsiveDrawer></ResponsiveDrawer>
            <form onSubmit={handleSubmit} className="todo-form">
                <Typography variant="h2">Edit your profile</Typography>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="text">Full name:</InputLabel>
                    <br></br>
                    <Input value={name} id="name" name="name"  onChange={handleNameChange} autoFocus />
                </FormControl>
                <br></br>
                <br></br>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="number">Email:</InputLabel>
                    <br></br>
                    <Input value={email} id="email" name="email" autoFocus />
                </FormControl>
                <br></br>
                <br></br>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="number">Password:</InputLabel>
                    <br></br>
                    <Input value={password} id="password" name="password" autoFocus onChange={handlePasswordChange} />
                </FormControl>
                <br></br>
                <br></br>
                <FormControl margin="normal" required>
                    <InputLabel htmlFor="number">Confirm Password:</InputLabel>
                    <br></br>
                    <Input value={confirmPass} id="confirmPass" name="confirmPass" autoFocus onChange={handleConfirmPasswordChange} />
                </FormControl>
                <br></br>
                <br></br>
                <br></br>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit">
                    Actualizar
                    </Button>
            </form>
            <br></br>
            <br></br>
        </div>
    )
}