// Switch between tabs
function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach((tabContent) => {
        tabContent.classList.remove('active');
    });

    buttons.forEach((button) => {
        button.classList.remove('active');
    });

    document.getElementById(tab).classList.add('active');
    const activeButton = [...buttons].find((button) => {
        const buttonText = button.innerText.toLowerCase().replace(/\s+/g, '');
        const tabName = tab.toLowerCase();
        return buttonText.includes(tabName);
    });
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// DPS Calculation
function calculateDPS() {
    let monthlyDeposit = parseFloat(document.getElementById("dpsMonthlyDeposit").value);
    let interestRate = parseFloat(document.getElementById("dpsInterestRate").value) / 100;
    let duration = parseFloat(document.getElementById("dpsDuration").value);
    let taxRate = parseFloat(document.getElementById("dpsTaxRate").value) / 100;

    if (isNaN(monthlyDeposit) || isNaN(interestRate) || isNaN(duration)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let months = duration * 12;
    let totalAmount = 0;
    let totalDeposited = monthlyDeposit * months;

    let monthlyInterestRate = interestRate / 12;

    for (let i = 0; i < months; i++) {
        totalAmount += monthlyDeposit * Math.pow(1 + monthlyInterestRate, months - i);
    }

    let interestEarned = totalAmount - totalDeposited;
    let taxDeduction = interestEarned * taxRate;
    let netAmount = totalAmount - taxDeduction;

    let realEffectiveRate = calculateRealEffectiveRate(monthlyDeposit, duration, netAmount, totalDeposited);

    document.getElementById("finalBalance").innerText = totalAmount.toFixed(2);
    document.getElementById("amountDeposited").innerText = totalDeposited.toFixed(2);
    document.getElementById("interestEarned").innerText = interestEarned.toFixed(2);
    document.getElementById("taxDeduction").innerText = taxDeduction.toFixed(2);
    document.getElementById("taxRateValue").innerText = (taxRate * 100).toFixed(0);
    document.getElementById("netAmount").innerText = netAmount.toFixed(2);
    document.getElementById("realEffectiveRate").innerText = realEffectiveRate.toFixed(2);

    document.getElementById("dpsResult").classList.remove("hidden");
}

function calculateRealEffectiveRate(monthlyDeposit, years, netAmount, totalDeposited) {
    let months = years * 12;
    let targetAmount = netAmount;
    
    let low = 0;
    let high = 0.5;
    let precision = 0.0001;
    let mid;
    
    for (let i = 0; i < 100; i++) {
        mid = (low + high) / 2;
        let calculatedAmount = calculateFutureValue(monthlyDeposit, mid, years);
        
        if (Math.abs(calculatedAmount - targetAmount) < precision) {
            break;
        } else if (calculatedAmount < targetAmount) {
            low = mid;
        } else {
            high = mid;
        }
    }
    
    return mid * 100;
}

function calculateFutureValue(monthlyDeposit, annualRate, years) {
    let months = years * 12;
    let monthlyRate = annualRate / 12;
    let futureValue = 0;
    
    for (let i = 0; i < months; i++) {
        futureValue += monthlyDeposit * Math.pow(1 + monthlyRate, months - i);
    }
    
    return futureValue;
}

// FD Calculation
function calculateFD() {
    let depositAmount = parseFloat(document.getElementById("fdDepositAmount").value);
    let interestRate = parseFloat(document.getElementById("fdInterestRate").value) / 100;
    let term = parseFloat(document.getElementById("fdTerm").value);
    let taxRate = parseFloat(document.getElementById("fdTaxRate").value) / 100;

    if (isNaN(depositAmount) || isNaN(interestRate) || isNaN(term)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let maturityValue = depositAmount * Math.pow(1 + interestRate / 12, term);
    let totalInterest = maturityValue - depositAmount;
    let taxDeduction = totalInterest * taxRate;
    let netAmount = maturityValue - taxDeduction;

    let realEffectiveRate = calculateFDRealEffectiveRate(depositAmount, term, netAmount);

    document.getElementById("fdMaturityValue").innerText = maturityValue.toFixed(2);
    document.getElementById("fdTotalInterest").innerText = totalInterest.toFixed(2);
    document.getElementById("fdTaxDeduction").innerText = taxDeduction.toFixed(2);
    document.getElementById("fdTaxRateValue").innerText = (taxRate * 100).toFixed(0);
    document.getElementById("fdNetAmount").innerText = netAmount.toFixed(2);
    document.getElementById("fdRealEffectiveRate").innerText = realEffectiveRate.toFixed(2);

    document.getElementById("fdResult").classList.remove("hidden");
}

function calculateFDRealEffectiveRate(depositAmount, months, netAmount) {
    let effectiveRate = Math.pow(netAmount / depositAmount, 12 / months) - 1;
    return effectiveRate * 100;
}

// Loan Calculation
function calculateLoan() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let interestRate = parseFloat(document.getElementById("loanInterestRate").value) / 100;
    let months = parseFloat(document.getElementById("loanMonths").value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(months)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let monthlyRate = interestRate / 12;
    let emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    let totalPayable = emi * months;
    let totalInterest = totalPayable - loanAmount;

    document.getElementById("loanPrincipalAmount").innerText = loanAmount.toFixed(2);
    document.getElementById("loanInterestAmount").innerText = totalInterest.toFixed(2);
    document.getElementById("loanTotalPayable").innerText = totalPayable.toFixed(2);
    document.getElementById("loanMonthlyEMI").innerText = emi.toFixed(2);

    document.getElementById("loanResult").classList.remove("hidden");
}

// Percentage Calculations
function calculatePercentage() {
    let value = parseFloat(document.getElementById("percentageValue").value);
    let percentage = parseFloat(document.getElementById("percentageRate").value);

    if (isNaN(value) || isNaN(percentage)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let result = (percentage / 100) * value;
    document.getElementById("percentageOfValue").innerText = result.toFixed(2);
    document.getElementById("percentageResult").classList.remove("hidden");
}

function calculatePercentageOfNumber() {
    let part = parseFloat(document.getElementById("numberPart").value);
    let total = parseFloat(document.getElementById("numberTotal").value);

    if (isNaN(part) || isNaN(total) || total === 0) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let result = (part / total) * 100;
    document.getElementById("percentageOfNumber").innerText = result.toFixed(2);
    document.getElementById("percentageOfNumberResult").classList.remove("hidden");
}

function calculateChange() {
    let initial = parseFloat(document.getElementById("initialValue").value);
    let final = parseFloat(document.getElementById("finalValue").value);

    if (isNaN(initial) || isNaN(final)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let change = ((final - initial) / initial) * 100;
    document.getElementById("changeValue").innerText = change.toFixed(2);
    document.getElementById("changeResult").classList.remove("hidden");
}

// Age Calculation
function calculateAge() {
    let birthDate = document.getElementById("birthDate").value;
    let currentDate = document.getElementById("currentDate").value;

    if (!birthDate) {
        alert("Please select your birth date.");
        return;
    }

    if (!currentDate) {
        currentDate = new Date().toISOString().split('T')[0];
        document.getElementById("currentDate").value = currentDate;
    }

    let birth = new Date(birthDate);
    let current = new Date(currentDate);

    if (birth > current) {
        alert("Birth date cannot be in the future.");
        return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        let prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    let totalDays = Math.floor((current - birth) / (1000 * 60 * 60 * 24));
    let totalWeeks = Math.floor(totalDays / 7);
    let totalMonths = years * 12 + months;

    let nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < current) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    let daysToNextBirthday = Math.ceil((nextBirthday - current) / (1000 * 60 * 60 * 24));

    document.getElementById("ageYears").innerText = years;
    document.getElementById("ageMonths").innerText = months;
    document.getElementById("ageDays").innerText = days;
    document.getElementById("totalMonths").innerText = totalMonths;
    document.getElementById("totalWeeks").innerText = totalWeeks;
    document.getElementById("totalDays").innerText = totalDays;
    document.getElementById("nextBirthday").innerText = daysToNextBirthday;

    document.getElementById("ageResult").classList.remove("hidden");
}

// Stock Dividend Calculation - Using exact same logic from working code
function calculateDividend() {
    // Get input values
    const stocks = parseFloat(document.getElementById('stocks').value);
    const dividend = parseFloat(document.getElementById('dividend').value);
    
    // Validate inputs
    if (isNaN(stocks) || isNaN(dividend)) {
        alert('Please enter valid numbers for both fields');
        return;
    }
    
    // Calculate - Using the exact same formula from working code
    const grossDividend = (stocks * 10) * dividend / 100;
    const tax = grossDividend * 0.10;
    const netDividend = grossDividend - tax;
    
    // Display results
    document.getElementById('grossDividend').textContent = grossDividend.toFixed(2);
    document.getElementById('dividendTax').textContent = tax.toFixed(2);
    document.getElementById('netDividend').textContent = netDividend.toFixed(2);
    
    // Show result section
    document.getElementById('dividendResult').classList.remove("hidden");
}