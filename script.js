// SESSION TIMER SETTINGS
const SESSION_TIME = 10 * 60;
let remainingTime = SESSION_TIME;
let timerInterval;

// DISPLAY TIMER
function updateTimer() {

    let hours = Math.floor(remainingTime / 3600);
    let minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = remainingTime % 60;

    document.getElementById("timer").textContent =
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0');

}

// RESET SESSION TIMER
function resetTimer() {

    remainingTime = SESSION_TIME;
    updateTimer();

}

// START SESSION TIMER
function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(function() {

        if (remainingTime > 0) {

            remainingTime--;
            updateTimer();

        } else {

            clearInterval(timerInterval);

            alert("Your session has expired due to inactivity. Please login again.");

            document.getElementById("loginForm").reset();

            document.getElementById("message").textContent =
                "Session expired. Please login again.";

            resetTimer();

        }

    }, 1000);

}

// USER ACTIVITY DETECTION
["mousemove", "keydown", "click", "scroll", "touchstart"]
.forEach(function(eventName) {

    document.addEventListener(eventName, function() {
        resetTimer();
    });

});

// LOGIN FUNCTION
document.getElementById("loginForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username.trim() !== "" && password.trim() !== "") {

        document.getElementById("message").style.color = "green";

        document.getElementById("message").textContent =
            "Login form submitted successfully!";

        resetTimer();

    } else {

        document.getElementById("message").textContent =
            "Please enter username and password.";

    }

});

// OTHER BUTTONS
function subscribe() {
    alert("Subscription page coming soon!");
}

function profile() {
    alert("Please login to view your profile.");
}

function forgotPassword(event) {
    event.preventDefault();
    alert("Please contact the administrator to reset your password.");
}

function aboutUs(event) {
    event.preventDefault();
    alert("Welcome to Green Garden!");
}

function contactUs(event) {
    event.preventDefault();
    alert("Contact us for more information.");
}

function documentation(event) {
    event.preventDefault();
    alert("Documentation page coming soon!");
}

// INITIALIZE
updateTimer();
startTimer();


// function loginUser(event) {

//     event.preventDefault();

//     let username = document.getElementById("username").value;
//     let password = document.getElementById("password").value;

//     if (username === "admin" && password === "Admin@123") {

//         sessionStorage.setItem("isLoggedIn", "true");
//         sessionStorage.setItem("username", username);

//         document.getElementById("message").style.color = "green";
//         document.getElementById("message").innerText =
//             "Login Successful!";

//         setTimeout(function() {
//             window.location.href = "dashboard.html";
//         }, 1000);

//     } else {

//         document.getElementById("message").style.color = "red";
//         document.getElementById("message").innerText =
//             "Invalid Username or Password!";

//     }

//     return false;
// }


// DEMO LOGIN CREDENTIALS
const validUsername = "admin";
const validPassword = "Admin@123";

// LOGIN FUNCTION
document.getElementById("loginForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    if (username === validUsername && password === validPassword) {

        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";

        // Store demo login status
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);

        // Redirect to dashboard
        setTimeout(function() {
            window.location.href = "http://127.0.0.1:5500/dashbord.html";
        }, 1000);

    } else {

        message.style.color = "red";
        message.textContent = "Invalid username or password!";

    }

});
