async function fetchData(productId) {
    try {
        const response = await fetch(`http://localhost:3000/products/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        const product = await response.json();
        return product;
    } catch (error) {
        throw new Error('Error fetching product data: ' + error.message);
    }
  }
  function renderProduct(product) {
    const { name, old_price, image } = product.data;
    const productHTML = `
    <div class="col-md-5 col-md-push-2">
						<div id="product-main-img">
							<div class="product-preview">
								<img src="${image}" alt="">
							</div>

							
						</div>
					</div>
					<!-- /Product main img -->

					<!-- Product thumb imgs -->
					<div class="col-md-2  col-md-pull-5">
						<div id="product-imgs">
							

							<div class="product-preview">
								<img src="${image}" alt="">
							</div>
						</div>
					</div>
					<!-- /Product thumb imgs -->

					<!-- Product details -->
					<div class="col-md-5">
                        <div class="product-details">
              <h2 class="product-name">${name}</h2>
              <div>
                <div class="product-rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-o"></i>
                </div>
                <a class="review-link" href="#">10 Đánh giá </a>
              </div>
              <div>
                <h3 class="product-price">$${old_price} <del class="product-old-price">$990.00</del></h3>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  
              <div class="add-to-cart">
  
                            <button class="add-to-cart-btn" onclick="addCart('${product.data._id}')"><i class="fa fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
              </div>
  
              <ul class="product-links">
                <li>Share:</li>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i class="fa fa-envelope"></i></a></li>
              </ul>
  
            </div> 
            </div>
    `;
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = productHTML;
  }
  
  
  window.addEventListener('DOMContentLoaded', async (event) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log('ID sản phẩm:', productId);
  
        if (!productId) {
            throw new Error('Product ID is missing in the URL');
        }
  
        const product = await fetchData(productId);
        renderProduct(product);
    } catch (error) {
        console.error(error.message);
    }
  });