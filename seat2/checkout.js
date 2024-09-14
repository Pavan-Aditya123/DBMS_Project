document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        const name = document.getElementById("name").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        if (!name || !cardNumber || !expiryDate || !cvv) {
            event.preventDefault(); // Prevent form submission
            alert("Please fill out all fields.");
        } else {
            // Optionally, you can further validate card number, expiry date, and CVV format here
        }
    });
});
