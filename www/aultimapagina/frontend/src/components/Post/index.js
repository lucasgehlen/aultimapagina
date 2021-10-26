import React from 'react';
import { format } from 'date-fns'
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
        <div className="py-4">
            <li key={props.key} className="border border-4 border-gray-400 border-opacity-50 rounded-md px-4 py-4 cursor-pointer">
                <p className="text-gray-700 font-semibold text-3xl font-medium">
                    {props.data.title}
                </p>
                <p className="text-gray-400 text-sm font-medium">
                    {props.data.writer}
                </p>
                <p className="text-gray-900 text-base py-3 text-justify">
                    {props.data.text}
                </p>
                <p className="text-gray-400 text-sm py-3">
                    {format(new Date(props.data.created_at), "dd/MM/yyyy hh:mm:ss")}
                </p>
            </li>

            <hr className="h-0.5 mt-8 border-dashed border-gray-400"/>
        </div>
    )
}

