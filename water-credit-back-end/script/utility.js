const fs = require('node:fs');
const { CALCULATE_TOKEN_AMOUNT_CODE_ERROR } = require('./error_code');

function calculateTokenAmount(firstBillAmount, secondBillAmount) {
    let difference = parseFloat(firstBillAmount) - parseFloat(secondBillAmount);
    if(difference > 0) {
        let total = (difference * 0.05).toFixed(0);
        return total;
    } else {
        console.log(Date.now() + " - [calculateTokenAmount] Difference less than zero");
        throw new Error(CALCULATE_TOKEN_AMOUNT_CODE_ERROR);
    }
}

function existOrCreateFolder(path) {
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function getCodeFromErrorMessage(errorMessage) {
    const regex = /Error:\s*(\d+)/;
    const match = errorMessage.match(regex);
    if(match) {
        let errorCode = match[1];
        return errorCode;
    }
    return "Generic error";
}

module.exports = {
    calculateTokenAmount: calculateTokenAmount,
    existOrCreateFolder: existOrCreateFolder,
    getCodeFromErrorMessage: getCodeFromErrorMessage
}