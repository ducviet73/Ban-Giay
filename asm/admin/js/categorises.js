const url = 'http://localhost:3000/catagories/api/categories'; // Đường dẫn mới

fetch(url)
  .then(res => res.json())
  .then(data => {
    data.data.forEach(category => { // Sửa data.data thành data.category
      renderCategory(category); // Đổi tên hàm renderProduct thành renderCategory
    });
  });

const tableCategory = document.getElementById('categories'); // Đổi tên tableProduct thành tableCategory

const renderCategory = (category) => { // Đổi tên hàm renderProduct thành renderCategory
  const output = `
    <tr data-id="${category._id}">
      <td><p>${category.name}</p></td>
      <td>
        <button class="btn-edt btn btn-primary btn-sm">
          <span>Sửa</span>
        </button>
        <button class="btn-del btn btn-danger btn-sm">
          Xóa
        </button>
      </td>
    </tr>
  `;
  tableCategory.insertAdjacentHTML('beforeend', output); // Đổi tên tableProduct thành tableCategory

  const btnDel = document.querySelector(`[data-id="${category._id}"] .btn-del`);
  btnDel.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${url}/${category._id}`, {
      method: 'DELETE'
    })
      .then(() => {
        document.querySelector(`[data-id="${category._id}"]`).remove();
      })
      .catch(error => console.log(error));
  });

  const btnEdt = document.querySelector(`[data-id="${category._id}"] .btn-edt`);
  btnEdt.addEventListener('click', (e) => {
    e.preventDefault();
    // Hiển thị modal sửa sản phẩm
    $("#myEdt").modal('show');
    // Điền thông tin sản phẩm vào form sửa
    edtModalForm._id.value = category._id; // Thêm trường ẩn để lưu ID sản phẩm
    edtModalForm.name.value = category.name;
    // Để phản ánh dữ liệu từ server, cần thay đổi tương ứng với các trường dữ liệu mới
  });
};

addModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    name: addModalForm.name.value,
    // Thêm các trường dữ liệu mới tương ứng
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      renderCategory(data.category); // Đổi tên hàm renderProduct thành renderCategory
    })
    .catch(error => console.log(error));

  addModalForm.name.value = '';
  // Xóa dữ liệu cũ sau khi thêm mới
});

edtModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const categoryId = edtModalForm._id.value; // Lấy ID sản phẩm từ trường ẩn
  // Gửi yêu cầu PATCH để cập nhật thông tin sản phẩm
  fetch(`${url}/${categoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: edtModalForm.name.value,
      // Thêm các trường dữ liệu mới tương ứng
    })
  })
    .then(() => location.reload()); // Tải lại trang sau khi cập nhật thành công

  // Xóa dữ liệu trong form sau khi đã gửi yêu cầu
  edtModalForm.name.value = '';
  // Xóa dữ liệu cũ sau khi cập nhật
});
