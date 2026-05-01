function checkPassword() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let resultText = document.getElementById("result");
    let feedbackList = document.getElementById("feedback");
    let meterBar = document.getElementById("meter-bar");

    // 1. Input Validation Module (As per report)
    if (password === "") {
        resultText.innerText = "Please enter a password.";
        resultText.className = "weak-text";
        meterBar.style.width = "0%";
        feedbackList.innerHTML = "";
        return; // Stop execution if empty
    }

    let score = 0;
    let feedback = [];

    // Rule 1: Length
    if (password.length >= 8) {
        score++;
    } else {
        feedback.push("Make it at least 8 characters long.");
    }

    // Rule 2: Uppercase
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        feedback.push("Add at least one uppercase letter.");
    }

    // Rule 3: Lowercase
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        feedback.push("Add at least one lowercase letter.");
    }

    // Rule 4: Number
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        feedback.push("Include at least one number.");
    }

    // Rule 5: Special Character
    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    } else {
        feedback.push("Include at least one special character (e.g., @, #, $).");
    }

    // Rule 6: Avoid username
    if (password.toLowerCase().includes(username.toLowerCase()) && username !== "") {
        feedback.push("Remove your username from the password.");
        score--; // Penalty
    }

    // Prevent score from dropping below 0 due to penalty
    if (score < 0) score = 0;

    // Strength evaluation & Visual Updates
    let strength = "";
    let meterWidth = (score / 5) * 100; // Calculate percentage for the bar

    // Reset classes
    resultText.className = "";
    meterBar.className = "meter-bar";

    if (score <= 2) {
        strength = "Weak";
        resultText.classList.add("weak-text");
        meterBar.classList.add("weak-bg");
        // Cap weak meter width so it shows a little bit of red even at score 0 or 1
        meterBar.style.width = Math.max(meterWidth, 15) + "%"; 
    } else if (score <= 4) {
        strength = "Moderate";
        resultText.classList.add("medium-text");
        meterBar.classList.add("medium-bg");
        meterBar.style.width = meterWidth + "%";
    } else {
        strength = "Strong";
        resultText.classList.add("strong-text");
        meterBar.classList.add("strong-bg");
        meterBar.style.width = "100%";
        feedback.push("Great job! Your password meets all security criteria.");
    }

    // Display textual result
    resultText.innerText = "Strength: " + strength;

    // Display feedback bullets
    feedbackList.innerHTML = "";
    feedback.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        feedbackList.appendChild(li);
    });
}