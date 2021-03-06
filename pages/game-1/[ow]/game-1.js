import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';


import Layout from '../../../components/Layout';

/** 
 * 0: mock mode
 * 1: actual OW API call, but does a login call that mocks OW side behavior
 * */ 
const MODE = 1; 


const Game1 = () => {
    const router = useRouter();
    const { CustId, Token } = router.query;

    let [balance, setBalance] = useState(0);
    let [seq, setSeq] = useState("");
    let [token, setToken] = useState(Token);
    let [loginSuccess, setLoginSuccess] = useState(false);
    let [playerInfo, setPlayerInfo] = useState({});
    useEffect(() => {
        async function getPlayerInfoWrapper() {
            switch (MODE) {
                case 0: // mock the return data from OW
                    setPlayerInfo({
                        CustId: 17854493,
                        MinBet: 10,
                        MaxBet: 2500,
                        CurrencyId: 16,
                        SiteId: 4100200,
                        UserName: "twpgmsobichen"
                    });
                    setBalance(3000);
                    break;
                case 1:
                    const mockLoginConfig = {
                        method: 'post',
                        url: '/api/OW_LOGIN',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    };
                    let mockLoginResponse = await axios(mockLoginConfig);
                    console.log("mockLoginResponse");
                    console.log(mockLoginResponse.data);
                    setToken(mockLoginResponse.data.Token);
                    setLoginSuccess(true);

                    let timeStamp = moment().toJSON();
                    //let token = router.query.Token;
                    let custId = router.query.CustId;
                    console.log(timeStamp);
                    console.log(token);
                    console.log(custId);
                    let data = {
                        "Timestamp": timeStamp,
                        "Token": token,
                        "CustId": custId,
                        "Seq": uuidv4(),
                        "GameCode": "SAMPLE_GAME_1"
                    };
                    let gameInfoConfig = {
                        method: 'post',
                        url: '/api/OW_GET_PLAYER_INFO',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    let gameInfoResponse = await axios(gameInfoConfig);
                    console.log("gameInfoResponse");
                    console.log(gameInfoResponse.data);
                    setPlayerInfo(gameInfoResponse.data);
                    setBalance(gameInfoResponse.data.Balance);
                    setSeq(data.Seq);
                    break;
                default:
                    break;
            }
        }
        getPlayerInfoWrapper();
    }, [loginSuccess]);


    let [slot1, setSlot1] = useState("?");
    let [slot2, setSlot2] = useState("?");
    let [slot3, setSlot3] = useState("?");


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function handleSpin() {
        setSlot1((getRandomInt(0, 2) === 0) ? "X" : "O");
        setSlot2((getRandomInt(0, 2) === 0) ? "X" : "O");
        setSlot3((getRandomInt(0, 2) === 0) ? "X" : "O");
        setBalance(balance - 10);
    }

    return (
        <Layout title="Game 1">
            <p>A Sample Slot Game</p>
            <img src="/static/game1-logo.jpg" alt="Game logo" height="200px" />
            <ul>
                <li>
                    <strong>QueryParams:</strong>
                    <ul>
                        <li>
                            CustId - {CustId ? CustId : "null"}
                        </li>
                        <li>
                            Token - {Token ? Token : "null"}
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>API Response:</strong>
                    <ul>
                        <li>
                            Timestamp - {playerInfo.Timestamp}
                        </li>
                        <li>
                            Seq - {playerInfo.Seq}
                        </li>
                        <li>
                            ErrorCode - {playerInfo.ErrorCode}
                        </li>
                        <li>
                            ErrorDescription - {playerInfo.ErrorDescription}
                        </li>
                        <li>
                            MinBet - {playerInfo.MinBet}
                        </li>
                        <li>
                            MaxBet - {playerInfo.MaxBet}
                        </li>
                        <li>
                            SiteId - {playerInfo.SiteId}
                        </li>
                        <li>
                            Username - {playerInfo.UserName}
                        </li>
                        <li>
                            Balance - {playerInfo.Balance}
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Game Client Side:</strong>
                    <ul>
                        <li>
                            Balance - {balance}
                        </li>
                        <li>
                            Seq - {seq}
                        </li>
                    </ul>

                </li>
            </ul>

            <br />

            <button onClick={handleSpin}>
                SPIN
            </button>
            <br />
            <h3>
                {slot1} - {slot2} - {slot3}
            </h3>
            {// Jackpot
                (slot1 === slot2 && slot2 === slot3 && slot3 === "O") &&
                <span>JACKPOT!</span>
            }
            {// Regular Winner
                (slot1 === slot2 && slot2 === slot3 && slot3 === "X") &&
                <span>Regular Winner</span>
            }
            {// Loser...
                (!(slot1 === slot2 && slot2 === slot3 && slot3 === "O") && !(slot1 === slot2 && slot2 === slot3 && slot3 === "X")) &&
                <span>Try Again</span>
            }
        </Layout>
    );
}

export default Game1;