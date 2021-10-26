import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from "../../assets/logo.png";

import './styles.css';

export default function Index(props) {

    const history = useHistory();

    async function handleHome(e) {
        e.preventDefault();
        history.push('/');
    };

    async function handleSignUp(e) {
        e.preventDefault();
        history.push('/signup');
    };

    return(
        <div id="header" className="flex w-full h-16 items-center px-8" >
            <div className="w-full">
                <img className="object-contain h-16 cursor-pointer" onClick={handleHome} src={logo} alt="Logo"/>
            </div>
            <div id="sign-buttons" className="flex justify-end w-full">
                <div className="bg-green-500" onClick={handleSignUp}>
                    Registrar
                </div>
                <div className="bg-blue-500">
                    Entrar
                </div>
            </div>
        </div>
    )
}

