let cartElement = document.getElementById("cart-product");
let products;

function guard(){
    if(!localStorage.getItem("currentUser")){
        window.location.href = "/login";    
    }
  }
  guard();

function fetchCartProduct(){
    let cart = localStorage.getItem("cart");
    if(!cart){
        cartElement.innerHTML = `
        <div class="col-md-4">
            <h6>Oops, No items in cart.</h6>
        </div>`;
    }
    else{
        cart = JSON.parse(cart);
        if(cart.length == 0) {
            cartElement.innerHTML = `
        <div class="col-md-4">
            <h6>Oops, No items in cart.</h6>
        </div>`;
        return;
        }
        products = cart;
        let res = "";
        let check = "";
        check += `
            <h4 class="text-center py-3">Checkout List</h4>
        `;
        let totalPrice = 0;
        cart.forEach((element, index) => {
            totalPrice += element.price;
            check += `
            <div style="display:flex; justify-content: space-between;">
            
            <h6 style="text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;">${index + 1}. ${element.title}</h6>
            <h6>${element.price}$</h6>
            </div>
            `;
            res += `
            <div class="col-md-3 col-sm-4 pb-3">
            <div class="" style="border: 1px solid grey; overflow:hidden;">
            <div style="display:flex;">
                <img src="${element.image}" alt="Item" height="200px" style="margin: 0 auto;" />
            </div>
            <div class="p-3">
              <div style=" text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;">Title: ${element.title}</div>
              <div>Price: ${element.price}$</div>
            </div>
            <button onclick="removeFromCart(this, ${element.id})" class="btn btn-block btn-dark" style="width:100%; border-radius:0;">Remove from Cart</button>
          </div>
            </div>
            `;
        });
        check += `
            <hr/>
            <div style="display:flex; justify-content: space-between;">
            <h6>Total</h6>
            <h6>${Math.round(totalPrice)}$</h6>
            </div>
            <hr/>
            <button onclick="checkoutCart(this)" class="btn btn-block btn-light" style="width:100%; border-radius:0;">Click to Checkout</button>
            `;
        document.getElementById("checkout").innerHTML = check;
        cartElement.innerHTML = res;
    }
}

fetchCartProduct();

function removeFromCart(event, id){
    event.innerHTML = "Removed";
    products.forEach((element, index, object)=>{
        if(element.id == id) object.splice(index, 1);
    });
    localStorage.setItem("cart", JSON.stringify(products)); 
    fetchCartProduct();  
}
function checkoutCart(event){
    window.location.href = "/razorpay";   
}