import React, {Component} from 'react';

import InfiniteScroll from "react-infinite-scroller";
import Loader from "react-loader-spinner";

import api from '../../services/api';
import Header from '../../components/Header';
import Post from '../../components/Post'

import './styles.css';
import {PlusCircleIcon} from "@heroicons/react/solid";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            page: 1,
            showSendText: false
        }
    }

    handlePosts = (event) => {
        api.get(`posts/${this.state.page}`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => {
            this.setState({
                posts: [].concat(this.state.posts, response.data),
                page: this.state.page + 1
            })
            console.log(response);
        });
    };

    render() {
        const token = localStorage.getItem('id');

        return (
            <div name="Home">
                <Header title="A Última Página"/>
                <div id="body-container" className="grid grid-cols-5 gap-4 px-8 py-8">
                    <div id="posts-container" className="col-start-2 col-span-3">
                        <InfiniteScroll
                            loadMore={this.handlePosts}
                            hasMore={true}
                            loader={<Loader type="ThreeDots" color="#60A5FA" height={80} width={80}/>}
                            useWindow={true}
                        >
                            <ul>
                                {this.state.posts.map((result, index) => (
                                    <Post key={index} data={result}/>
                                ))}
                            </ul>
                        </InfiniteScroll>
                    </div>
                    <div>
                        <div className="fixed flex bottom-0 right-0 items-center">
                            <div className={`mb-4 mr-1 font-semibold text-2xl text-indigo-400 ${!this.state.showSendText && "hidden"}`}>
                                Enviar texto
                            </div>
                            {(token && token !== 'undefined') ? (
                                <PlusCircleIcon
                                    onMouseOver={e => this.setState({showSendText : true})}
                                    onMouseOut={e => this.setState({showSendText : false})}
                                    className="h-20 w-20 mb-4 mr-4 text-indigo-500 hover:text-indigo-800 cursor-pointer" />
                            ) : ("")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;