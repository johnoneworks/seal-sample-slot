import Link from "next/link";
import { Component } from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from "../components/Layout";

const USER_API_URL = "https://api.github.com/users/reedbarger";

export default class Index extends Component {
    state = {
        user: null
    };

    static async getInitialProps() {
        const res = await fetch(USER_API_URL);
        const data = await res.json();
        return { username: "user" }
    }

    /*
    componentDidMount() {
        fetch(USER_API_URL)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    username: data.name
                });
            });
    }
    */

    render() {
        return (
            <Layout title="Lobby">
                <p>
                    Welcome to the SEAL Sample Vendor!
                </p>
                <ul>
                    <li key={this.props.username}>USERNAME: {this.props.username}</li>
                </ul>
            </Layout>
        )
    }
}
