import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Header from '../../components/Header';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

import './styles.css';

export default function SignUp (){

    var newState = EditorState.createEmpty()
    const [editorState, setEditorState] = useState(newState);

    const history = useHistory()

    const id = localStorage.getItem('id')

    if (id && id !== 'undefined') {
        api.get(`users/${id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            if (!response.data.role || response.data.role !== 'ADMIN') {
                history.push('/')
            }
        });
    } else {
        history.push('/')
    }

    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const data = {title, writer, text}

        try {
            const response = await api.post('posts', data);
            alert(`Seu ID de acesso: ${response.data}`);
            history.push('/');
        }
        catch (error) {
            console.log(error)
            alert(error);
        }
    }

    return (
        <div name="CreatePost">
            <Header />
            <div id="body-container" className="grid grid-cols-5 gap-4 px-8 py-8">
                <div id="wysiwig-container" className="col-start-2 col-span-3">
                    <form className="px-2 mt-2 w-full" onSubmit={handleRegister}>
                        <input
                            className={`py-3 px-3 mt-2 mb-3 focus:ring-2 focus:ring-blue-500`}
                            placeholder="Título"
                            value={title}
                            onChange={e => {setTitle(e.target.value)}}
                        />
                        <input
                            className={`py-3 px-3 mt-2 mb-3 focus:ring-2 focus:ring-blue-500`}
                            placeholder="Escritor"
                            value={writer}
                            onChange={e => {setWriter(e.target.value)}}
                        />
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={e => setEditorState(e)}
                        />
                        <button className="button w-full py-2 mt-4 mb-4 rounded-md text-white font-bold bg-green-500" type="submit">Publicar postagem</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
