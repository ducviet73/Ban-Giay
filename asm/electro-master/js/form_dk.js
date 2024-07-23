document.getElementById("registrationForm").addEventListener("submit", async(event) => {
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    
    var message = "";
    
    if (name.trim() === "") {
      message += "Name is required.<br>";
    }
    
    if (email.trim() === "") {
      message += "Email is required.<br>";
    } else if (!isValidEmail(email)) {
      message += "Invalid email format.<br>";
    }
    
    if (age.trim() === "") {
      message += "Age is required.<br>";
    }
    
    if (password.trim() === "") {
      message += "Password is required.<br>";
    }
    
    if (confirm_password.trim() === "") {
      message += "Confirm Password is required.<br>";
    }
    
    if (password !== confirm_password) {
      message += "Passwords do not match.<br>";
    }
    
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = message;
    

    try {
        const response = await axios.post('http://localhost:3000/users/api/register', { name, age, email, password, confirm_password });
        window.location.href = '/asm1/electro-master/form_dn.html';
    } catch (error) {
        console.error('Register failed:', error.response.data);
        const errorMessage = document.getElementById("#message");
        errorMessage.textContent = error.response.data.error;
    }
  });
  
  function isValidEmail(email) {
    // Sử dụng biểu thức chính quy để kiểm tra email có chứa ký tự '@' không
    var emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  
