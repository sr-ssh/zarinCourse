const express = require('express');
const router = express.Router();

const v1 = require('./v1');


const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,          //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
router.use(cors(corsOptions));


router.use('/v1', v1);

module.exports = router;
