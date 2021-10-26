import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../../assets/logo.svg";

import './styles.css';

export default function Index(props) {

    const history = useHistory();
    const token = localStorage.getItem('id');

    async function handleHome(e) {
        e.preventDefault();
        history.push('/');
    }

    async function handleSignUp(e) {
        e.preventDefault();
        history.push('/signup');
    }

    async function handleSignIn(e) {
        e.preventDefault();
        history.push('/signin');
    }

    async function handleExit(e) {
        e.preventDefault();
        localStorage.clear();
        history.push('/');
    };

    return(
        <div id="header" className="flex w-full h-16 items-center px-8" >
            <div className="w-full">
                <img className="object-contain h-12 cursor-pointer" onClick={handleHome} src={Logo} alt="Logo"/>
            </div>
            { (token && token !== 'undefined') ?
                (
                    <div id="logged-buttons" className="flex justify-end w-full">
                        <div className="bg-green-500" onClick={handleExit}>
                            Editar perfil
                        </div>
                        <div className="bg-indigo-500" onClick={handleExit}>
                            Enviar texto
                        </div>
                        <div className="bg-red-500" onClick={handleExit}>
                            Sair
                        </div>
                    </div>
                ) : (
                    <div id="sign-buttons" className="flex justify-end w-full">
                        <div className="bg-green-500" onClick={handleSignUp}>
                            Registrar
                        </div>
                        <div className="bg-blue-500" onClick={handleSignIn}>
                            Entrar
                        </div>
                    </div>
                )
            }
        </div>
    )
}

