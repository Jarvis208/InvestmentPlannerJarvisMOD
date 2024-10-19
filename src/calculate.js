// SIP Corpus Calculation
function calculateSIPCorpus(sipAmount, stepUp, years, returnRate) {
    let totalCorpus = 0;
    let monthlyReturn = (1 + returnRate / 12);
    
    for (let year = 0; year < years; year++) {
        let annualSIP = sipAmount + (stepUp * year);
        for (let month = 0; month < 12; month++) {
            let monthsRemaining = (years - year) * 12 - month;
            totalCorpus += annualSIP * Math.pow(monthlyReturn, monthsRemaining);
        }
    }
    return totalCorpus;
}

// Lump Sum Corpus Calculation
function calculateLumpSumCorpus(lumpSum, years, returnRate) {
    return lumpSum * Math.pow((1 + returnRate), years);
}

// SWP Calculation
function calculateSWP(corpus, survivalAmount, inflationRate, years, returnRate) {
    let monthlyReturn = returnRate / 12;
    let monthlyInflation = Math.pow(1 + inflationRate, 1 / 12) - 1;
    let details = [];
    let yearlySummary = [];

    for (let year = 0; year < years; year++) {
        let yearCorpusStart = corpus;
        let totalYearlyWithdrawal = 0;
        for (let month = 0; month < 12; month++) {
            let adjustedSurvivalAmount = survivalAmount * Math.pow((1 + monthlyInflation), (year * 12 + month));
            totalYearlyWithdrawal += adjustedSurvivalAmount;
            corpus -= adjustedSurvivalAmount;
            corpus += corpus * monthlyReturn;

            if (corpus <= 0) {
                return {status: "Not Sustainable", details: details, yearDepleted: year + 1, monthDepleted: month + 1};
            }
        }
        yearlySummary.push({
            year: year + 1,
            totalWithdrawal: totalYearlyWithdrawal,
            startCorpus: yearCorpusStart,
            endCorpus: corpus
        });
    }
    return {status: "Sustainable", remainingCorpus: corpus, yearlySummary: yearlySummary};
}
