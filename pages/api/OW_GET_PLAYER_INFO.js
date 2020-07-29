import axios from 'axios';
import nextConnect from 'next-connect';

const handler = nextConnect();

//handler.use(middleware);

handler.post(async (req, res) => {
    console.log("get player info api");
    console.log(req.body);
    let data = {
        "Timestamp": req.body.Timestamp,
        "Seq": req.body.Seq,
        "Token": req.body.Token,
        "CustId": req.body.CustId,
        "GameCode": req.body.GameCode
    };
    let config = {
        method: 'post',
        url: 'http://owapi1.playthefun.com:2111/api/SlotGameDemo/GetPlayerInfo',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    let response = await axios(config);
    console.log("response");
    console.log(response.data);
    res.json(response.data);
});

export default handler;
