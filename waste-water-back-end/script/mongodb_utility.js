const { MongoClient } = require('mongodb');

async function registerData(solanaAddress, uploadDate, typeImage, pdfBase64) {
    let client = await connect();
    var dbo = client.db("wastewater");
    let collection = dbo.collection("bill");
    let billTemplate = createObj(solanaAddress, uploadDate, typeImage, pdfBase64);
    await collection.insertOne(billTemplate, function(err, res) {
        if(err) throw err;
            console.log("Inserted data");
        });
    client.close();
}

async function connect() {
    const uri = process.env.MONGODB_URL;
    return MongoClient.connect(uri);
}

function createObj(solanaAddress, uploadDate, typeImage, pdfBase64) {
    // Status: 
    // 0 = To process
    // 1 = Processed
    var obj = { address: solanaAddress, uploadDate: uploadDate, typeImage: typeImage, pdfBase64: pdfBase64, status: 0, fiscalCode: null, idCustomer: null, tot: null, period: null };
    return obj;
}

module.exports = {
    registerData: registerData
}