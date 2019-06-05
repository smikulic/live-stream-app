const express = require('express'),
    router = express.Router();
 
router.get('/info',
    (req, res) => {
        if(req.query.streams){
            let streams = JSON.parse(req.query.streams);
            let query = {$or: []};
            for (let stream in streams) {
                if (!streams.hasOwnProperty(stream)) continue;
                query.$or.push({stream_key : stream});
            }

            res.json([{stream_key: '123'}, {stream_key: 'null'}]);
        }
    });
 
module.exports = router;