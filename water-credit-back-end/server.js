const express = require('express');
const serverStatic = require('serve-static');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('node:fs');
const { PDFDocument, rgb } = require('pdf-lib');
const pdf2base64 = require('pdf-to-base64');
const mongoDbUtility = require('./script/mongodb_utility');
const utility = require('./script/utility');

require('dotenv').config();

const app = express();
app.use(serverStatic(__dirname))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); 
    } else {
        next(); 
    }
});

const port = process.env.APPLICATION_PORT;
const fullDomain = process.env.ENDPOINT.concat(':').concat(process.env.APPLICATION_PORT);
const pyFullDomain = process.env.ENDPOINT_PY.concat(':').concat(process.env.PY_PORT);

app.listen(port, () => {
    console.log("Application started at: " + fullDomain);
});

app.post('/uploadImage', async function(req, res) {
    let solanaAddress = req.body.address;
    let uploadDateParam = req.body.uploadDate;
    let typeImageParam = req.body.typeImage;
    let imageParam = req.body.image;
    try {
        let buffer = Buffer.from(imageParam, "base64");
        utility.existOrCreateFolder("./temp");
        fs.writeFile('./temp/bill_image.jpg', buffer, (err) => {
            if (err) {
                throw new Error("Image didn't write correctly!");
            } 
            console.log("File written successfully");
        });
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 400]);
        const imageEmbed = await pdfDoc.embedJpg(buffer);
        const { width, height } = imageEmbed.scaleToFit(page.getWidth(), page.getHeight(),);
        page.drawImage(imageEmbed, {
            x: page.getWidth() / 2 - width / 2, 
            y: page.getHeight() / 2 - height / 2, 
            width,
            height,
            color: rgb(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        await fs.promises.writeFile('./temp/output.pdf', pdfBytes);
        let base64PDFString = await pdf2base64('./temp/output.pdf');
        fs.unlinkSync('./temp/bill_image.jpg');
        fs.unlinkSync('./temp/output.pdf');
        let idElement = await mongoDbUtility.registerData(solanaAddress, uploadDateParam, typeImageParam, base64PDFString);
        res.status(200).json({ status: 'success', id: idElement });
    } catch(exception) {
        console.error("[uploadImage] Error message: " + error);
        res.status(200).json({ status: 'error' });
    }
});

app.post('/processData', async function(req, res) {
    try {
        let data = { "id" : req.body.id };
        await fetch(pyFullDomain.concat("/extractData"),
         { method: "POST", mode: "cors", cache: "no-cache", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }
        ).then(async(response) => {
            let responseBody = await response.json();
            if (responseBody.status == 'error') {
                throw new Error();
            }
        });
        res.status(200).json({ status: 'success' });
    } catch(error) {
        console.error("[processData] Error message: " + error);
        res.status(500).json({ status: 'error' });
    }
});

app.post('/calculateToken', async function(req, res) {
    try {
        let addressSolana = req.body.address;
        let elements = await mongoDbUtility.findElements(addressSolana);
        let billAmounts = [];
        for(let i = 0; i < elements.length; i++) {
            billAmounts.push(parseFloat(elements[i].tot));
        }
        let tokenAmount = utility.calculateTokenAmount(billAmounts);
        let dataATA = { "address": addressSolana };
        let responseATA = await fetch(pyFullDomain.concat("/createAssociatedTokenAccount"), 
                                        { method: "POST", mode: "cors", cache: "no-cache", headers: { "Content-Type": "application/json"}, body: JSON.stringify(dataATA) });
        let responseATAParsed = await responseATA.json();
        if (responseATAParsed.status == 'error') {
            throw new Error("Error to create associated token account");
        }
        let dataMint = { "address": addressSolana, "amount": tokenAmount };
        let responseMintToken = await fetch(pyFullDomain.concat("/mintToken"), 
                                        { method: "POST", mode: 'cors', cache: "no-cache", headers: { "Content-Type": "application/json"}, body: JSON.stringify(dataMint) });
        let responseMintTokenParsed = await responseMintToken.json();
        if (responseMintTokenParsed.status == 'error') {
            throw new Error("Error to mint token into account");
        }
        res.status(200).json({ status: 'success', amount:  tokenAmount });
    } catch(error) {
        console.error("[calculateToken] Error message: " + error);
        res.status(500).json({ status: 'error' });
    }
});