async function registerUser(email, password, name) {
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Update the event listeners
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg_email').value;
    const password = document.getElementById('reg_password').value;
    const name = document.getElementById('reg_name').value;
    
    try {
        await registerUser(email, password, name);
        alert('Registration successful! Please login.');
        showPage('login');
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const data = await loginUser(email, password);
        alert('Login successful!');
        showPage('upload');
        document.getElementById('userEmail').textContent = email;
    } catch (error) {
        alert(error.message);
    }
}); 