const resetForm = document.getElementById('resetForm');

resetForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    let url_str = window.location.href;
    console.log(url_str);

    let url = new URL(url_str);
    let search_params = url.searchParams;

    let token = search_params.get('token');
    console.log(token);

    const password = document.getElementById('password').value;
    const password_confirmation = document.getElementById('password_confirmation').value;
    try {
        const response = await axios.post('http://127.0.0.1:3000/users/api/reset-password', { token, password, confirm_password: password_confirmation });
        console.log(response);
        if (response.data.status == true) {
            const successMessage = document.getElementById('message');
            successMessage.innerHTML = 'Đổi mật khẩu thành công! <a href="/asm1/electro-master/form_dn.html">Đăng nhập</a>';
        }
    } catch (error) {
        console.error('Login failed:', error.response.data);
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.textContent = error.response.data.error;
    }

});