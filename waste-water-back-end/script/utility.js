
function calculateTokenAmount(billAmounts) {
    if(billAmounts.length === 0) {
        throw new Error("Amounts are empty");
    }
    let difference = billAmounts[0] - billAmounts[1];
    if(difference > 0) {
        let total = (difference * 0.05).toFixed(0);
        return total;
    } else {
        return 0;
    }
}

module.exports = {
    calculateTokenAmount: calculateTokenAmount
}