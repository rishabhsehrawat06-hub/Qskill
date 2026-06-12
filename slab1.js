document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check empty fields
    if (email === "" || password === "") {
        alert("Error: All fields are required!");
        return;
    }

    // Validate email
    if (!emailPattern.test(email)) {
        alert("Error: Please enter a valid email address!");
        return;
    }

    // Validate password length
    if (password.length < 6) {
        alert("Error: Password must be at least 6 characters long!");
        return;
    }

    // Success
    alert("Login Successful!");
});