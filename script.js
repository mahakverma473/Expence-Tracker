const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


let transactions = [];

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value.trim(),
            amount: +amount.value.trim()
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();

        // Clear the input fields
        text.value = "";
        amount.value = "";
    }
}

// Generate a random ID for each transaction
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to the DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    // Add class based on the amount (positive or negative)
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransactions(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// Update balance, income, and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}





// Initialize the app
function init() {
    list.innerHTML = ''; // Clear the list
    transactions.forEach(addTransactionDOM); // Add each transaction to the DOM
    updateValues(); // Update the balance, income, and expense
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init(); // Re-initialize the UI after deleting a transaction
}

init(); 

form.addEventListener("submit", addTransaction);
