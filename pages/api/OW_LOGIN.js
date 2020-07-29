import axios from 'axios';
import nextConnect from 'next-connect';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const handler = nextConnect();

handler.post(async (req, res) => {
    console.log("login api");
    let data = {
        "Timestamp": moment().toJSON(),
        "Seq": uuidv4(),
        "Token": null,
        "CustId": 17854493, // hardcoded, probably should be in .env
        "CustName": "twpggmsobichen", // hardcoded, probably should be in .env
        "CurrencyName": "UUS", // hardcoded, probably should be in .env
        "CurrencyId": 20, // hardcoded, probably should be in .env
        "SiteName": "nv88", // hardcoded, probably should be in .env
        "SiteId": "4100200", // hardcoded, probably should be in .env
        "Platform": "D", // hardcoded, probably should be in .env
        "BetFrom": "i" // hardcoded, probably should be in .env
    };
    let config = {
        method: 'post',
        url: 'http://owapi1.playthefun.com:2111/api/SlotGameDemoInternal/Login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    let response = await axios(config);
    res.json(response.data);
});

export default handler;