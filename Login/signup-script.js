const container = document.querySelector('.container-login'); // Corrected selector
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

// Global userDetails array to store user information
let userDetails = [];

// Function to handle the switching between login and registration forms
RegisterLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    container.classList.add('active'); // Add 'active' class to switch to registration form
});

LoginLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    container.classList.remove('active'); // Remove 'active' class to switch to login form
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
    const username = document.getElementById('register-username').value; // Username
    const email = document.getElementById('register-email').value; // Email
    const password = document.getElementById('register-password').value; // Password

    // Validate user inputs
    if (!username || !email || !password) {
        alert('Please fill in all fields'); // Alert if any field is empty
        return; // Stop execution if validation fails
    }

    // Add the new user details to the array
    userDetails.push({
        username: username,
        email: email,
        password: password
    });

    // Prepare the text file content
    let fileContent = '';
    userDetails.forEach((user) => {
        fileContent += `${user.username}\n${user.email}\n${user.password}\n`;
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

// Add an event listener to the register form to trigger the downloadUserDetails function on submit
const registerForm = document.getElementById('register-form'); // Ensure this matches your HTML
registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    downloadUserDetails(); // Call the function to download user details
});
