import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

export default function Index(props) {

    const history = useHistory();

    async function handleHome(e) {
        e.preventDefault();
        history.push('/');
    };

    async function handleList(e) {
        e.preventDefault();
        history.push('/list');
    };

    return(
        <div id="header" className="flex w-full h-16 items-center px-8" >
            <div className="w-full">
                <span className="cursor-pointer text-white text-lg font-semibold pl-4 pt-1" onClick={handleHome}>
                    {props.title}
                </span>
            </div>
            <div id="sign-buttons" className="flex justify-end w-full" onClick={handleList}>
                <div className="bg-green-500">
                    Registrar
                </div>
                <div className="bg-blue-500">
                    Entrar
                </div>
            </div>
        </div>
    )
}

