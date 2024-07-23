fetch('http://localhost:3000/products/api/products')
  .then(response => response.json())
  .then(data => {
    const products = data.data; 

    const categories = [...new Set(products.map(item => item.category))];
    console.log(categories);

    document.getElementById('aa').innerHTML = categories.map(category => {
      const categoryProducts = products.filter(item => item.category === category);
      return categoryProducts.map(item => {
        return (`
          <div class="product">
            <div class="product-img" onclick="showProductDetail('${item._id}')">
              <img src="${item.image}" alt="">
            </div>
            <div class="product-body">
              <h3 class="product-name"><a href="#">${item.name}</a></h3>
              <h4 class="product-price">${item.old_price} <del class="product-old-price">${item.old_price}</del></h4> 
            </div> 
            <div class="add-to-cart">
              <button class="btn btn-cart" onclick="addToCart('${item._id}', '${item.name}', ${item.old_price}, '${item.image}', '${item.new_price}')">Thêm vào giỏ</button>
            </div>
          </div>
        `);
      }).join('');
    }).join('');
  })
  .catch(error => {
    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
  });

function showProductDetail(productId) {
    window.location.href = `/asm1/electro-master/product.html?id=${productId}`;
};


// Khởi tạo giỏ hàng trống
let cart = [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(_id, name, price, img) {
    const existingItem = cart.find(item => item.id === _id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ _id, name, price, img, quantity: 1 });
    }
    saveCartToLocalStorage(); // Lưu trữ giỏ hàng vào localStorage
    displayCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function delElement(a) {
    cart.splice(a, 1);
    saveCartToLocalStorage(); // Lưu trữ giỏ hàng vào localStorage
    displayCart();
}

// Giảm số lượng sản phẩm trong giỏ hàng
function decrementQuantity(a) {
    if (cart[a].quantity > 1) {
        cart[a].quantity -= 1;
        displayCart();
    }
}

// Tăng số lượng sản phẩm trong giỏ hàng
function incrementQuantity(a) {
    cart[a].quantity += 1;
    displayCart();
}

// Hiển thị giỏ hàng
function displayCart() {
    let tong = 0;
    document.getElementById('count').innerHTML = cart.length;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Giỏ hàng trống";
        document.getElementById('tt').innerHTML = tong + " VNĐ";
    } else {
        document.getElementById('cartItem').innerHTML = cart
            .map((items, index) => {
                var { _id, name, price, img, quantity } = items;
                const totalItemPrice = price * quantity;
                tong += totalItemPrice;
                return (`
                    <div class="cart-item">
                        <div class="main-productz">
                            <div class="product-imgz">
                                <img src="${img}" alt="">
                            </div>
                            <div class="product-body">
                                <h3 class="product-namez"><a href="#">${name}</a></h3>
                                <div class="quantityz">
                                    <span class="quantity-label">Số lượng:</span>
                                    <button class="quantity-control" onclick="decrementQuantity(${index})">-</button>
                                    <span class="quantity-value">${quantity}</span>
                                    <button class="quantity-control" onclick="incrementQuantity(${index})">+</button>
                                </div>
                                <h4 class="product-price">${totalItemPrice}</h4> 
                            </div>
                            <div class="del-to-cart">
                                <button class='fass' onclick='delElement(${index})'>Xóa</button>
                            </div>
                        </div>
                    </div>
                `);
            })
            .join('');

        document.getElementById('tt').innerHTML = tong + " VNĐ";
    }
}

// Lưu trữ giỏ hàng vào localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Khởi tạo giỏ hàng từ localStorage khi tải lại trang
function initializeCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCart();
    } else {
        fetch('http://localhost:3000/products/api/products')
            .then(response => response.json())
            .then(data => {
                const products = data.data;
                products.forEach(product => {
                    addToCart(product._id, product.name, product.old_price, product.image);
                });
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            });
    }
}

// Khi trang được tải lại, khởi tạo giỏ hàng từ localStorage
window.addEventListener('DOMContentLoaded', initializeCartFromLocalStorage);
