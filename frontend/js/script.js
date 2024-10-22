// Function to toggle between login, sign up, and admin login forms
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    const tabLinks = document.getElementsByClassName("tab-link");

    // Hide all tab contents and remove 'active' class
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Remove 'active' class from all tab links
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the selected tab content and add 'active' class
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// By default, show the login tab
document.getElementById("login").style.display = "block";

// Function to toggle password visibility in input fields
function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// Function to handle user login form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const loginData = { email, password };

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful");

            // Save the token in localStorage
            localStorage.setItem('token', data.token);

            // Fetch the latest user data
            const userResponse = await fetch('http://localhost:5000/api/auth/me', { // Update to your user data endpoint
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}` // Send the token to authenticate the request
                }
            });

            const userData = await userResponse.json();

            if (userResponse.ok) {
                // Save the user data in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                
                // Redirect to client page after login
                window.location.href = "/client.html"; 
            } else {
                document.getElementById("loginError").innerText = userData.message || "Failed to fetch user data!";
            }
        } else {
            document.getElementById("loginError").innerText = data.message || "Invalid credentials!";
        }
    } catch (error) {
        document.getElementById("loginError").innerText = "An error occurred during login!";
        console.error("Login Error:", error);
    }
}

// Function to handle signup form submission
async function handleSignup(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const signupData = { name, email, password };

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sign up successful! Please log in.");
            // Redirect to the login page after successful signup
            window.location.href = "/index.html"; 
        } else {
            document.getElementById("signupError").innerText = data.message || "Sign up failed!";
        }
    } catch (error) {
        document.getElementById("signupError").innerText = "An error occurred during sign up!";
        console.error("Signup Error:", error);
    }
}

// Function to handle admin login form submission
async function handleAdminLogin(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    const adminLoginData = { email, password };

    try {
        const response = await fetch('http://localhost:5000/api/auth/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminLoginData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Admin login successful");

            // Save the token and user data in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = "/admin.html"; // Redirect to admin dashboard after login
        } else {
            document.getElementById("adminLoginError").innerText = data.message || "Invalid credentials!";
        }
    } catch (error) {
        document.getElementById("adminLoginError").innerText = "An error occurred during admin login!";
        console.error("Admin Login Error:", error);
    }
}

// By default, open the login form when the page loads
window.onload = function() {
    openTab(event, 'login');
}
