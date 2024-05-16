document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');
    const signupForm = document.querySelector('.signup');
    const loginForm = document.querySelector('.login');

    // Disable sign-up button by default
    signupBtn.disabled = true;

    loginBtn.addEventListener('click', () => {
        signupForm.classList.add('slide-up');
        loginForm.classList.remove('slide-up');
        // Enable sign-up button when switching to login mode
        signupBtn.disabled = false;
        // Disable login button
        loginBtn.disabled = true;
    });

    signupBtn.addEventListener('click', () => {
        signupForm.classList.remove('slide-up');
        loginForm.classList.add('slide-up');
        // Disable sign-up button when switching to sign-up mode
        signupBtn.disabled = true;
        // Enable login button
        loginBtn.disabled = false;
    });

    // Function to validate if username is empty
    function isUsernameEmpty(username) {
        return username.trim() === '';
    }

    // Function to validate if username has blank spaces
    function hasBlankSpaces(username) {
        return /\s/.test(username);
    }

    // Function to validate email
    function isValidEmail(email) {
        // Basic email validation regex
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate password
    function isValidPassword(password) {
        // Password should be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}$/;
        return passwordRegex.test(password);
    }

    // Function to handle sign-up form submission
    function handleSignup(event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        const username = document.getElementById('username').value.trim(); // Trim whitespace
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
    
        // Check if username is empty
        if (isUsernameEmpty(username)) {
            alert('Please enter a username.');
            return;
        }
    
        // Check if username has blank spaces
        if (hasBlankSpaces(username)) {
            alert('Username should not contain blank spaces.');
            return;
        }
    
        // Validate email
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        // Validate password
        if (!isValidPassword(password)) {
            alert('Password should be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.');
            return;
        }
    
        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        // If all validations pass, send data to the server using AJAX
        const formData = {
            username: username,
            email: email,
            password: password
        };
    
        // Send an AJAX POST request to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Response from process.php:', xhr.responseText);
                const data = JSON.parse(xhr.responseText);
                if (data.status === 'success') {
                    // Display success message
                    alert(data.message);
                    // Clear form fields
                    document.getElementById('username').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('confirmPassword').value = '';
                    // Switch to login form
                    signupForm.classList.add('slide-up');
                    loginForm.classList.remove('slide-up');
                    // Enable sign-up button when switching to login mode
                    signupBtn.disabled = false;
                    // Disable login button
                    loginBtn.disabled = true;
                } else {
                    // Display error message
                    alert(data.message);
                }
            }
        };
        const urlEncodedData = Object.keys(formData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])).join('&');
        xhr.send(urlEncodedData);
    }

    // Attach event listener to the sign-up form submit button
    document.getElementById('signup-btn').addEventListener('click', handleSignup);

    // Function to handle login form submission
    function handleLogin(event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value;
    
        // Validate email
        if (!isValidEmail(loginEmail)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        // Check if password is empty
        if (loginPassword.trim() === '') {
            alert('Please enter a password.');
            return;
        }
    
        // If all validations pass, send data to the server using AJAX
        const formData = {
            email: loginEmail,
            password: loginPassword
        };
    
        // Send an AJAX POST request to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Response from login.php:', xhr.responseText);
                const responseData = JSON.parse(xhr.responseText);
                if (responseData.status === 'success') {
                    alert('Login successful. Redirecting to Guidelines Page');
                    // Redirect to main.html after successful login
                    window.location.href = responseData.redirect;
                } else {
                    alert('Invalid email or password.');
                }
            }
        };
        const urlEncodedData = Object.keys(formData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])).join('&');
        xhr.send(urlEncodedData);
    }
    
    
   
    // Attach event listener to the login form submit button
    document.getElementById('login-btn').addEventListener('click', handleLogin);
});
