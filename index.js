let cool = require("cool-ascii-faces");
let express = require("express")
let app = express();

const data_AFI = require('./index-AFI');
let data_PHT= require('./index-PHT');
let data_RSG= require('./index-RSG');
let data_JPR= require('./index-JPR');


const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/",express.static("./public"));

app.get("/cool",(req ,res)=>{
    res.send(`<html><body><h1>${cool()}</h1></body></html>`)
});
const PORT = (process.env.PORT || 10000);
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}.`);
});

//ALBERTO FRAILE
function mediatotal_amount_committed_to_final_recipientsAT(data) {
    let total = 
    data
        .filter((n) => n.country === "AT")
        .map((n) => parseInt(n.total_amount_committed_to_final_recipients))
        .reduce((a, b) => a + b);
    
    let n = 
    data
        .filter((n) => n.country === "AT").length;
    
    media = total / n
    return media
}

app.get("/samples/AFI", (req,res)=>{
    const result = mediatotal_amount_committed_to_final_recipientsAT(data_AFI); 
    res.send(`<html> <body> <h1> media de total_amount_committed_to_final_recipients:  ${result}</h1> </body> </html>`)
});

//PEDRO HEREDIA
function mediaTotalNetPayments(datos){
    let sol=datos.filter((n)=> n.ms_name==="Greece").map((n)=>n.total_net_payments)
    .reduce((a,b)=>a+b);

    let n=datos.filter((n)=> n.ms_name==="Greece").length;

    media=sol/n

    return media
}

app.get("/samples/PHT", (req,res)=>{
    const result = mediaTotalNetPayments(data_PHT); 
    res.send(`<html> <body> <h1> La media de total_net_payments de Grecia es de: ${result}</h1> </body> </html>`)
});



//RAUL SEQUERA
function mediaNewCases(data, searchString){
    let suma = data.filter((n)=>n.country.match(searchString))
    .map((n)=>n.new_cases).reduce((a, b) => a + b);

    let res = data.filter((n) => n.country === searchString).length;
    
    let media = suma/res;

    return media.toFixed(2);
}



app.get("/samples/RSG", (req,res)=>{
    let city = 'Austria';
    const result = mediaNewCases(data_RSG, city); 
    res.send(`<html> <body> <h1> La media de new_cases de ${city} es de: ${result}</h1> </body> </html>`)
});



//Jose Manuel Peña
function mediaPreFinancing(data,name) {
    let total = 
    data
        .filter((n) => n.ms_name === name)
        .map((n) => n.net_pre_financing)
        .reduce((a, b) => a + b);
    
    let n = 
    data
        .filter((n) => n.ms_name === name).length;
    
    media = total / n
    
    return media;
}

app.get("/samples/JPR", (req,res)=>{
    let pais = "Interreg"
    res.send(`<html> <body> <h1>La media de net pre financing de ${pais} es ${mediaPreFinancing(data_JPR,pais)}.</h1> </body> </html>`)
});
