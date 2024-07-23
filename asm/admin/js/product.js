// Địa chỉ URL API
const url = 'http://localhost:3000/products/api/products';

// Lưu các tham chiếu DOM vào biến một lần duy nhất
const addModalForm = document.getElementById('form-user');
const edtModalForm = document.querySelector('#myEdt .form-user');
const tableProduct = document.getElementById('product');

// Hàm render sản phẩm
const renderProduct = (product) => {
  const output = `
    <tr data-id="${product._id}">
      <td>
        <img src="${product.image}" alt="" />
      </td>
      <td><p>${product.name}</p></td>
      <td>${product.old_price}</td>
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
  tableProduct.insertAdjacentHTML('beforeend', output);

  // Gắn sự kiện xóa sản phẩm
  const btnDel = tableProduct.querySelector(`[data-id="${product._id}"] .btn-del`);
  btnDel.addEventListener('click', (e) => {
    e.preventDefault();
    deleteProduct(product._id);
  });

  // Gắn sự kiện sửa sản phẩm
  const btnEdt = tableProduct.querySelector(`[data-id="${product._id}"] .btn-edt`);
  btnEdt.addEventListener('click', (e) => {
    e.preventDefault();
    openEditModal(product);
  });
};

// Hàm thêm sản phẩm
const addProduct = (formData) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      renderProduct(data);
      resetForm(addModalForm);
    })
    .catch(error => console.error(error));
};

// Hàm xóa sản phẩm
const deleteProduct = (productId) => {
  fetch(`${url}/${productId}`, {
    method: 'DELETE'
  })
    .then(() => {
      tableProduct.querySelector(`[data-id="${productId}"]`).remove();
    })
    .catch(error => console.error(error));
};

// Hàm mở modal sửa sản phẩm
const openEditModal = (product) => {
  $("#myEdt").modal('show');
  edtModalForm._id.value = product._id; // Thêm trường ẩn để lưu ID sản phẩm
  edtModalForm.name.value = product.name;
  edtModalForm.price.value = product.old_price;
  edtModalForm.img.value = product.image;
};

// Hàm cập nhật sản phẩm
const updateProduct = () => {
  const productId = edtModalForm._id.value; // Lấy ID sản phẩm từ trường ẩn
  fetch(`${url}/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: edtModalForm.name.value,
      old_price: edtModalForm.price.value,
      image: edtModalForm.img.value
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi cập nhật sản phẩm.');
      }
      $("#myEdt").modal('hide'); // Ẩn modal sau khi cập nhật thành công
      location.reload(); // Tải lại trang sau khi cập nhật thành công
    })
    .catch(error => console.error('Lỗi khi cập nhật sản phẩm:', error));

  resetForm(edtModalForm); // Xóa dữ liệu trong form sau khi đã gửi yêu cầu
};

// Hàm reset form
const resetForm = (form) => {
  form.name.value = '';
  form.price.value = '';
  form.img.value = '';
};

// Sự kiện submit form thêm sản phẩm
addModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    name: addModalForm.name.value,
    old_price: addModalForm.price.value,
    image: addModalForm.img.value
  };
  addProduct(formData);
});

// Sự kiện submit form sửa sản phẩm
edtModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  updateProduct();
});

// Load danh sách sản phẩm khi trang được tải
window.addEventListener('load', () => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.data.forEach(product => {
        renderProduct(product);
      });
    })
    .catch(error => console.error('Lỗi khi tải danh sách sản phẩm:', error));
});
