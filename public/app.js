document.getElementById('investment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const investmentType = document.getElementById('investment-type').value;
    const sipAmount = document.getElementById('sip-amount').value;
    const stepUp = document.getElementById('step-up').value;
    const investmentYears = document.getElementById('investment-years').value;
    const lumpSumAmount = document.getElementById('lump-sum-amount').value;
    const inflationRate = document.getElementById('inflation-rate').value;
    const swpYears = document.getElementById('swp-years').value;

    const queryParams = new URLSearchParams({
        investmentType,
        sipAmount,
        stepUp,
        investmentYears,
        lumpSumAmount,
        inflationRate,
        swpYears
    }).toString();

    window.location.href = `results.html?${queryParams}`;
});
