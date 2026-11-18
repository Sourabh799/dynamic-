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
            window.location.href = "dashbord.html";
        }, 1000);

    } else {

        message.style.color = "red";
        message.textContent = "Invalid username or password!";

    }

});

// Dashboard.html



/* SIDEBAR MENU */
function toggleMenu() {
    document.getElementById("sidebar")
    .classList.toggle("collapsed");
}


/* PROFILE DROPDOWN */
function toggleProfile() {
    document.getElementById("profileDropdown")
    .classList.toggle("show");
}

document.addEventListener("click", function(event) {

    const profile = document.querySelector(".profile-container");

    if (!profile.contains(event.target)) {
        document.getElementById("profileDropdown")
        .classList.remove("show");
    }

});


/* SUBSCRIPTION POPUP */
function openSubscribe() {
    document.getElementById("subscribeModal")
    .classList.add("show");
}

function choosePlan(name, price, validity) {

    alert(
        "Selected Plan: " + name +
        "\nAmount: ₹" + price +
        "\nValidity: " + validity +
        "\n\nContinue to payment integration."
    );

}

function closeModal(id) {
    document.getElementById(id).classList.remove("show");
}


/* EDIT PROFILE */
function openEditProfile() {

    document.getElementById("profileDropdown")
    .classList.remove("show");

    document.getElementById("editModal")
    .classList.add("show");

}

document.getElementById("editForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Profile details saved successfully!");

    closeModal("editModal");

});


/* LOGOUT */
function logout() {

    if (confirm("Are you sure you want to log out?")) {

        window.location.href = "index.html";

    }

}


/* MODULE SELECTION */
function selectModule(element, moduleName) {

    document.querySelectorAll(".module")
    .forEach(function(item) {
        item.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    } else {
        document.querySelectorAll(".module").forEach(function(item) {
            if (item.innerText.includes(moduleName)) {
                item.classList.add("active");
            }
        });
    }

    document.getElementById("pageTitle").textContent =
        moduleName === "Dashboard"
        ? "Welcome to Green Garden ERP 🌿"
        : moduleName + " Module";

}


/* SEARCH MODULES */
function searchModules() {

    let search = document.getElementById("searchInput")
    .value.toLowerCase().trim();

    let modules = document.querySelectorAll(".module");
    let cards = document.querySelectorAll(".card");
    let found = false;

    modules.forEach(function(item) {

        let match = item.innerText.toLowerCase().includes(search);

        item.style.display = (search === "" || match)
            ? "flex" : "none";

        if (match && search !== "") found = true;

    });

    cards.forEach(function(card) {

        let match = card.innerText.toLowerCase().includes(search);

        card.style.display = (search === "" || match)
            ? "block" : "none";

        if (match && search !== "") found = true;

    });

    if (search !== "" && !found) {
        alert("No matching module found!");
    }

}

document.getElementById("searchInput")
.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchModules();
    }
});


/* FOOTER LINKS */
function footerInfo(name, event) {
    event.preventDefault();
    alert(name + " page coming soon!");
}


/* CLOSE MODAL ON OUTSIDE CLICK */
document.querySelectorAll(".modal").forEach(function(modal) {

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});


/* SESSION TIMER */



function updateTimer() {

    let h = Math.floor(remainingTime / 3600);
    let m = Math.floor((remainingTime % 3600) / 60);
    let s = remainingTime % 60;

    document.getElementById("timer").textContent =
        String(h).padStart(2,"0") + ":" +
        String(m).padStart(2,"0") + ":" +
        String(s).padStart(2,"0");

}

function resetTimer() {

    remainingTime = SESSION_TIME;
    updateTimer();

}

function startTimer() {

    timerInterval = setInterval(function() {

        if (remainingTime > 0) {

            remainingTime--;
            updateTimer();

        } else {

            clearInterval(timerInterval);

            alert("Your session has expired. Please login again.");

            window.location.href = "index.html";

        }

    }, 1000);

}

["mousemove","keydown","click","scroll","touchstart"]
.forEach(function(eventName) {

    document.addEventListener(eventName, resetTimer);

});

updateTimer();
startTimer();
