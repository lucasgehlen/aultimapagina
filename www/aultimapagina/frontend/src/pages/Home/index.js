import React, { Component } from 'react';

import InfiniteScroll from "react-infinite-scroller";
import Loader from "react-loader-spinner";

import api from '../../services/api';
import Header from '../../assets/Header';
import Post from '../../assets/Post'

import './styles.css';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            page: 1
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
        return (
            <div name="Home">
                <Header title="A Última Página"/>
                <div className="repo-container flex justify-center mt-8">
                    <InfiniteScroll
                        loadMore={this.handlePosts}
                        hasMore={true}
                        loader={<Loader type="ThreeDots" color="#60A5FA" height={80} width={80}/>}
                        useWindow={true}
                    >
                        <ul>
                            {this.state.posts.map((result, index) => (
                                <Post key={index} title={result.title} text={result.text}/>
                            ))}
                        </ul>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default Home;