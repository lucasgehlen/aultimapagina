import React from 'react';
// import { useHistory } from 'react-router-dom';

import './styles.css';

export default function Index(props) {

    // const history = useHistory();

    // async function handleHome(e) {
    //     e.preventDefault();
    //     history.push('/');
    // };
    //
    // async function handleList(e) {
    //     e.preventDefault();
    //     history.push('/list');
    // };

    return(
        <li key={props.key} className="border border-4 border-gray-400 border-opacity-50 rounded-md px-4 py-4 cursor-pointer">
            <p className="text-blue-400 text-sm truncate font-medium">
                {props.title}
            </p>
            <p className="text-gray-400 text-xs py-3 truncate">
                {props.text}
            </p>
        </li>
    )
}

