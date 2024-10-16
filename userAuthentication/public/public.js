// Registration form
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the email and password values from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object to send to the server
    const user = {
        email: email,
        password: password
    };

    try {
        // Send a POST request to the backend
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user) // Send the email and password as JSON
        });

        const result = await response.json();

        if (response.ok) {
            // Display success message or redirect user
            alert('User registered successfully!');
            // Optionally redirect to login page
            // window.location.href = '/login'; 
        } else {
            // Handle errors (e.g., user already exists)
            alert(result.error || 'User already exists!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering user.');
    }
});

// Login form
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the email and password values from the form
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    // Create an object to send to the server
    const user = {
        email: email,
        password: password
    };

    try {
        // Send a POST request to the backend
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user) // Send the email and password as JSON
        });

        const result = await response.json();

        if (response.ok) {
            // Display success message or save JWT token and redirect user
            alert('Login successful!');
            // Optionally save JWT token in localStorage or redirect user
            // localStorage.setItem('token', result.token);
            // window.location.href = '/dashboard'; 
        } else {
            // Handle errors (e.g., invalid credentials)
            alert(result.error || 'Invalid email or password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in.');
    }
});
