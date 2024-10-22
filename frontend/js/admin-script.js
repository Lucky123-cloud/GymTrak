// Function to display admin's name
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const adminName = payload.name || payload.email || 'Admin';
            document.getElementById('adminWelcome').textContent = `Welcome back, ${adminName}`;
        } catch (error) {
            console.error("Error decoding token:", error);
            document.getElementById('adminWelcome').textContent = "Welcome back, Admin";
        }
    } else {
        document.getElementById('adminWelcome').textContent = "Welcome back, Admin";
    }
});

// Function to logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = "/index.html"; // Redirect to login page
}

// Function to search a user
async function searchUser() {
    const email = document.getElementById("searchUserEmail").value;
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token, authorization denied');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/users/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("userInfo").innerHTML = `
                <p>Name: ${data.name}</p>
                <p>Email: ${data.email}</p>
                <p>Status: ${data.subscriptionStatus || 'N/A'}</p>
                <p>Subscription: ${data.subscriptionType || 'N/A'}</p>
            `;
            document.getElementById("updateUserId").value = data._id;
            document.getElementById("subscriptionUserId").value = data._id;
        } else {
            document.getElementById("userInfo").innerText = data.message || "User not found!";
        }
    } catch (error) {
        console.error("Search User Error:", error);
    }
}

// Function to send notifications
async function sendNotification(event, userId = null) {
    event.preventDefault();
    const message = document.getElementById("notificationMessage").value;
    const notificationType = document.getElementById("notificationType").value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:5000/api/notifications/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                type: notificationType,
                user: userId || 'all' // 'all' for sending to everyone
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Notification sent successfully!");
        } else {
            alert("Failed to send notification: " + data.message);
        }
    } catch (error) {
        console.error("Send Notification Error:", error);
        alert("Error sending notification");
    }
}


// Function to send workout notifications
async function sendWorkoutNotification(event) {
    event.preventDefault();
    const workoutDetails = document.getElementById("workoutDetails").value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:5000/api/notifications/workout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: workoutDetails,
                user: 'all' // 'all' for sending to everyone
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Workout notification sent successfully!");
        } else {
            alert("Failed to send notification: " + data.message);
        }
    } catch (error) {
        console.error("Send Workout Notification Error:", error);
        alert("Error sending workout notification");
    }
}




// Function to change subscription
async function changeSubscription(event) {
    event.preventDefault();
    const userId = document.getElementById("subscriptionUserId").value;
    const subscriptionStatus = document.getElementById("subscriptionStatus").value;
    const subscriptionType = document.getElementById("subscriptionType").value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}/subscription`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: subscriptionStatus,
                type: subscriptionType
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Subscription updated successfully!");
        } else {
            alert("Failed to update subscription: " + data.message);
        }
    } catch (error) {
        console.error("Change Subscription Error:", error);
        alert("Error changing subscription");
    }
}
