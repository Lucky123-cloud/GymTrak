// src/js/client-scripts.js
// Assuming user data is stored in localStorage
const user = JSON.parse(localStorage.getItem('user')) || {
    name: "User",
    subscriptionStatus: "Inactive",
    subscriptionType: "Monthly",
    notifications: "No updates, enjoy the silence...",
    workouts: "No workouts, let's get busy...",
};

// Set welcome message and user info
document.getElementById("welcomeMessage").innerText = `Welcome back, ${user.name}, it's time to stay strong!`;
document.getElementById("subscriptionStatus").innerText = user.subscriptionStatus || 'Inactive';
document.getElementById("subscriptionType").innerText = user.subscriptionType || 'Monthly';
document.getElementById("workoutMessage").innerText = user.workouts || "No workouts, let's get busy...";

// Display notifications
const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
const notificationSection = document.getElementById("notificationMessage");
notificationSection.innerHTML = notifications.length > 0
    ? notifications.map(notification => `<p>${notification.message} (${notification.type})</p>`).join('')
    : "No updates, enjoy the silence...";

// Theme toggle logic
const themeToggleButton = document.getElementById("themeToggle");

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");

    if (isLightMode) {
        themeToggleButton.innerText = "Switch to Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        themeToggleButton.innerText = "Switch to Light Mode";
        localStorage.setItem("theme", "dark");
    }
});

// Apply saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggleButton.innerText = "Switch to Dark Mode";
}
