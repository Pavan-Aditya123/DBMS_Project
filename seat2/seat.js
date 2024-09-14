let seats = document.querySelector(".all-seats");

// Function to get a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Create an array to keep track of booked seats
let bookedSeats = new Set();

// Ensure exactly 25 seats are booked
while (bookedSeats.size < 25) {
    bookedSeats.add(getRandomInt(0, 60));
}

// Create 60 seats, marking 25 as booked and the rest as available
for (let i = 0; i < 60; i++) {
    let isBooked = bookedSeats.has(i);
    let iconClass = isBooked ? "fas fa-couch booked" : "fas fa-couch available";

    seats.insertAdjacentHTML(
        "beforeend",
        `<i class="${iconClass}" data-id="s${i + 1}"></i>`
    );
}

// Handle click events for seats
let tickets = seats.querySelectorAll("i");
tickets.forEach((ticket) => {
    ticket.addEventListener("click", () => {
        if (ticket.classList.contains("booked")) {
            return; // Do nothing if the seat is booked
        }

        let amount = document.querySelector(".amount").innerHTML;
        let count = document.querySelector(".count").innerHTML;

        amount = Number(amount);
        count = Number(count);

        // Toggle seat selection
        if (ticket.classList.contains("selected")) {
            count -= 1;
            amount -= 200;
            ticket.classList.remove("selected");
            ticket.style.color = "rgb(233, 233, 233)"; // Set back to available color
        } else {
            count += 1;
            amount += 200;
            ticket.classList.add("selected");
            ticket.style.color = "rgb(47, 163, 255)"; // Set color for selected
        }

        document.querySelector(".amount").innerHTML = amount;
        document.querySelector(".count").innerHTML = count;
    });
});
