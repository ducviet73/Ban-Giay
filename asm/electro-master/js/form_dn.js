document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    var message = "";
    
    if (email.trim() === "") {
        message += "Email is required.<br>";
    }
    
    if (password.trim() === "") {
        message += "Password is required.<br>";
    }
    
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = message;
    
    try {
        const response = await axios.post('http://localhost:3000/users/api/login', { email, password });
        window.location.href = '/asm1/electro-master/index.html';
    } catch (error) {
        console.error('Register failed:', error.response.data);
        const errorMessage = document.getElementById("#message");
        errorMessage.textContent = error.response.data.error;
    }
  });
