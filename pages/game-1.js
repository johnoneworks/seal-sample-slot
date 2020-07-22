import { Component } from "react";

import Layout from '../components/Layout';
import Error from './_error';

export default class Game1 extends Component {
    state = {
        username: "John",
        balance: 200,
        slot1: "?",
        slot2: "?",
        slot3: "?"
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    handleSpin = () => {
        let slot1 = this.getRandomInt(0, 2);
        let slot2 = this.getRandomInt(0, 2);
        let slot3 = this.getRandomInt(0, 2);
        this.setState({
            slot1: (slot1 % 2 === 0) ? "X" : "O",
            slot2: (slot2 % 2 === 0) ? "X" : "O",
            slot3: (slot3 % 2 === 0) ? "X" : "O",
            balance: this.state.balance - 10,
        });
    }

    render() {
        return (
            <Layout title="Game 1">
                <p>A Sample Slot Game</p>
                <img src="/static/game1-logo.jpg" alt="Game logo" height="200px" />
                <br />
                <h2>
                    Username: {this.state.username}
                    <br />
                    Remaining Balance: {this.state.balance} (all bets are 10 for now)
                </h2>
                <button onClick={this.handleSpin}>
                    SPIN
                </button>
                <br />
                <h3>
                    {this.state.slot1} - {this.state.slot2} - {this.state.slot3}
                </h3>
                {// Jackpot
                    (this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3 && this.state.slot3 === "O") &&
                    <span>JACKPOT!</span>
                }
                {// Regular Winner
                    (this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3 && this.state.slot3 === "X") &&
                    <span>Regular Winner</span>
                }
                {// Loser...
                    (!(this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3 && this.state.slot3 === "O") && !(this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3 && this.state.slot3 === "X")) &&
                    <span>Try Again</span>
                }
            </Layout>
        );
    }
}