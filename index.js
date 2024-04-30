import express from "express";
import bodyParser from "body-parser";
import dataStore from "nedb";
import request from "request";

let app = express();

let db_AFI = new dataStore();
let db_AFI2 = new dataStore();
let db_PHT = new dataStore();
let db_PHT2 = new dataStore();
let db_RSG = new dataStore();
let db_RSG2 = new dataStore();
let db_JPR = new dataStore();
let db_JPR2 = new dataStore();

const PORT = (process.env.PORT || 10000);

import {handler} from "./front/build/handler.js";

import cors from "cors";

app.use(cors());

app.listen(PORT);
app.use(bodyParser.json());


//ALBERTO FRAILE
import {LoadBackendAFI} from "./back/Policy-program-stats/v1/index-AFI.js";
LoadBackendAFI(app,db_AFI);

import {LoadBackendAFI2} from "./back/Policy-program-stats/v2/index-AFI.js";
LoadBackendAFI2(app,db_AFI2);

//PEDRO HEREDIA
import {LoadBackendPHT} from "./back/Eu-payment-info/v1/index-PHT.js";
LoadBackendPHT(app,db_PHT);

import {LoadBackendPHT2} from "./back/Eu-payment-info/v2/index-PHT.js";
LoadBackendPHT2(app,db_PHT2);

//RAUL SEQUERA
import {LoadBackendRSGv1} from "./back/Covid-testings/v1/index-RSG.js";
LoadBackendRSGv1(app,db_RSG);

import {LoadBackendRSGv2} from "./back/Covid-testings/v2/index-RSG.js";
LoadBackendRSGv2(app,db_RSG2);

//JOSE MANUEL PEÑA
import {LoadBackendv1JPR} from "./back/Esif-payments/v1/index-JPR.js";
LoadBackendv1JPR(app,db_JPR);

import {LoadBackendv2JPR} from "./back/Esif-payments/v2/index-JPR.js";
LoadBackendv2JPR(app,db_JPR2);


import path from "path";

//proxy JPR
app.use("/proxyJPR", function(req,res){
    var url = "https://sos2324-11.appspot.com/api/v2/structural-payment-data"
    console.log("piped: " + req.url)
    req.pipe(request(url)).pipe(res);
});

app.use(handler);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use("/", express.static("./public"));
console.log(`Server listening on port ${PORT}`);
