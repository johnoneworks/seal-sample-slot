import { Component } from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Error from './_error';

const USER_API_URL = "https://api.github.com/users/reedbarger";

export default class Index extends Component {
    state = {
        user: null
    };

    static async getInitialProps() {
        const res = await fetch(USER_API_URL);
        const statusCode = res.status > 200 ? res.status : false;
        const data = await res.json();
        return {
            username: data.name,
            statusCode,
        }
    }

    render() {
        const { username, statusCode } = this.props;
        if (statusCode) {
            return <Error statusCode={statusCode} />
        }

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
