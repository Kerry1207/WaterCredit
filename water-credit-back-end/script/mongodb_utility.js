const { MongoClient, ObjectId } = require('mongodb');

async function findElementById(idElement, addressSolana) {
    let client = await connect();
    let dbo = client.db("wastewater");
    let collection = dbo.collection("bill");
    let query = { _id: new ObjectId(idElement), status: 0, processed: 1, address: '' + addressSolana + '' }
    let element = await collection.findOne(query);
    return element;
}

async function registerData(solanaAddress, uploadDate, typeImage, pdfBase64) {
    let client = await connect();
    let dbo = client.db("wastewater");
    let collection = dbo.collection("bill");
    let billTemplate = createObj(solanaAddress, uploadDate, typeImage, pdfBase64);
    let element = await collection.insertOne(billTemplate, function(err, res) {
        if(err) throw err;
            console.log("Inserted data");
        });
    client.close();
    return element.insertedId.toString();
}

async function connect() {
    const uri = process.env.MONGODB_URL;
    return MongoClient.connect(uri);
}

function createObj(solanaAddress, uploadDate, typeImage, pdfBase64) {
    var obj = { address: solanaAddress, uploadDate: uploadDate, typeImage: typeImage, pdfBase64: pdfBase64, status: 0, processed: 0, fiscalCode: null, idCustomer: null, tot: null, period: null };
    return obj;
}

module.exports = {
    registerData: registerData,
    findElementById: findElementById
}