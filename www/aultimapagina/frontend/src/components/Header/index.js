import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../../assets/logo.svg";

import './styles.css';
import api from "../../services/api";

export default function Index(props) {

    const history = useHistory();
    const [userRole, setUserRole] = useState('USER');
    const token = localStorage.getItem('id');

    useEffect(() => {
        const userId = localStorage.getItem('id');

        if (userId && userId !== 'undefined') {
            api.get(`users/${userId}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(response => {
                setUserRole(response.data.role);
            });
        }
        else {
            setUserRole('USER');
        }
    }, [])

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
    }

    async function handleCreatePost(e) {
        e.preventDefault();
        history.push('/create-post');
    }

    return(
        <div id="header" className="flex w-full h-16 items-center px-8" >
            <div className="w-full">
                <img className="object-contain h-12 cursor-pointer" onClick={handleHome} src={Logo} alt="Logo"/>
            </div>
            { (token && token !== 'undefined') ?
                (
                    <div id="logged-buttons" className="flex justify-end w-full">
                        <div className="bg-green-500 hover:bg-green-600" onClick={handleExit}>
                            Editar perfil
                        </div>
                        { (userRole === 'USER') ? (
                                <div className="bg-indigo-500 hover:bg-indigo-600" onClick={handleExit}>
                                    Enviar texto
                                </div>
                            ) : (
                                <div className="bg-indigo-500 hover:bg-indigo-600" onClick={handleCreatePost}>
                                    Criar postagem
                                </div>
                            )
                        }
                        <div className="bg-red-500 hover:bg-red-600" onClick={handleExit}>
                            Sair
                        </div>
                    </div>
                ) : (
                    <div id="sign-buttons" className="flex justify-end w-full">
                        <div className="bg-green-500 hover:bg-green-600" onClick={handleSignUp}>
                            Registrar
                        </div>
                        <div className="bg-blue-500 hover:bg-blue-600" onClick={handleSignIn}>
                            Entrar
                        </div>
                    </div>
                )
            }
        </div>
    )
}

