const forgotForm = document.getElementById('emailForm');

forgotForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    try {
        const response = await axios.post('http://127.0.0.1:3000/users/api/forgot-password', { email });
        console.log(response);
        if (response.data.status == true) {
            const succesMessage = document.querySelector('#message');
            succesMessage.textContent = 'Gửi mail thành công!!';
        }
    } catch (error) {
        console.error('Login failed:', error.response.data);
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.textContent = error.response.data.error;
    }

});