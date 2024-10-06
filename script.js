document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transferForm');
    const transactionTypeRadios = document.querySelectorAll('input[name="transactionType"]');

    transactionTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleFields);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const data = gatherFormData(); // Gather form data

        await submitTransferData(data); // Submit the data to Google Apps Script
    });
});

// Function to toggle visibility of input fields based on transaction type
function toggleFields() {
    const transferFields = document.getElementById('transferFields');
    const loanToBuyFields = document.getElementById('loanToBuyFields');
    const loanFields = document.getElementById('loanFields');

    const selectedValue = document.querySelector('input[name="transactionType"]:checked').value;

    transferFields.style.display = 'none';
    loanToBuyFields.style.display = 'none';
    loanFields.style.display = 'none';

    if (selectedValue === 'Transfer') {
        transferFields.style.display = 'block';
    } else if (selectedValue === 'Loan to Buy') {
        loanToBuyFields.style.display = 'block';
    } else if (selectedValue === 'Loan') {
        loanFields.style.display = 'block';
    }
}

// Function to gather data from the form
function gatherFormData() {
    const data = {
        date: document.getElementById('date').value,
        transferFee: document.getElementById('transferFee').value,
        playerName: document.getElementById('playerName').value,
        playerAge: document.getElementById('playerAge').value,
        nationality: document.getElementById('nationality').value,
        overallRating: document.getElementById('overallRating').value,
        feeIn: document.getElementById('feeIn').value,
        yearsAtClub: document.getElementById('yearsAtClub').value,
        overallGrowth: document.getElementById('overallGrowth').value,
        clubName: document.getElementById('clubName').value,
        clubNation: document.getElementById('clubNation').value,
        clubTier: document.getElementById('clubTier').value,
        loanLength: document.querySelector('select#loanLength') ? document.getElementById('loanLength').value : '',
        contractRemaining: document.querySelector('input#contractRemaining') ? document.getElementById('contractRemaining').value : '',
        wage: document.querySelector('input#wage') ? document.getElementById('wage').value : ''
    };

    return data; // Return the collected data
}

// Function to submit data to Google Apps Script
async function submitTransferData(data) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz7mAtC_uEvvmtpqThcoq9W0xGRS8afebHBaIML1Gl6lxe7mx3SeHguk2sNf433NfEq/exec', {
            method: 'POST', // Make sure to use POST method
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(data) // Convert data object to JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json(); // Parse JSON response
        alert('Data submitted successfully!'); // Notify user of success
        console.log('Success:', result); // Log success result
    } catch (error) {
        alert('There was an error submitting the data: ' + error.message); // Notify user of error
        console.error('Error:', error); // Log the error
    }
}