const container = document.querySelector('.container-login');  // Corrected selector
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

// Global userDetails array to store user information
let userDetails = [];

// Function to handle the switching between login and registration forms
RegisterLink.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent default anchor behavior
    container.classList.add('active');  // Add 'active' class to switch to registration form
});

LoginLink.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent default anchor behavior
    container.classList.remove('active');  // Remove 'active' class to switch to login form
});

// Function to check login credentials
function checkLoginCredentials(email, password) {
    // Iterate through userDetails to find a match
    for (let user of userDetails) {
        if (user.email === email && user.password === password) {
            return true; // Return true if credentials match
        }
    }
    return false; // Return false if no match is found
}

// Handle login form submission
const loginForm = document.querySelector('#login-form'); // Ensure this matches your HTML

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.querySelector('input[type="email"]').value; // Get email input
    const password = document.querySelector('input[type="password"]').value; // Get password input

    console.log("Email:", email); // Debug log
    console.log("Password:", password); // Debug log

    if (checkLoginCredentials(email, password)) {
        console.log("Login successful, redirecting..."); // Debug log
        // Redirect to project page if login is successful
        window.location.href = 'http://127.0.0.1:3000/seat2/project.html';
    } else {
        alert('Invalid email or password'); // Show error if credentials are wrong
    }
});

// Function to download user details when a new user signs up
function downloadUserDetails() {
    // Gather user details from input fields
    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelectorAll('input[type="password"]')[0].value; // New Password
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value; // Confirm Password

    // Add the new user details to the array
    userDetails.push({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    });

    // Prepare the text file content
    let fileContent = '';
    userDetails.forEach((user) => {
        fileContent += `${user.name}\n${user.email}\n${user.password}\n${user.confirmPassword}\n`;
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link to trigger the download
    const a = document.createElement('a');
    a.href = url;

    // Set a custom filename without timestamp
    a.download = 'user_details.txt'; // Custom filename

    document.body.appendChild(a); // Append to body to make it work in Firefox
    a.click();
    document.body.removeChild(a); // Remove it after triggering

    // Clean up
    URL.revokeObjectURL(url);
}

// You might want to call downloadUserDetails() function when a user registers
