document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);

function ageCalculate() {
    const today = new Date();
    const inputDate = new Date(document.getElementById("date-input").value);

    const birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
        alert("Not Born Yet");
        displayResult("-", "-", "-");
        return;
    }

    const { years, months, days } = calculateAge(birthDetails, currentYear, currentMonth, currentDate);
    displayResult(years, months, days);
    playSound();
}

function isFutureDate(birthDetails, currentYear, currentMonth, currentDate) {
    return (
        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear &&
            (birthDetails.month > currentMonth ||
                (birthDetails.month === currentMonth && birthDetails.date > currentDate)))
    );
}

function calculateAge(birthDetails, currentYear, currentMonth, currentDate) {
    let years = currentYear - birthDetails.year;
    let months = 0;
    let days = 0;

    if (currentMonth >= birthDetails.month) {
        months = currentMonth - birthDetails.month;
    } else {
        years--;
        months = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        days = currentDate - birthDetails.date;
    } else {
        months--;
        const lastMonth = (currentMonth === 1) ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (birthDetails.date - currentDate);
    }

    return { years, months, days };
}

function getDaysInMonth(month, year) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
}

function displayResult(years, months, days) {
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
}

function playSound() {
    const sound = new Audio("success-fanfare-trumpets-6185.mp3");
    sound.play().catch(error => console.error('Error playing sound:', error));
}