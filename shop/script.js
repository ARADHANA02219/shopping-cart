let productElement = document.getElementById("product-items");
let categoryStatus = "all";
let products;
let range_0_25 = false;
let range_25_50 = false;
let range_50_100 = false;
let range_100 = false;

function guard(){
  if(!localStorage.getItem("currentUser")){
      window.location.href = "/login";    
  }
}
guard();

function fetchProducts() {
  return new Promise((resolve, reject) => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
  });
}

function removeActiveClass(){
  document.getElementById("all").setAttribute('class', 'filter');
  document.getElementById("mens").setAttribute('class', 'filter');
  document.getElementById("womens").setAttribute('class', 'filter');
  document.getElementById("jewellery").setAttribute('class', 'filter');
  document.getElementById("electronics").setAttribute('class', 'filter');
}

function allProducts(e) {
  categoryStatus = "all";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function onlyMens(e) {
  categoryStatus = "men's clothing";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function onlyWomens(e) {
  categoryStatus = "women's clothing";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function onlyJewellery(e) {
  categoryStatus = "jewelery";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function onlyElectronics(e) {
  categoryStatus = "electronics";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}

fetchProducts().then((res) => {
  res.forEach((element)=>{
    let sizes = randomSize();
    let colours = randomColour();
    element["sizes"] = sizes;
    element["colours"] = colours;
  });
  products = res;
  localStorage.setItem("products", JSON.stringify(products));
  populateProductScreen(products);
}).catch((err)=>{
  console.error("Error in fetching products: ",err);
});


function filterCategory() {
  if (categoryStatus == "all") return filterRating(products);
  let filteredByCategory = products.filter((elem) => {
    if (elem.category == categoryStatus) return true;
    return false;
  });
  return filterRating(filteredByCategory);
}
function filterRating(filteredByCategory) {
  let rate = document.getElementById("range").value;
  if (rate == 0) return filterText(filteredByCategory);
  let filteredByRating = filteredByCategory.filter((elem) => {
    if (Math.round(elem.rating.rate) == rate) return true;
    return false;
  });
  return filterText(filteredByRating);
}

function filterText(filteredByRating){
  let searchText = document.getElementById("search").value;
  if (searchText == "") return filterRange(filteredByRating);
  let filteredByText = filteredByRating.filter((elem)=>{
    if(elem.title.toLowerCase().includes(searchText.toLowerCase())) return true;
    return false;
  });
  return filterRange(filteredByText);
}

function filterRange(filteredByText){
    if(!range_0_25 && !range_25_50 && !range_50_100 && !range_100) return populateProductScreen(filteredByText);
    let filteredByRange = filteredByText.filter((elem)=>{
      if(f1(elem) || f2(elem) || f3(elem) || f4(elem)) return true;
      return false;
    });
    return populateProductScreen(filteredByRange);
    function f1(elem){
      if(!range_0_25){ return false;}
      else if(elem.price >= 0 && elem.price <= 25){ 
        return true;
      }
      return false;
    }
    function f2(elem){
      if(!range_25_50){ return false;}
      else if(elem.price >= 25 && elem.price <= 50){ 
        return true;
      }
      return false;
    }
    function f3(elem){
      if(!range_50_100){ return false;}
      else if(elem.price >= 50 && elem.price <= 100){ 
        return true;
      }
      return false;
    }
    function f4(elem){
      if(!range_100){ return false;}
      else if(elem.price >= 100){ 
        return true;
      }
      return false;
    }
}
function populateProductScreen(finalFilteredProducts) {
  if (finalFilteredProducts.length == 0) {
    productElement.innerHTML = `<title>Checkout filtered items</title>
      <p>Oops,No products found for this filtering, try different combinations!</p>`;
    return;
  }
  let result = `<title>Checkout filtered items</title>
  <div class="row">`;
  finalFilteredProducts.forEach((element) => {
    result += `
    <div class="col-md-3 col-sm-4 pb-3">
        <div class="" style="border: 1px solid grey; overflow:hidden;">
        <div style="display:flex;">
                <img src="${element.image}" alt="Item" height="200px" style="margin: 0 auto;" />
            </div>
        <div class="info">
          <div class="px-3">
          <div class="price"><h6 style="text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;">${element.title}</h6></div>
            <div class="d-flex" style="justify-content:space-between;">
              <h6>${element.price}$</h6>
              <h6>${element.sizes[0]},${element.sizes[1]},${element.sizes[2]}</h6>
            </div>
          </div>
          <div class="d-flex px-3" >
            <h6>Colors:</h6>
            <div class="d-flex">
              <div class="circle" style="background-color: ${element.colours[0]};"></div>
              <div class="circle" style="background-color: ${element.colours[1]};"></div>
              <div class="circle" style="background-color: ${element.colours[2]}; margin:0;"></div>
            </div>
          </div>
          <div class="px-3 pb-3">Rating: ${Math.round(element.rating.rate)}</div>
        </div>
        <button class="btn btn-block btn-dark" style="width:100%; border-radius:0;" onclick="addToCart(this, ${element.id})" id="addBtn">Add to Cart</button>
      </div>
      </div>
        `;
  });
  result += `</div>`;
  productElement.innerHTML = result;
}
function randomSize(){
    let res = [];
    let s = ["S","M","L","XL","XXL"];
    let i = 0, j = 0; k = 0;
    while(i == j || j == k || k == i){
      i = Math.floor(Math.random() * s.length);
      j = Math.floor(Math.random() * s.length);
      k = Math.floor(Math.random() * s.length);
    }
    res.push(s[i]);
    res.push(s[j]);
    res.push(s[k]);
    return res;
}

function randomColour(){
    let res = [];
    let s = ["brown","grey","black","green","purple"];
    let i = 0, j = 0; k = 0;
    while(i == j || j == k || k == i){
      i = Math.floor(Math.random() * s.length);
      j = Math.floor(Math.random() * s.length);
      k = Math.floor(Math.random() * s.length);
    }
    res.push(s[i]);
    res.push(s[j]);
    res.push(s[k]);
    return res;
}

function addToCart(event, id) {
  if(event.innerHTML == "Added") return;
  event.innerText = "Added";
  //console.log(id);
  products.forEach((elem) => {
    if (elem.id == id) {
      let cart = localStorage.getItem("cart");
      if (!cart) { cart = [elem]; }
      else {
        cart = JSON.parse(cart);
        cart.push(elem);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

document.getElementById("search").addEventListener("keyup",()=>{
  return filterCategory();
})

function setRange(res){
  if(res == "0-25") range_0_25 = !range_0_25;   
  else if(res == "25-50") range_25_50 = !range_25_50;
  else if(res == "50-100") range_50_100 = !range_50_100;
  else if(res == "100on") range_100 = !range_100;
  //console.log(range_0_25, range_25_50, range_50_100, range_100);
  return filterCategory();
}