const express = require('express');
const serverStatic = require('serve-static');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('node:fs');
const { PDFDocument, rgb } = require('pdf-lib');
const pdf2base64 = require('pdf-to-base64');
const mongoDbUtility = require('./script/mongodb_utility');

require('dotenv').config();

const app = express();
app.use(serverStatic(__dirname))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.APPLICATION_PORT;
const fullDomain = process.env.ENDPOINT.concat(':').concat(process.env.APPLICATION_PORT);

app.listen(port, () => {
    console.log("Application started at: " + fullDomain);
});

app.post('/uploadImage', async function(req, res) {
    let solanaAddress = req.body.address;
    let uploadDateParam = req.body.uploadDate;
    let typeImageParam = req.body.typeImage;
    let imageParam = req.body.image;
    let buffer = Buffer.from(imageParam, "base64");
    fs.writeFile('./temp/bill_image.jpg', buffer, (err) => {
        if (err) {
            throw new Error("Image didn't write correctly!");
        } else {
            console.log("File written successfully");
        }
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
    mongoDbUtility.registerData(solanaAddress, uploadDateParam, typeImageParam, base64PDFString);
    res.status(200).json({ status: 'success' })
});