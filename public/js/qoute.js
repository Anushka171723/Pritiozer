
const quotes = [
    '"The quality of your decisions shapes the life you live—embrace wisdom over haste, and let each choice be a step toward the future you desire."',
    '"In the end, we only regret the chances we didn’t take."',
    '"Success is not final, failure is not fatal: It is the courage to continue that counts."',
    '"The future belongs to those who believe in the beauty of their dreams."',
    '"Do not wait to strike till the iron is hot, but make it hot by striking."'
];

let currentQuoteIndex = 0;

// Function to change the quote
function changeQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    document.getElementById('quote').innerText = quotes[currentQuoteIndex];
}

// Update the quote every 3 seconds without reloading the page
setInterval(changeQuote, 3000); // 3000ms = 3 seconds

