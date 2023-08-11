// Your web app's Firebase configuration
  var type = location.hash.substring(1);
  window.onload = function(){
    //$('.mainload').fadeOut();
    fetchproducts();
    }
    document.addEventListener("scroll", function () {
      reveal();
    });
    
    $(document).ready(function(){
     ready()
     loading()
    });
    function showloader(){
      $('.mainload').fadeIn('slow')
    }
    function hideloader(){
      $('.mainload').delay(500).fadeOut();
    }
    function loading(){
      $('.mainload').fadeIn('slow',function(){
        $('.mainload').delay(500).fadeOut();
      })
    }
    function hidebottomalert(){
      $('.alertbottom').delay(100).fadeOut();
    }
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const productdata=()=>{
    return $.ajax({
      url : 'https://saimahavir.in/listproducts',
      type: 'GET',
      headers: {"content-type":"application/json","apikey":"58ddc702a1598164"},
      success: function(res){
        //if(res.code === 0){
          //attach(res.data)
        //}
      return res;
      },
      error:(err)=>{
        console.log(err)
        return []
      }
    });
  }
function reveal(){
	var reveals = document.querySelectorAll('.reveal');
	for(var i=0;i < reveals.length; i++){
		var windowheight = window.innerHeight;
		var revealtop = reveals[i].getBoundingClientRect().top;
		var revealpoint = 150;
		if (revealtop < windowheight - revealpoint){
				reveals[i].classList.add('active');
		}
		else{
			reveals[i].classList.remove('active');
		}
	}
}

  var firebaseConfig = {
    apiKey: "AIzaSyCxYAhIWfApAoVuloS3zFMqIIM4ZM7XayI",
    authDomain: "sai-mahavir.firebaseapp.com",
    projectId: "sai-mahavir",
    storageBucket: "sai-mahavir.appspot.com",
    messagingSenderId: "310858203167",
    appId: "1:310858203167:web:3633e7f06d79e1da9cd52a",
    measurementId: "G-15HHZ18TKN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
//for auth using email and password
function signOut(){
  firebase.auth().signOut();
  alertwithmsginfo('Logged Out, Bye.')
}
{/*
var phoneinput = document.getElementById('Loginphone');
var verifyotp = document.getElementById('verifyotp');
firebase.auth().useDeviceLanguage();

      phoneinput.onclick = function(){
      document.getElementById('verifyotp').style.display="none";
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          document.getElementById('verifyotp').style.display="block";
          document.getElementById('otpno').style.display="block";
          document.getElementById('phoneno').style.display="none";
          document.getElementById('Loginphone').style.display="none";
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          alert('reCAPTCHA expired');
        }
      });

      const Number = document.getElementById('phoneno').value;
      const phoneNumber = '+91'+Number;
      console.log(phoneNumber);
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
  
          
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            console.log(error);
          
            // ...
          });
}

verifyotp.onclick = function(){
const code = document.getElementById('otpno').value;
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  console.log("hey i am signed in")
  alert("successfully signed in");
  // ...
}).catch((error) => {
  console.log("User couldn't sign in (bad verification code?");
  alert("Wrong otp");
  // ...
});
}*/}
//checking that user is authenticated or not 
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var email = user.email;
    if(email){
      //alert('active user'+number)
      document.getElementById('userdetails').innerHTML = `
      <p><i class="fa fa-sign-in"></i> signed as </p>
      <p id="useremail"><i class="fa fa-user"></i> ${user.email}</p> <br/>
     `
     document.getElementById('uid').innerHTML = `${user.uid}`
     document.getElementById('loggeduser').innerHTML = `${user.email}`;
     document.getElementsByClassName('listchild2')[0].style.display = "none";
     document.getElementsByClassName('listchild2')[1].style.display = "block";
     document.getElementsByClassName('btn-address')[0].style.display = "block";
     document.getElementsByClassName('btn-sign-out')[0].style.display = "block";
     document.getElementsByClassName('btn-notify')[0].style.display = "none";
     document.getElementsByClassName('btn-addproduct')[0].style.display = "block";
     document.getElementsByClassName('btn-addresses')[0].style.display = "none";
     document.getElementsByClassName('btn-view-address')[0].style.display = "block";
     document.getElementsByClassName('btn-addproduct')[0].style.display = "block";
     document.getElementById('userdetails_desk').innerHTML = `
      <p id="useremail"><i class="fa fa-user"></i> ${user.email} <i class="fa fa-sign-out" style="padding-left: 10px;" onclick="signOut()"></i></p>`
     fetchdata(user.uid)
      
    }
    else{
      //alert('active user'+number)
      document.getElementById('userdetails').innerHTML = `
      <p><i class="fa fa-sign-in"></i> signed as </p>
      <p id="useremail"><i class="fa fa-user"></i> ${user.phoneNumber}</p>`
      document.getElementById('userdetails_desk').innerHTML = `
      <p id="useremail"><i class="fa fa-user"></i> ${user.phoneNumber} <i class="fa fa-sign-out" style="padding-left: 10px;" onclick="signOut()"></i></p>`
      document.getElementById('uid').innerHTML = `${user.uid}`
      document.getElementById('loggeduser').innerHTML = `${user.phoneNumber}`;
      document.getElementsByClassName('listchild2')[0].style.display = "none";
      document.getElementsByClassName('listchild2')[1].style.display = "block";
      document.getElementsByClassName('btn-address')[0].style.display = "block";
      document.getElementsByClassName('btn-notify')[0].style.display = "none";
      document.getElementsByClassName('btn-view-address')[0].style.display = "block";
      document.getElementsByClassName('btn-sign-out')[0].style.display = "block";
      document.getElementsByClassName('btn-addresses')[0].style.display = "none";
      document.getElementsByClassName('btn-addproduct')[0].style.display = "block";
      fetchdata(user.uid)
    }
    //is signed in
    
  }else{
   // alert('no active user');
    //no user is signed in
    document.getElementById('userdetails').innerHTML = `
    <p style="color: #111">Please Sign In to use the services</p>
    <a href="./login.html" style="text-decoration: none; color: #111; font-size: 18px; font-weight: 450; padding: 5px 0px;" ><i class="fa fa-sign-in"></i> Login</a>`
    document.getElementById('userdetails_desk').innerHTML = `<a href="./login.html"><i class="fa fa-sign-in"></i> Login</a>`
  document.getElementsByClassName('btn-address')[0].style.display = "none";
  document.getElementsByClassName('listchild2')[0].style.display = "block";
  document.getElementsByClassName('listchild2')[1].style.display = "none";
  document.getElementsByClassName('btn-notify')[0].style.display = "block";
   document.getElementsByClassName('btn-sign-out')[0].style.display = "none";
   document.getElementsByClassName('btn-view-address')[0].style.display = "none";
   document.getElementsByClassName('btn-payment')[0].style.display = "none";
   document.getElementsByClassName('btn-addproduct')[0].style.display = "none";
   document.getElementsByClassName('btn-addresses')[0].style.display = "block";
   document.getElementsByClassName('order-manipulation')[0].style.display="block";
  }  
});

function Toggle() {
 document.getElementById('pincode').style.display = "block";
}

function Togglehide() {
 document.getElementById('pincode').style.display = "none";
}
function pincode(){
  var pin_store = document.getElementById('pin').value;
  if(pin_store.length === 6){
    if(pin_store >= 400001 && pin_store <= 400080) {
      document.getElementsByClassName('alert')[0].style.display = "none";
      document.getElementsByClassName('alert')[1].style.display = "block";
      document.getElementById('loc').innerHTML = `<i class="fa fa-map-marker"></i> Deliver to ${pin_store}`;
    }
    else if (pin_store >= 401300 && pin_store <= 401320){
      document.getElementsByClassName('alert')[0].style.display = "none";
      document.getElementsByClassName('alert')[1].style.display = "block";
      document.getElementById('loc').innerHTML = `<i class="fa fa-map-marker"></i> Deliver to ${pin_store}`;
    }
    else{
      document.getElementsByClassName('alert')[0].style.display = "block";
      document.getElementsByClassName('alert')[1].style.display = "none";
      document.getElementsByClassName('alert')[0].innerHTML = "Delivery Unavailable !";
      document.getElementById('loc').innerHTML = `<i class="fa fa-map-marker"></i> Please enter the pincode to check delivery status.`;
    }
  }else{
    document.getElementsByClassName('alert')[0].style.display = "block";
    document.getElementsByClassName('alert')[0].innerHTML = "Please Enter the correct pincode";
    document.getElementsByClassName('alert')[1].style.display = "none";
    document.getElementById('loc').innerHTML = `<i class="fa fa-map-marker"></i> Please enter the pincode to check delivery status.`;
  }
 
}

  //for place order module 
  var messagesRef = firebase.database().ref('saimahavir_users');
  document.getElementById('ad-address').addEventListener('submit', addressclicked);

//for whatsapp redirect checking phone or windows is there 
$(document).ready(function() {
    var isMobile = {
    Android: function() {
    return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    };
    
    $(document).on("click", '.whatsapp', function() {
    if( isMobile.any() ) {
    var text = $(this).attr("data-text");
    var url = $(this).attr("data-link");
    var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
    var whatsapp_url = "whatsapp://send?text=" + message;
    window.location.href = whatsapp_url;
    } else {
    alert("Please share this page in mobile device");
    }
    });
    });


    //add to cart functionality from web dev simplified
if (document.readyState == 'loading') {
  //document.addEventListener('DOMContentLoaded', )
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
   
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
        //input.addEventListener('keyup mouseup', quantityChanged)
    }
    var quantityInputs = document.getElementsByClassName('cart-size')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', sizeChanged)
        //input.addEventListener('keyup mouseup', quantityChanged)
    }
    var quantityInputs1 = document.getElementsByClassName('pro-size')
    for (var i = 0; i < quantityInputs1.length; i++) {
        var input = quantityInputs1[i]
        input.addEventListener('change', sizeChangednew)
        //input.addEventListener('keyup mouseup', quantityChanged)
    }
    
   

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)

    }

    var addToCartButtonsnew = document.getElementsByClassName('shop-item-button-new')
    for (var i = 0; i < addToCartButtonsnew.length; i++) {
        var button = addToCartButtonsnew[i]
        button.addEventListener('click', addToCartClickednew)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    
}



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
    checkcart()
}

const sliderimage = [
  {
    title:'ecko unltd black_lightweight_utility_slim_fit',
    image:'https://ik.imagekit.io/bk4vkk0xf/saimahavir/originals/poster2.png',
  },
  {
    title:'ecko unltd black_lightweight_utility_slim_fit',
    image:'https://ik.imagekit.io/bk4vkk0xf/saimahavir/originals/poster2.png',
  }
]
const openproductpage=async(title,type,from)=>{
  document.getElementsByClassName('render')[0].innerHTML = `
  <div class="skeleton">
	<div class="product-outer">
		<div class="ownslider">
		<i class="fa"></i>
		<div class="sk-img"></div>
		</div>
		<div class="cont">
		<p class="title"></p>
		<p class="desc"></p>
		<p class="price"></p> 
		<p class="tag"></p>
		<div class="size">
		<p></p>
		<p></p>
		</div>
		<p class="p-type"></p>
		<button class="btn shop-item-button-new"></button>
		</div>
	  </div>
		<div class="product-detail-des">
		<p></p>
		<p class="details"></p>
		</div>
	</div>`;
  document.body.scrollTop = 0;
  showloader();
  const sk = document.getElementsByClassName('skeleton')[0];
  if(sk){
    document.getElementsByClassName('skeleton')[0].style.display = "block";
  }
  if(from && from === 'cart'){
    document.getElementsByClassName('addtocart')[0].style.display = "none";
    //document.getElementsByClassName('fetch')[0].style.display = "none";
    //document.getElementsByClassName('rest')[0].style.display = "block";
    //document.getElementById("mySidenav").style.width = "0";
    //document.getElementsByClassName('foot')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
    //
  }
  if(from && from === 'home'){
    document.getElementsByClassName('rest')[0].style.display = "none";
  }
  var ll = document.getElementsByClassName('products').length ;
  for(var i =0;i<ll;i++){
    document.getElementsByClassName('products')[i].style.display="none";
  }
  const info = await productdata()
  const data = info.data;
  if(type == 'Wafer'){
    for(var i=0;i< data[0].Snacks.length;i++){
      if(data[0].Snacks[i].title == title){
      displayproduct( {data:data[0].Snacks[i] , back:type})
      }
    }
  }else if(type == 'Dryfruits'){
    for(var i=0;i< data[0].Dryfruits.length;i++){
      if(data[0].Dryfruits[i].title == title){
      displayproduct( {data:data[0].Dryfruits[i] , back:type})
      }
    }
  }

}

const hideproduct=(type)=>{
  document.getElementsByClassName('render')[0].innerHTML = `
  <div class="skeleton">
	<div class="product-outer">
		<div class="ownslider">
		<i class="fa"></i>
		<div class="sk-img"></div>
		</div>
		<div class="cont">
		<p class="title"></p>
		<p class="desc"></p>
		<p class="price"></p> 
		<p class="tag"></p>
		<div class="size">
		<p></p>
		<p></p>
		</div>
		<p class="p-type"></p>
		<button class="btn shop-item-button-new"></button>
		</div>
	  </div>
		<div class="product-detail-des">
		<p></p>
		<p class="details"></p>
		</div>
	</div>`;
  if(type == 'Wafer'){
    document.getElementsByClassName('products')[0].style.display="block";
  }else if(type == 'Dryfruits'){
    document.getElementsByClassName('products')[1].style.display="block";
  }else if(type == 'Kurtas'){
    document.getElementsByClassName('products')[2].style.display="block";
  }
  //returnhome(0)
}

//for displaying UI of product
const displayproduct=(data)=>{
  var rr= document.getElementsByClassName('render')[0]
  if(rr){
    rr.innerHTML =''
  }
  var product = document.createElement('div');
  product.className ="product-details";
  const x = data.data
  if(x.type == 'Wafer' || x.type == 'Dryfruits'){
    if(!x.imagearr){
      var obj = `
      <div class="product-outer">
      <div class="ownslider">
      <i class="fa fa-arrow-left" onclick="hideproduct('${x.type}');"></i>
      ${x.bestseller ? `<img src="../svg elements/best-seller.png" class="best">`:''}
      <img src="${x.image}" class="pro-image">
      </div>
      <div class="cont">
      <p class="title">${x.title}</p>
      <p class="desc">${x.description}</p>
      <p class="price">&#8377<span class="price-o">${x.price}</span> <s class="price-del"> ${x.oldprice}</s>  | <span class="price-discount">${x.offer}</span></p> 
      <p class="tag">Price inclusive of all taxes.</p>
    
      <div class="size">
      <p>Quantity : 
      <select class="pro-quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option> 
              <option value="4">4</option> 
              <option value="5">5</option> 
              <option value="6">6</option>
              <option value="7">7</option> 
              <option value="8">8</option> 
              <option value="9">9</option> 
              <option value="10">10</option>  
              </select></p>
      <p>Weight : 
      <select class="pro-size">
      <option value="250" selected>250gm</option>
      <option value="500">500gm</option>
      <option value="1000">1kg</option>
      </select></p>
      </div>
      <p class="p-type">${x.type}</p>
      <button class="btn shop-item-button-new">Add to cart</button>
      </div>
    </div>
      <div class="product-detail-des">
      <p style="font-size:17px;color:#222;font-weight:550;">Return </p>
      <p class="details">Easy 15 days return and exchange. Return Policies may vary based on products and promotions.</p>
      </div>
      <div class="product-detail-des">
      </div>
      <div class="product-detail-des">
      </div>
      
      `
    }
  }
var product_helper = document.getElementsByClassName('render')[0]
product.innerHTML = obj;
product_helper.append(product);
hideloader();
ready()
}

const fetchproducts=async()=>{
  const res = await productdata();
  if(res.code === 0){
    attach(res.data)
  }
}
const attach=async(data)=>{
  data.map((x)=>{
    document.getElementsByClassName('pnumber')[0].innerHTML = `${x.Snacks.length} products`;
    document.getElementsByClassName('pnumber')[1].innerHTML = `${x.Dryfruits.length} products`;
    x.Snacks.map((y)=>{
      var cartRow = document.createElement('div')
      var cartRowsale = document.createElement('div')
      var cartfeatured = document.createElement('div')
      cartRowsale.className="col-md-2";
      cartRow.className = "col-md-2"; 
      cartfeatured.className="card";
      var design= `
          <div class="card">
           ${y.bestseller ? `<img src="../svg elements/best-seller.png" class="best">`:''}
            <img src="${y.image}" class="card-img-top" alt="..." onclick="openproductpage('${y.title}','${y.type}','cart');">
            <div class="card-body">
              <h5 class="card-title">${y.title} </h5>
              <p class="description">${y.description}</p>
              <p><span class="card-price">&#8377 ${y.price}</span> <del class="del" style="color:#aaa;">&#8377 ${y.oldprice}</del>
              <span style="color: red;" class="card-offer">${y.offer}</span></p>
            </div>
          </div>`
      const data1= document.getElementById('ajioproducts');
      cartRow.innerHTML = design;
      //<div class="card-text"> Status :<span class="stk"> +In Stock</span></div>
      //<p>Quantity: <span class="card-weight">${y.quantity}</span> | Size: <span class="card-size">${y.size}</span></p> 
      //<button class="btn shop-item-button">Add to cart</button>
      //cartRowsale.innerHTML = design;
      data1.append(cartRow)
  
    })
    x.Dryfruits.map((y,index)=>{
      var cartRow = document.createElement('div')
      var cartRowsale = document.createElement('div')
      var cartfeatured = document.createElement('div')
      cartRowsale.className="col-md-2";
      cartRow.className = "col-md-2"; 
      cartfeatured.className="card";
      var design= `
          <div class="card">
          ${y.bestseller ? `<img src="../svg elements/best-seller.png" class="best">`:''}
            <img src="${y.image}" class="card-img-top" alt="..." onclick="openproductpage('${y.title}','${y.type}','cart');">
            <div class="card-body">
              <h5 class="card-title">${y.title} </h5>
              <p class="description">${y.description}</p>
              <p><span class="card-price">&#8377 ${y.price}</span> <span>&#8377</span><del class="del" style="color:#aaa;"> ${y.oldprice}</del>
              <span style="color: red;" class="card-offer">${y.offer}</span></p>
            </div>
          </div>`
      const data1= document.getElementById('dryfruits');
      cartRow.innerHTML = design;
      //<div class="card-text"> Status :<span class="stk"> +In Stock</span></div>
      //<p>Quantity: <span class="card-weight">${y.quantity}</span> | Size: <span class="card-size">${y.size}</span></p> 
      //<button class="btn shop-item-button">Add to cart</button>
      //cartRowsale.innerHTML = design;
      data1.append(cartRow)
  
    })
  })
  //adding image on home slider
  sliderimage.map((x,index)=>{
    var sliderr = document.createElement('div')
    var qq = document.getElementById('addslide')
    if(index === 0){
      sliderr.className = "carousel-item active"
    }else{
      sliderr.className = "carousel-item"
    }
    var slider= `<img class="d-block w-100" src="${x.image}" alt="Second slide">`
    sliderr.innerHTML = slider;
    qq.append(sliderr);
    
  })
  ready()
}



function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
  updateCartTotal() 
}

function sizeChanged(event) {
  updatecartitemprice(event)
  updateCartTotal() 
}

function addToCartClicked(event) {
  firebase.analytics().logEvent('add_to_cart_clicked');
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var tilt = shopItem.getElementsByClassName("shop-item-button")[0]
    tilt.innerHTML = "Item Added";
    setTimeout(() => {
      tilt.innerHTML="Add to cart";
    }, 2000);
    var title = shopItem.getElementsByClassName('card-title')[0].innerText
    var price = shopItem.getElementsByClassName('card-price')[0].innerText
    var delprice = shopItem.getElementsByClassName('del')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
    var cardweight = shopItem.getElementsByClassName('card-weight')[0].innerText
    var cardsize = shopItem.getElementsByClassName('card-size')[0].innerText
    var cardtype = shopItem.getElementsByClassName('p-type')[0].innerText
    addItemToCart(title, price, delprice,imageSrc,cardweight,cardsize,cardtype) 
    updateCartTotal()
    checkcart()
    window.navigator.vibrate(300);
    //alert('item added')
}
function addToCartClickednew(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var tilt = shopItem.getElementsByClassName("shop-item-button-new")[0]
    tilt.innerHTML = "Item Added";
    setTimeout(() => {
      tilt.innerHTML="Add to cart";
    }, 5000);
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price-o')[0].innerText
    var delprice = shopItem.getElementsByClassName('price-del')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('pro-image')[0].src
    var cardweight = shopItem.getElementsByClassName('pro-quantity')[0].value
    var cardsize = shopItem.getElementsByClassName('pro-size')[0].value
    var cardtype = shopItem.getElementsByClassName('p-type')[0].innerText
    addItemToCart(title, price, delprice,imageSrc,cardweight,cardsize,cardtype) 
    updateCartTotal()
    checkcart()
    window.navigator.vibrate(300);
  //alert('item added')*/}
}
const changesize=()=>{
  updateCartTotal()
}
var obj = {}
async function addItemToCart(title, price, delprice,imageSrc,cardweight,cardsize,cardtype) {
    var cartRow = document.createElement('div')
    var flag = false; //for checking shooes thing
    if(cardtype == 'Wafer' || cardtype == 'Dryfruits'){
      flag = true;
    }else{
      flag = false;
    }
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alertwithmsginfo('This item is already added to your cart')
            return
        } 
      }    
    var dis1 = delprice - price;
    
    if(flag){
        var cartRowContents = `
        <div class="cart-manager">
          <div class="cart-item cart-column"> 
            <div class="cart-item-title">${title}</div>
            <img class="cart-item-image" src="${imageSrc}" onclick="openproductpage('${title}','${cardtype}','cart')">
          </div><br/>
          <div class="cartprice-flex">
          <span class="cart-price cart-column">&#8377 ${price}</span>
          <span class="delxprice"><del>&#8377 ${delprice}<del></span>
          </div>
          <div class="saved">you saved &#8377 <span class="dis" id="delp">${dis1}</span> !</div>
          <div class="cart-quantity cart-column">
              <label>
              <span id="we">Weight : 
              <select class="cart-size">
              <option value="250">250gm</option>
              <option value="500">500gm</option>
              <option value="1000">1kg</option>
              </select>
              </span>
              </label>
              <label>
              <span id="we">Qty : 
              <select class="cart-quantity-input">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option> 
              <option value="4">4</option> 
              <option value="5">5</option> 
              <option value="6">6</option>
              <option value="7">7</option> 
              <option value="8">8</option> 
              <option value="9">9</option> 
              <option value="10">10</option>  
              </select>
              </span>
              </label>
          </div>
          <span class="btn-flex">
              <button class="btn-remove" type="button">Remove</button>
              <button class="btn-remove1" type="button">Review</button>
          </span>
          </div>`
      
    }
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    cartRow.getElementsByClassName('cart-size')[0].addEventListener('change', sizeChanged)
    cartRow.getElementsByClassName('cart-quantity-input')[0].value = cardweight;
    cartRow.getElementsByClassName('cart-size')[0].value = cardsize;
    obj = await returnproductdata(title,cardtype);
}

function checkcart(){
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var items = cartRows.length;
  if (items == 0){
    document.getElementsByClassName('imgc')[0].style.display="block";
  }
  else{
    document.getElementsByClassName('imgc')[0].style.display="none";
  }
 
}
async function returnproductdata(title,type){
  const info = await productdata()
  const data = info.data;
  if(type == 'Wafer'){
    for(var i=0;i< data[0].Snacks.length;i++){
      if(data[0].Snacks[i].title == title){
         return data[0].Snacks[i]
      }
    }
  }else if(type == 'Dryfruits'){
    for(var i=0;i< data[0].Dryfruits.length;i++){
      if(data[0].Dryfruits[i].title == title){
        return data[0].Dryfruits[i]
      }
    }
  }
}
async function sizeChangednew(e){
  //price-o price-del
  var cartRow = e.target.parentElement.parentElement.parentElement
  const type = cartRow.getElementsByClassName("p-type")[0].innerText;
  const title = cartRow.getElementsByClassName("title")[0].innerText;
  obj = await returnproductdata(title,type)
  const cartsize = cartRow.getElementsByClassName("price")[0];
  if(e.target.value == 1000){
    cartsize.getElementsByClassName("price-o")[0].innerHTML = obj.price * 4;
    cartsize.getElementsByClassName("price-del")[0].innerHTML = obj.oldprice * 4;
    cartsize.getElementsByClassName("price-discount")[0].innerHTML = (obj.oldprice * 4 - obj.price * 4) +'&#8377 off';
  }else if(e.target.value == 500){
    cartsize.getElementsByClassName("price-o")[0].innerHTML = obj.price * 2;
    cartsize.getElementsByClassName("price-del")[0].innerHTML = obj.oldprice * 2;
    cartsize.getElementsByClassName("price-discount")[0].innerHTML = (obj.oldprice * 2 - obj.price * 2)+'&#8377 off';
  }
  else if(e.target.value == 250){
    cartsize.getElementsByClassName("price-o")[0].innerHTML = obj.price;
    cartsize.getElementsByClassName("price-del")[0].innerHTML = obj.oldprice;
    cartsize.getElementsByClassName("price-discount")[0].innerHTML =(obj.oldprice - obj.price) +'&#8377 off';
  }
}

async function updatecartitemprice(event){
  var buttonClicked = event.target
    var cartRow = buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement
    const cartsize = cartRow.getElementsByClassName("cart-size")[0].value;
    const discountprice = cartRow.getElementsByClassName('dis')[0].innerText;

    //obj = await returnproductdata(title,type)
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var del_price = cartRow.getElementsByClassName('delxprice')[0]
    var dprice = parseFloat(del_price.innerText.replace('₹', ''))
    var price = parseFloat(priceElement.innerText.replace('₹', ''))
//delxprice cart-price dis //cartRow
if(cartsize == 1000){
  cartRow.getElementsByClassName("cart-price")[0].innerHTML = obj.price * 4 +'&#8377';
  cartRow.getElementsByClassName("delxprice")[0].innerHTML = obj.oldprice * 4 +'&#8377';
  cartRow.getElementsByClassName("dis")[0].innerHTML = (obj.oldprice * 4 - obj.price * 4);
}else if(cartsize == 500){
  cartRow.getElementsByClassName("cart-price")[0].innerHTML = obj.price * 2+'&#8377';
  cartRow.getElementsByClassName("delxprice")[0].innerHTML = obj.oldprice * 2+'&#8377';
  cartRow.getElementsByClassName("dis")[0].innerHTML = (obj.oldprice * 2 - obj.price * 2);
}
else if(cartsize == 250){
  cartRow.getElementsByClassName("cart-price")[0].innerHTML = obj.price+'&#8377';
  cartRow.getElementsByClassName("delxprice")[0].innerHTML = obj.oldprice+'&#8377';
  cartRow.getElementsByClassName("dis")[0].innerHTML =(obj.oldprice - obj.price);
}
}





function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var discount = 0
    var items = cartRows.length;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        const cartsize = cartRow.getElementsByClassName("cart-size")[0].value;
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var del_price = cartRow.getElementsByClassName('delxprice')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var dprice = parseFloat(del_price.innerText.replace('₹', ''))
        var quantity = quantityElement.value
        var evedis =  (dprice - price) * quantity
        discount = discount + (dprice - price) * quantity
        total = total + (price * quantity);
        //document.getElementsByClassName('dis')[i].innerText = evedis;
    }
    const tax = 0//Math.round(total * (12/100)  * 100) /100
    total_gst = total + tax
    total_final = Math.round(total_gst * 100) / 100 

    //
    var error;
    var total_final_reducted;
    var reduction;
    const coupon = document.getElementById("coupon").value
    if(coupon === ''){
      error = 'please enter the code'
    }
    if(coupon === 'Flat20'){
      error = ''
      if(total_final > 999){
        error = ''
        reduction = Math.round(total_final * (20/100)  * 100) /100
        total_final_reducted = Math.round((total_final - reduction)*100)/100 
      }else{
        reduction = 00
        total_final_reducted = total_final
        error = 'Not Applicable , should applied if order value greater that 999 ₹'
      }
      
    }else if(coupon === 'Flat10') {
      error = ''
      if(total_final > 499){
        error = ''
        reduction = Math.round(total_final * (10/100)  * 100) /100
        total_final_reducted = Math.round((total_final - reduction)*100)/100 
      }else{
        reduction = 00
        total_final_reducted = total_final
        error = 'Not Applicable , should applied if order value greater that 499 ₹'
      }
    }else{
      error = 'Please enter correct coupon code'
      reduction = 00
      total_final_reducted = total_final
    }


    document.getElementsByClassName('cart-total-price')[0].innerText =  total_final_reducted
    document.getElementsByClassName('pay-total-price')[0].innerText =  total_final_reducted
    var coll = 0;
    document.getElementsByClassName('pay-collection-price')[0].innerText = coll;
    document.getElementsByClassName('pay-sum-price')[0].innerText =  total_final_reducted;
    document.getElementsByClassName('no-item')[0].innerText = items + ' items';
    document.getElementsByClassName('incp')[0].innerText ='Free';
    document.getElementsByClassName('incc')[0].innerText = '-' + reduction ;
    document.getElementsByClassName('incd')[0].innerText = discount;
    document.getElementsByClassName('incd')[1].innerText = discount+reduction;
    document.getElementsByClassName('error')[0].innerText = error;
    document.getElementsByClassName('incs')[0].innerText = total;
    document.getElementsByClassName('item_number')[0].innerText = items ;
    document.getElementsByClassName('item_number')[1].innerText = items ;
  
    
}

//alerts 
function alerthide(){
  document.getElementsByClassName('alert-box')[0].style.display="none";
}
function alertwithmsg(msg,fname){
  loading();
  document.getElementsByClassName('alert-box')[0].style.display="block";
  var cartaddress1 = document.createElement('div')
  var holder = document.getElementsByClassName('alert-box')[0]
  var address1 = `<div class="alert-handler">
    <h2>${msg}</h2>
    <i class="fa fa-question"></i>
    <button onclick="${fname}">DELETE</button><button onclick="alerthide()">CANCEL</button>
  </div>`
  cartaddress1.innerHTML = address1 
  holder.append(cartaddress1)
}
function alertwithmsgcancel(msg,userId,key){
  loading();
  document.getElementsByClassName('alert-box')[0].style.display="block";
  var cartaddress1 = document.createElement('div')
  var holder = document.getElementsByClassName('alert-box')[0]
  var address1 = `<div class="alert-handler">
    <h2>${msg}</h2>
    <i class="fa fa-question"></i>
    <button onclick="cancelorder('${userId}','${key}')">DELETE</button><button onclick="alerthide()">CANCEL</button>
  </div>`
  cartaddress1.innerHTML = address1 
  holder.append(cartaddress1)
}
function alertwithmsgsuccess(msg){
  loading();
  document.getElementsByClassName('alert-box')[0].style.display="block";
  var cartaddress1 = document.createElement('div')
  var holder = document.getElementsByClassName('alert-box')[0]
  var address1 = `<div class="alert-handler">
    <h2>${msg}</h2>
    <i class="fa fa-check-circle"></i>
    <button onclick="alerthide()" class="single">CANCEL</button>
  </div>`
  cartaddress1.innerHTML = address1 
  holder.append(cartaddress1)
}
function alertwithmsginfo(msg){
  loading();
  document.getElementsByClassName('alert-box')[0].style.display="block";
  var cartaddress1 = document.createElement('div')
  var holder = document.getElementsByClassName('alert-box')[0]
  var address1 = `<div class="alert-handler">
    <h2>${msg}</h2>
    <i class="fa fa-exclamation-circle"></i>
    <button onclick="alerthide()" class="single">CANCEL</button>
  </div>`
  cartaddress1.innerHTML = address1 
  holder.append(cartaddress1)
}

var updateflag =false
var updateid = 'sundaram'
function Updateaddress(id,name,address,contact,email){
  updateflag =true;
  updateid = id;
  const arr = address.split(',')
  if(arr.length === 4){
    document.getElementById("add_add").value  = arr[0];
    document.getElementById("add_zip").value = arr[3];
    document.getElementById("st").value = arr[2]
    document.getElementById("ci").value = arr[1]
  }else{
    document.getElementById("add_add").value  = arr[0]+arr[1];
    document.getElementById("add_zip").value = arr[4];
    document.getElementById("st").value = arr[3]
    document.getElementById("ci").value = arr[2]
  }
  document.getElementById("add_rc").value  = name;
  document.getElementById("add_contact").value  = contact;
  document.getElementById("add_email").value  = email;
}
var allow_purchase = false;
//address on cart page
function addressclicked(event) {
    event.preventDefault();
    var orderID = document.getElementById('uid').innerText;
    //var add_store = document.getElementsByClassName('add')[0]
    var add_rc = document.getElementById("add_rc").value
    var add_email = document.getElementById("add_email").value
    var add_contact = document.getElementById("add_contact").value
    var add_zip= document.getElementById("add_zip").value
    var add_add = document.getElementById("add_add").value
    var st = document.getElementById("st").value
    var ci = document.getElementById("ci").value
    document.getElementById('ad-address').reset();
    if(updateflag){
      rc_address_update(orderID,add_rc,add_email,add_contact,add_zip,add_add,st,ci) 
    }else{
      rc_address(orderID,add_rc,add_email,add_contact,add_zip,add_add,st,ci)
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

var flag = false;
function rc_address_update(orderID,add_rc,add_email,add_contact,add_zip,add_add,st,ci) {    
  firebase.database().ref('order_details/orders/'+orderID+'addresss'+'/'+updateid).update({
          Name: add_rc,
          Contact:add_contact,
          Email:add_email,
          Address_details : add_add +','+ ci +',' + st +',' + add_zip
        })        
        reloadpage()
        //flag = true;
  }
  function rc_address(orderID,add_rc,add_email,add_contact,add_zip,add_add,st,ci) {
    var cartaddress = document.createElement('div')
    var qw = document.getElementsByClassName('address_holder')[0]
      var cartRowContents1 = `
       <div class="address-container1">
           <p>RECENTLY USED</p>
            <div class="addressouter">
            <input type="radio" checked="true"/>
            <span class="rec-name1">${add_rc}</span><br>      
            <div class="rec-name"> ${add_add},${ci}, ${st} - ${add_zip}</div>
            <span class="rec-name2">${add_email}</span><br>
            <span class="rec-name2">${add_contact}</span><br>
            </div>
            <p>
         </div>
        `
         cartaddress.innerHTML = cartRowContents1
         qw.append(cartaddress)
        
          document.getElementsByClassName('address_holder')[0].style.display = "block";
          document.getElementsByClassName('custom-add')[0].style.display = "block";
          document.getElementsByClassName('btn-payment')[0].style.display = "block";
          document.getElementsByClassName('cart-items')[0].style.display = "none";
         document.getElementsByClassName('add')[0].style.display = "none";
         document.getElementsByClassName('btn-address')[0].style.display = "none";
 
         var messagesRef1 = firebase.database().ref('order_details/orders/'+orderID+'addresss');
         var newMessageRef1 = messagesRef1.push()
         newMessageRef1.set({
           Name: add_rc,
           Email: add_email,
           Contact:add_contact,
           Address_details : add_add +','+ ci +',' + st +',' + add_zip
         });
         allow_purchase= true;
        //flag = true;         
   }

  function DeleteAddress(){
    var orderID = document.getElementById('uid').innerText;
    firebase.database().ref('order_details/orders/'+orderID+'addresss').remove();
    reloadpage()
  }

  function cancelorder(userid,key){
    firebase.database().ref(`order_details/orders/${userid}/${key}`).update({
      Order_Status:'canceled',
    });
    reloadpage()
  }   
  function reorder(userid,key){
    firebase.database().ref(`order_details/orders/${userid}/${key}`).update({
      Order_Status:'Order Placed',
    });
    reloadpage()
  }  
  function reloadpage(){
    setTimeout(()=>{
      window.location.reload()
    },[3000])
  }
  const arr = []
  var address_flag = true;
  function fetchdata(orderID){
    const db = firebase.database();
    const ref = db.ref('order_details/orders/'+`${orderID}`);
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once('value', (snapshot) => {
      snapshot.forEach((childsnapshot)=>{
        let obj  = childsnapshot.val()
        let key = childsnapshot.key
        arr.push( {obj,key})
      })
      display_all_order()
    });
  
    const refadd = db.ref('order_details/orders/'+orderID+'addresss');
    // Attach an asynchronous callback to read the data at our posts reference
    refadd.once('value', (snapshot) => {
      if (snapshot.exists()){
        address_flag=false;
        allow_purchase = true;
        document.getElementsByClassName('btn-address')[0].style.display = 'none'
      }else{
        document.getElementsByClassName('btn-view-address')[0].style.display = 'none';
        document.getElementsByClassName('btn-address')[0].style.display = 'block'
      }
      //<i class="fa fa-trash" onclick="DeleteAddress()" style="padding:10px;"></i>
      //<i class="fa fa-edit" onclick="Updateaddress('${childsnapshot.key}'), address()"></i>
      snapshot.forEach(
      function(childsnapshot){
      let newPost = childsnapshot.val();
      var cartaddress1 = document.createElement('div')
      var qw1 = document.getElementsByClassName('address_holder')[0]
      var address1 = ` <div class="address-container1">
      <p>RECENTLY USED</p>
      <div class="addressouter">
      <input type="radio" checked="true"/>
      <span class="rec-name1">${newPost.Name}</span><br>      
      <div class="rec-name"> ${newPost.Address_details}</div>
      <span class="rec-name2">${newPost.Email}</span><br>
      <span class="rec-name2">${newPost.Contact}</span><br>
      </div>
      <p>
      <button class="btn-del" onclick="alertwithmsg('Are you sure your want to delete this address','DeleteAddress()')">DELETE</button><button class="btn-del" onclick="Updateaddress('${childsnapshot.key}','${newPost.Name}','${newPost.Address_details}','${newPost.Contact}','${newPost.Email}'), address()" >UPDATE</button></p>
    </div>`
        cartaddress1.innerHTML = address1 
        qw1.append(cartaddress1)
     
      });
    });
   
  document.getElementsByClassName('address_holder')[0].style.display = "block";
  document.getElementsByClassName('custom-add')[0].style.display = "block";
  document.getElementsByClassName('btn-payment')[0].style.display = "block";
  document.getElementsByClassName('cart-items')[0].style.display = "none";
  document.getElementsByClassName('add')[0].style.display = "none";
  document.getElementsByClassName('btn-address')[0].style.display = "none";
  }
  
  //for displaying my orders 
  function display_all_order(){
  if(arr.length > 0){
    document.getElementsByClassName('order-manipulation')[0].style.display="none";
    const allorder = arr.reverse()
    allorder.map((x,index)=>{
      var fetchorder = document.createElement('div')
      var collect = document.getElementsByClassName('orderdetails_holder')[0]
      var fetchorderdetails = `
      <div class="address-container">
          <h1><span style="font-weight: 550;">Order Id :</span><br/> <input type="text" class="form-control mt-2"  id="qwerty" disabled value='${x.obj.OrderID}'>
          <i class="fa fa-clipboard" style="color:#ccc; padding: 5px 10px;" onclick="copy()"></i> </h1>
          <span class="deal"><span class="ford mt-2"><span style="font-weight: 550;">Ship To ,</span>
          <br/>${x.obj.Recievers_details}</span></span>
          
          ${x.obj.Details ? x.obj.Details.map(x=>{
            return(
              `<div class="vpo">
              <img src="${x.image}" class="final-item-image"></img>
              <div class="vpo1">
              <p>${x.title}</p>
              <p>Weight : ${x.size} gm | Quantity :  ${x.quantity}</p>
              <p>Price : ${x.price} &#8377</p>
              </div>
              </div>`
            )
          }).join(''):''}
          <span class="deal"><span class="ford mt-2"> <span style="font-weight: 550;">Total Amount :</span><br/> ${x.obj.Cart_total/100} &#8377</span> </span>
          <span class="deal mt-2">
          <span class="ford">
          <span style="font-weight: 550;">
           Order status : 
           </span>
          <br/>
          <span style="border-bottom:1px dotted #222;padding: 7px 0px; border-radius:4px;line-height: 35px;">${x.obj.Order_Status}</span>
          </span>
          </span>
          ${x.obj.Order_Status !== 'canceled' ? 
          `<span class="deal mt-2">
          <span class="ford">
          <span style="font-weight: 550;">
           Payment Info: 
           </span>
          <br/>
          ${x.obj.gateway === 'razorpay' || x.obj.gateway === 'stripe' ? 
          `<span style="border-bottom:1px dotted #222;padding: 7px 0px;">TransactionId : ${x.obj.paymentgatewaypaymentId}</span>
          <br/>
          <span style="border-bottom:1px dotted #222;padding: 7px 0px;line-height: 35px;">Gateway: ${x.obj.gateway}</span>`:
          `<span style="border-bottom:1px dotted #222;padding: 7px 0px;line-height: 35px;">Mode : ${x.obj.gateway}</span>`}
          </span>
          </span>`:''
          }
          <p class="m-2">Order Placed on  ${ x.obj.PurchaseDate } at ${x.obj.PurchaseTime} IST
          <br/>
          ${x.obj.Order_Status != 'canceled' ? 
          `to cancel this order please click <a here="#" style="color:#0099e3;" onclick="alertwithmsgcancel('Are you really want to delete this order !','${x.obj.userID}','${x.key}')">here<a>`:''}</p>

        </div>
  ` 
  
  fetchorder.innerHTML = fetchorderdetails
  collect.append(fetchorder)
    })
  }else{
    document.getElementsByClassName('order-manipulation')[0].style.display="block";
  }
  }

  function copy() {
    /* Get the text field */
    var copyText = document.getElementById("qwerty");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }
  function purchaseClicked(event) {
    event.preventDefault()
    showloader()
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var carttitle = '';
    var discount = 0
    var quantity = 0
    var quantity1 = 0;
    var items = cartRows.length;
    var imagearr=[];
    if ( 0 < items && allow_purchase){
      for (var i = 0; i < cartRows.length; i++) {
          var cartRow = cartRows[i]
          var cartitem = cartRow.getElementsByClassName('cart-item-title')[0].innerText
          var cartimage = cartRow.getElementsByClassName('cart-item-image')[0].src
          var cartsize = cartRow.getElementsByClassName('cart-size')[0].value
          var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
          var priceElement = cartRow.getElementsByClassName('cart-price')[0]
          //var weight = cartRow.getElementsByClassName('weight')[0].innerText
          var del_price = cartRow.getElementsByClassName('delxprice')[0]
          var price = parseFloat(priceElement.innerText.replace('₹', ''));
          imagearr.push({index:i+1 ,title:cartitem ,quantity:quantityElement.value, image:cartimage,price:price,size:cartsize})
          carttitle +=  i+1 + ' . ' + cartitem + '<br/>'+' '+ ' '+'Weight :'+ cartsize +' ' + 'Quantity :'+ quantityElement.value +' '+ 'Price :'+ price + '<br/>';
          var dprice = parseFloat(del_price.innerText.replace('₹', ''))
          quantity = quantityElement.value 
          discount = discount + (dprice - price) * quantity
          total = total + (price * quantity) 
          quantity1 += quantity + ' / ';

      }
      const total_gst = total +  total * (12/100)
      total = document.getElementsByClassName('pay-total-price')[0].innerText
     
      
      var f = ""
      var fetchadd = document.getElementsByClassName('address-container-new')[0]
      var fetchadd1 = document.getElementsByClassName('address-container1')[0]
      if(flag){
        var fetch_rec = fetchadd.getElementsByClassName('rec-name')
      }
      if(!fetchadd1){
      }else{
        var fetch_rec = fetchadd1.getElementsByClassName('rec-name')
      }
     
      //console.log(fetch_rec)
      for(var i=0;i < fetch_rec.length;i++){
        f += fetch_rec[i].innerText + '\n' ;
      }
      
      var orderID =  document.getElementById('uid').innerText
      var orderID_ = Math.floor(100000 + Math.random() * 900000)
      var reciever = document.getElementsByClassName('rec-name1')[0].innerText
      var email = document.getElementsByClassName('rec-name2')[0].innerText
      var contact = document.getElementsByClassName('rec-name2')[1].innerText
      var gateway = 'cash-on-delivery'
      var paymentstatus = "not collected";
      //fetching date and time 
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var totalpaise = total + '00';
    document.getElementsByClassName('date-time').innerHTML = dateTime ;
    alertwithmsgsuccess('Order Successfully Placed. you can view order details in My order section.');
    displaysuccess(totalpaise,date,time,f,orderID_)
    var paymentobj1 = {}
    saveorderinfo(orderID,reciever,email,contact,f, imagearr,items,quantity1,discount, totalpaise , date ,time,orderID_,gateway,paymentstatus,paymentobj1)
    //sendorderEmail(orderID,reciever, email,f,carttitle,items, total , date , time,orderID_)
    sendordercustomer(orderID,reciever, email,f,imagearr,items, totalpaise , date , time,orderID_ , gateway,paymentstatus)
      var cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
          cartItems.removeChild(cartItems.firstChild)
      }
      updateCartTotal()
   }
   else{
      alertwithmsginfo('kindly add products to your cart or add valid address');
   }
}
function displaysuccess(total,date,time,f,orderID_){
  var cartaddress1 = document.createElement('div')
  var qw1 = document.getElementsByClassName('order_details')[0]
  var ta = total / 100 ;
  var address1 = ` <div class="address">
      <span class="rec"> Order ID : ${orderID_}</span><br>
      <span class="rec"> Total : ${ta} ₹</span><br><br>
      <span class="rec"> Address : ${f}</span><br><br>
      <span class="rec"> Time :  ${date} ${time}</span></div>`
  cartaddress1.innerHTML = address1 
  qw1.append(cartaddress1)
  document.getElementsByClassName('success')[0].style.display = "block";
  document.getElementsByClassName('payment')[0].style.display = "none";
}
//pk_test_51Kd95sSCaFy0it72KN6cxNJAFeqt6lseAMslskVG0gOiSv0ovlVd0iU4yFEjerstt8EX3EFUrMqiaEcW2CC5xGYQ00CxC9au7q
//var stripe = Stripe('pk_live_51Kd95sSCaFy0it72Aavkg14GPhdg1cPUcL6psnbssDzOc48gRsjcbUTvWUxLV9rNX3HtYWc9R0F0f6xdckBA2F1000SmkmANj8');
var stripe = Stripe('pk_test_51Kd95sSCaFy0it72KN6cxNJAFeqt6lseAMslskVG0gOiSv0ovlVd0iU4yFEjerstt8EX3EFUrMqiaEcW2CC5xGYQ00CxC9au7q');
var clients = '';
const appearance = {
  theme: 'stripe'
};

var elements = '';
var globe = '';
//email,total,date,time,orderID_
function stripe1(gateway){
  showloader();
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var imagearr=[];
  if ( 0 < cartRows.length && allow_purchase){
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var cartitem = cartRow.getElementsByClassName('cart-item-title')[0].innerText
        var cartimage = cartRow.getElementsByClassName('cart-item-image')[0].src
        var cartsize = cartRow.getElementsByClassName('cart-size')[0].value
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        //var weight = cartRow.getElementsByClassName('weight')[0].innerText
        //var del_price = cartRow.getElementsByClassName('delxprice')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''));
        imagearr.push({index:i+1 ,title:cartitem ,quantity:quantityElement.value, image:cartimage,price:price,size:cartsize})
    }
  }else{
    alertwithmsginfo('kindly add address')
    hideloader();
  }
  total = document.getElementsByClassName('pay-total-price')[0].innerText;
  var totalpaise = total + '00';
  var orderID =  document.getElementById('uid').innerText
  var orderID_ = Math.floor(100000 + Math.random() * 900000)
  var reciever = document.getElementsByClassName('rec-name1')[0].innerText
  var email = document.getElementsByClassName('rec-name2')[0].innerText
  var contact = document.getElementsByClassName('rec-name')[0].innerText
  //fetching date and time 
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var f = ""
  var fetchadd = document.getElementsByClassName('address-container-new')[0]
  var fetchadd1 = document.getElementsByClassName('address-container1')[0]
  if(flag){
    var fetch_rec = fetchadd.getElementsByClassName('rec-name')
  }
  if(!fetchadd1){
  }else{
    var fetch_rec = fetchadd1.getElementsByClassName('rec-name')
  }
 
  //console.log(fetch_rec)
  for(var i=0;i < fetch_rec.length;i++){
    f += fetch_rec[i].innerText + '\n' ;
  }
  //retrived all the data to store and pass 
  if(gateway == 'stripe' && totalpaise > 0){
    const obj = {
      amount: totalpaise,
      currency:"INR",
      gateway:gateway,
      orderID:orderID_,
      userId:orderID,
      email:email,
      name:reciever,
      address:f,
      contact:contact,
      date:date,
      time:time,
      details:imagearr
    }
    globe = obj;
    apicall(obj,imagearr)
  }else if(gateway == 'razorpay' && totalpaise>0){
    const obj = {
      amount: totalpaise,
      currency:"INR",
      gateway:gateway,
      orderID:orderID_,
      userId:orderID,
      email:email,
      name:reciever,
      address:f,
      contact:contact,
      date:date,
      time:time,
      details:imagearr
    }
    //variable for global use 
    globe = obj;
    apicall(obj,imagearr)
  }else{
    alertwithmsginfo('kindly add products to your cart')
    hideloader()
  }
};

function apicall(obj,data){
  $.ajax({
    //https://saimahavir.in/createOrder
    url : 'https://saimahavir.in/createOrder',
    type: 'POST',
    dataType : "json",
    headers: {"content-type":"application/json",
  "apikey":"58ddc702a1598164"},
    data: JSON.stringify(obj),
    success: function(res){
      hideloader()
      if(res.code === 0 && res.data ? res.data.name == 'stripe':''){
        mountstripe(res.data)
      }else{
        razorpaygateway(res,obj)
      }
      const cc = localStorage.getItem('details')
      if(cc === null){
        localStorage.setItem('details',JSON.stringify(data))
      }else{
        localStorage.removeItem('details')
        localStorage.setItem('details',JSON.stringify(data))
      }
    }
  });
}
function razorpaygateway(res,obj){
  hideloader()
  var options = {
    "key": "rzp_test_QgpA0bYVPHaDAH", // Enter the Key ID generated from the Dashboard
    "amount": res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "SAI MAHAVIR FOODS",
    "description": "Transaction",
    "image": "https://ik.imagekit.io/bk4vkk0xf/saimahavir/logos.jpeg",
    "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
      verifyrazorpaysignature(response,obj)
  },
    "prefill": {
        "name": res.data.name,
        "email": res.data.email,
        "contact": res.data.contact
    },
    "notes": {
        "address": res.data.address
    },
    "theme": {
        "color": "#333333"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
}

function verifyrazorpaysignature(res,obj){
  
  const objnew = {
    razorpay_order_id:res.razorpay_order_id,
    razorpay_payment_id:res.razorpay_payment_id,
    razorpay_signature:res.razorpay_signature
  }
  $.ajax({
    //https://saimahavir.increateOrder
    url : 'https://saimahavir.in/api/payment/verify',
    type: 'POST',
    dataType : "json",
    headers: {"content-type":"application/json",
  "apikey":"58ddc702a1598164"},
    data: JSON.stringify(objnew),
    success: function(res){
      if(res.signatureIsValid){
        alertwithmsgsuccess('Order Successfully Placed. you can view order details in My order section.');
        displaysuccess(obj.amount,obj.date,obj.time,obj.address,obj.orderID)
        saveorderinfo(obj.userId,obj.name,obj.email,obj.contact,obj.address,obj.details,obj.details.length,'','',obj.amount,obj.date,obj.time,obj.orderID,obj.gateway,'success',objnew)
        sendordercustomer(obj.userId,obj.name, obj.email,obj.address,obj.details,obj.details.length,obj.amount,obj.date,obj.time,obj.orderID,obj.gateway,'success')
      }
    },
    error:function(err){
      console.log(err)
    }
  })
  
}
function mountstripe(result){
  document.getElementById('payment-form').style.display="block";
  var clientSecret = result.stripePlainPaymentIntent;
  clients = result.stripePlainPaymentIntent;
  elements = stripe.elements({clientSecret,appearance});
  //var cardElement = elements.create('card');
  //cardElement.mount('#card-element');
  // Create and mount the Payment Element
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

}
//stripe payment form 
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  //orderID,carttitle,total,date,time,f,orderID_
  const {error} = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      //https://saimahavir.in
      return_url: `https://saimahavir.in/success.html?gateway=stripe&orderId=${globe.orderID}&name=${globe.name}&contact=${globe.contact}&email=${globe.email}&total=${globe.amount}&date=${globe.date}&time=${globe.time}&address=${globe.address}&userId=${globe.userId}&`,
    },
  });

  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
  }
});

//for showing cart final cart deatils to the user or customer
function saveorderinfo(orderID,reciever,email,contact,f,imagearr,items,quantity1,discount,total,date,time,orderID_,gateway,paymentstatus,paymentobj){
 var messagesRef1 = firebase.database().ref('order_details/orders/'+orderID);
  var newMessageRef1 = messagesRef1.push()
  newMessageRef1.set({
    userID : orderID,
    OrderID: orderID_ ,
    Customer : reciever,
    Email : email,
    Contact:contact,
    Recievers_details : f,
    Details: imagearr,
    Items :items,
    Quantity : quantity1,
    Discount_value : discount,
    Cart_total : total,
    PurchaseDate : date,
    PurchaseTime : time,
    Order_Status: 'Order Placed',
    gateway:gateway,
    paymentstatus:paymentstatus,
    paymentgatewaypaymentId:!paymentobj.razorpay_payment_id ? null : paymentobj.razorpay_payment_id
  });
  firebase.analytics().logEvent('order_placed');
  reloadpage()
  //fetchdata(orderID)
  //displayorder()
}

function sendorderEmail(orderID,reciever,email,f,carttitle,items,total,date,time,orderID_){
  Email.send({
    SecureToken:"2b31207e-bd6c-4c25-a041-73ca90b41fe9",
    To:'saimahavirfoods@gmail.com',
    // president.rca3141@gmail.com
    From:`saimahavirfoods@gmail.com`,
    Subject: `${reciever} sent you a message, You have a new order.`,
    Body: `<html>
    <head>
      <!-- Compiled with Bootstrap Email version: 1.3.1 --><meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <style type="text/css">
        body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-full,.w-full>tbody>tr>td{width:100% !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-5>tbody>tr>td{font-size:20px !important;line-height:20px !important;height:20px !important}}
      </style>
    </head>
    <body class="add" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#fff">
      <table class="add body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#fff">
        <tbody>
          <tr>
            <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
              <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tbody>
                  <tr>
                    <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" role="presentation">
                          <tbody>
                            <tr>
                              <td width="600">
                      <![endif]-->
                      <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                        <tbody>
                          <tr>
                            <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                              <div class="row" style="margin-right: -24px;">
                                <table class="" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed; width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <img src="https://ik.imagekit.io/bk4vkk0xf/saimahavir/logos.jpeg" style="height: 80px; line-height: 100%; outline: none; text-decoration: none; display: block; width: 80px; margin: 0 0 0 -20px; padding: 0; border-style: none; border-width: 0;">
                                      <h2 style="padding-top: 0; padding-bottom: 0; font-weight: bold; vertical-align: baseline; font-size: 20px; line-height: 38.4px; color: #111; margin: -10px 0px 0px;" align="left">Sai Mahavir Foods</h2>
                                      <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                              &#160;
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                        <tbody>
                                          <tr>
                                            <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                              &#160;
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <h8 style="color: #111; padding: 10px 0px 0px;">Hey, I am ${reciever} , </h8>
                                      <h5 style="font-weight: 500; vertical-align: baseline; font-size: 20px; line-height: 24px; color: #111; margin: 0; padding: 10px 0px 0px;" align="left">
                                        <b>My Order !</b> </h5>
                                      <p style="line-height: 24px; font-size: 16px; width: 100%; color: #0099e3; margin: 0; padding: 20px 0px 10px;" align="left">Thank You for shopping ! your order for ${items} Items hasnt shipped yet, 
                                        but we will send you an email when it does !</p>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <table class="order bg-light w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; padding: 0%;" bgcolor="#eee" width="100%">
                                <tbody>
                                  <tr>
                                    <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left" bgcolor="#f7fafc" width="100%">
                                      <div class="flex">
                                        <p style="line-height: 24px; font-size: 16px; width: 100%; color: #0099e3; margin: 0px 3%; padding: 20px 0px 10px;" align="left"> Order Id : ${orderID_} <br> User Id : ${orderID}<br/>
                                         Total Payable Amount : ${total} ₹ <br/>
                                         (Subtotal + GST % Included)</p>
                                      </div>
                                      <button class="mode" style="background-color: #111; color: #fff; border-radius: 4px; margin: 0px 8% 0px 3%; padding: 14px 20px; border-style: none;"><a href="https://saimahavir.in" style="color: #fff; text-decoration: none; font-size: 16px;"> View or Manage order </a></button>
                                      <div class="cart" style="border-bottom-width: 1px; border-bottom-color: #ccc; border-bottom-style: solid; padding: 0% 0% 0px;">
                                        <p style="line-height: 24px; font-size: 16px; width: 100%; color: #0099e3; margin: 0px 6%; padding: 20px 0px 10px;" align="left"> <span style="color: #111;"> Cart Product Details : </span> <br>
                                          <br>
                                          ${carttitle}
                                        </p>
                                        <p style="color: #111; line-height: 24px; font-size: 16px; width: 100%; margin: 0px 6%; padding: 20px 0px 10px;" align="left">Delivery Address : 
                                          <br>
                                          ${f}</p>
                                      </div>
                                      <p style="line-height: 24px; font-size: 16px; width: 100%; color: #0099e3; margin: 0px 6%; padding: 20px 0px 10px;" align="left">Payment Method : <br>
                                        <span style="color: #111;">Cash On Delivery</span></p>
                                      <p style="color: #111; line-height: 24px; font-size: 16px; width: 100%; margin: 0px 6%; padding: 20px 0px 10px;" align="left">Date :  ${date}  Time : ${time}</p>
                                      <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                              &#160;
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                        <tbody>
                                          <tr>
                                            <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                              &#160;
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                    </tr>
                  </tbody>
                </table>
                      <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>`
  }).then(msg =>{
    console.log(msg)
  })
}
function sendordercustomer(orderID,reciever,email,f,carttitle,items,total,date,time,orderID_,gateway,paymentstatus){
  Email.send({
    //8ab08259-d5cc-4629-b55f-b8c0acbbcfed
    SecureToken:"2b31207e-bd6c-4c25-a041-73ca90b41fe9",
    To:`${email}`,
    // president.rca3141@gmail.com
    From:"saimahavirfoods@gmail.com",
    Subject: `Sai Mahavir Foods sent you a message - Succesfully Order Placed .`,
    Body:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
      <head>
        <!-- Compiled with Bootstrap Email version: 1.3.1 --><meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <style type="text/css">
          body,table,td{font-family:Helvetica,Arial,sans-serif !important}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:150%}a{text-decoration:none}*{color:inherit}a[x-apple-data-detectors],u+#body a,#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}img{-ms-interpolation-mode:bicubic}table:not([class^=s-]){font-family:Helvetica,Arial,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-collapse:collapse}table:not([class^=s-]) td{border-spacing:0px;border-collapse:collapse}@media screen and (max-width: 600px){.w-lg-48,.w-lg-48>tbody>tr>td{width:auto !important}.w-full,.w-full>tbody>tr>td{width:100% !important}.w-16,.w-16>tbody>tr>td{width:64px !important}.p-lg-10:not(table),.p-lg-10:not(.btn)>tbody>tr>td,.p-lg-10.btn td a{padding:0 !important}.p-2:not(table),.p-2:not(.btn)>tbody>tr>td,.p-2.btn td a{padding:8px !important}.pr-4:not(table),.pr-4:not(.btn)>tbody>tr>td,.pr-4.btn td a,.px-4:not(table),.px-4:not(.btn)>tbody>tr>td,.px-4.btn td a{padding-right:16px !important}.pl-4:not(table),.pl-4:not(.btn)>tbody>tr>td,.pl-4.btn td a,.px-4:not(table),.px-4:not(.btn)>tbody>tr>td,.px-4.btn td a{padding-left:16px !important}.pr-6:not(table),.pr-6:not(.btn)>tbody>tr>td,.pr-6.btn td a,.px-6:not(table),.px-6:not(.btn)>tbody>tr>td,.px-6.btn td a{padding-right:24px !important}.pl-6:not(table),.pl-6:not(.btn)>tbody>tr>td,.pl-6.btn td a,.px-6:not(table),.px-6:not(.btn)>tbody>tr>td,.px-6.btn td a{padding-left:24px !important}.pt-8:not(table),.pt-8:not(.btn)>tbody>tr>td,.pt-8.btn td a,.py-8:not(table),.py-8:not(.btn)>tbody>tr>td,.py-8.btn td a{padding-top:32px !important}.pb-8:not(table),.pb-8:not(.btn)>tbody>tr>td,.pb-8.btn td a,.py-8:not(table),.py-8:not(.btn)>tbody>tr>td,.py-8.btn td a{padding-bottom:32px !important}*[class*=s-lg-]>tbody>tr>td{font-size:0 !important;line-height:0 !important;height:0 !important}.s-4>tbody>tr>td{font-size:16px !important;line-height:16px !important;height:16px !important}.s-6>tbody>tr>td{font-size:24px !important;line-height:24px !important;height:24px !important}}
        </style>
      </head>
      <body class="bg-100" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#ffffff">
        <table class="bg-100 body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tbody>
                    <tr>
                      <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                        <!--[if (gte mso 9)|(IE)]>
                          <table align="center" role="presentation">
                            <tbody>
                              <tr>
                                <td width="600">
                        <![endif]-->
                        <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                          <tbody>
                            <tr>
                              <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                                <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                        &#160;
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <img class="w-16" src="https://ik.imagekit.io/bk4vkk0xf/saimahavir/logos.jpeg" style="height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; width: 64px; border-style: none; border-width: 0;" width="64">
                                <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                        &#160;
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div class="space-y-4">
                                  <h1 class="text-4xl fw-800" style="padding-top: 0; padding-bottom: 0; font-weight: 800 !important; vertical-align: baseline; font-size: 36px; line-height: 43.2px; margin: 0;" align="left">Thanks for your order, ${reciever}</h1>
                                  <table class="s-4 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;" align="left" width="100%" height="16">
                                          &#160;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p class="" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">Your order for ${items} Items hasn't shipped yet, but we will send you an email when it does. Track your order on the saimahavir website.</p>
                                  <table class="s-4 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style="line-height: 16px; font-size: 16px; width: 100%; height: 16px; margin: 0;" align="left" width="100%" height="16">
                                          &#160;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="btn btn-red-500 rounded-full px-6 w-full w-lg-48" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 9999px; border-collapse: separate !important; width: 192px;" width="192">
                                    <tbody>
                                      <tr>
                                        <td style="line-height: 24px; font-size: 16px; border-radius: 9999px; width: 192px; margin: 0;" align="center" bgcolor="#dc3545" width="192">
                                          <a href="https://saimahavir.in" style="color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 9999px; line-height: 20px; display: block; font-weight: normal; white-space: nowrap; background-color: #dc3545; padding: 8px 24px; border: 1px solid #dc3545;">Track Your Order</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                        &#160;
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="card rounded-3xl px-4 py-8 p-lg-10" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 24px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                                  <tbody>
                                    <tr>
                                      <td style="line-height: 24px; font-size: 16px; width: 100%; border-radius: 24px; margin: 0; padding: 40px;" align="left" bgcolor="#ffffff">
                                        <h3 class="text-center" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 28px; line-height: 33.6px; margin: 0;" align="center">Receipt from Sai Mahavir Foods</h3>
                                        <p class="text-center text-muted" style="line-height: 24px; font-size: 16px; color: #718096; width: 100%; margin: 0;" align="center">ORDER-ID ${orderID_}</p>
                                        <table class="p-2 w-full" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                          <tbody>
                                          ${carttitle.map(x=>{
                                            return  `
                                            <tr>
                                              <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="left" width="100%">${x.title}</td>
                                              <td class="text-right" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="right" width="100%">${x.quantity}</td>
                                              <td class="text-right" style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="right" width="100%">&#8377;${x.price}</td>
                                            </tr>`
                                          }).join('')}
                                          <tr>
                                            <td style="line-height: 24px;font-weight:bold; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="left" width="100%">Amount Paid</td>
                                            <td class="text-right" style="line-height: 24px;font-weight:bold; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="right" width="100%">${items}</td>
                                            <td class="text-right" style="line-height: 24px;font-weight:bold; font-size: 16px; width: 100%; margin: 0; padding: 8px;" align="right" width="100%">&#8377;${total/100}</td>
                                          </tr>
                                          </tbody>
                                        </table>
                                        <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                          <tbody>
                                            <tr>
                                              <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                                &#160;
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                          <tbody>
                                            <tr>
                                              <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                          <tbody>
                                            <tr>
                                              <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                                &#160;
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">Ship To,<br/>
                                        ${f}</p>
                                        <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">
                                        Payment: ${gateway}
                                        status: ${paymentstatus}
                                        </p>
                                        <br/>
                                        <p style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left">If you have any questions, contact us at <a href="https://bootstrapemail.com" style="color: #0d6efd;">saimahavirfoods@gmail.com</a>.</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table class="s-6 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td style="line-height: 24px; font-size: 24px; width: 100%; height: 24px; margin: 0;" align="left" width="100%" height="24">
                                        &#160;
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    `  
  }).then( (message) => console.log(message))
}




function anonymous(event){
  event.preventDefault();
  var pop = document.getElementById("fetchorderid").value;
  fetchdata(pop);
}


//display function hide and unhide 
function authverified(){
  document.getElementsByClassName('rest')[0].style.display = "block";
  document.getElementsByClassName('auth')[0].style.display="none";
  document.getElementsByClassName('foot')[0].style.display="block";
  
  document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
}
function authnotverified(){
document.getElementsByClassName('rest')[0].style.display = "none";
document.getElementsByClassName('auth')[0].style.display="block";
document.getElementsByClassName('foot')[0].style.display="none";
document.getElementsByClassName('top-nav-bar')[0].style.display="none";
}
function auth(){
 document.getElementsByClassName('rest')[0].style.display = "none";
  document.getElementsByClassName('auth')[0].style.display="block";
  document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
}
function address(){
  document.getElementsByClassName('add')[0].style.display = "block";
}
function view(){
var id = document.getElementById('uid').innerText 
document.getElementsByClassName('order-id')[0]  = id;
document.getElementsByClassName('address_holder')[0].style.display = "block"
document.getElementsByClassName('custom-add')[0].style.display = "block";
document.getElementsByClassName('btn-payment')[0].style.display = "block";
document.getElementsByClassName('cart-items')[0].style.display = "none";
document.getElementsByClassName('btn-view-address')[0].style.display = "none";
document.getElementsByClassName('btn-cart-view')[0].style.display = "block";
document.getElementsByClassName('add')[0].style.display = "none";
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
function addressclose(){
  document.getElementsByClassName('add')[0].style.display = "none";
}
function payment(){
  document.getElementsByClassName('payment')[0].style.display = "block";
   var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    document.getElementsByClassName('date-time')[0].innerHTML = dateTime ;
  document.getElementsByClassName('addtocart')[0].style.display = "none";
  hideallproductsdata()
  document.getElementsByClassName('foot')[0].style.display="block";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  
}
function paymentclose(){
  hideallproductsdata()
  document.getElementsByClassName('addtocart')[0].style.display = "block";
  document.getElementsByClassName('rest')[0].style.display = "none";
  document.getElementsByClassName('payment')[0].style.display = "none";
  document.getElementsByClassName('cart-items')[0].style.display = "block";
  document.getElementsByClassName('address_holder')[0].style.display = "none";
  document.getElementsByClassName('custom-add')[0].style.display = "none";
  document.getElementsByClassName('btn-view-address')[0].style.display = "block";
  document.getElementsByClassName('btn-cart-view')[0].style.display = "none";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function displaycart(){
  document.getElementsByClassName('render')[0].innerHTML ="";
  document.getElementsByClassName('fetch')[0].style.display="none";
  document.getElementsByClassName('addtocart')[0].style.display = "block";
  document.getElementsByClassName('cart-items')[0].style.display = "block";
   document.getElementsByClassName('address_holder')[0].style.display = "none";
  document.getElementsByClassName('custom-add')[0].style.display = "none";
  hideallproductsdata()
  document.getElementsByClassName('rest')[0].style.display = "none";
  document.getElementsByClassName('payment')[0].style.display = "none";
  document.getElementsByClassName('foot')[0].style.display="block";
  document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
  document.getElementsByClassName('btn-cart-view')[0].style.display = "none";
  if(!address_flag){
    document.getElementsByClassName('btn-view-address')[0].style.display = "block";
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function hidecart(){
  document.getElementsByClassName('products')[0].style.display="none";
  document.getElementsByClassName('addtocart')[0].style.display = "none";
  document.getElementsByClassName('fetch')[0].style.display = "none";
  document.getElementsByClassName('rest')[0].style.display = "block";
  document.getElementById("mySidenav").style.width = "0";
  document.getElementsByClassName('foot')[0].style.display="block";
  document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
  
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function authc(){
if(document.getElementById('summer').checked == true) {  
 
  document.getElementById('signxup').style.display="block" ;
  document.getElementsByClassName('btn-sign-out')[0].style.display="none";
  document.getElementById('signxin').style.display="none" ;
  document.getElementById('signxmobile').style.display="none" ;
  document.getElementById('ex').style.display="none" ;
  
} 
else {  
       document.getElementById('signxup').style.display="none" ;
}  
}
function auths(){
if(document.getElementById('winter').checked == true) {  
  document.getElementById('signxin').style.display="block" ;
  document.getElementById('signxup').style.display="none" ;
  document.getElementsByClassName('btn-sign-out')[0].style.display="none";
  document.getElementById('signxmobile').style.display="none" ;
  document.getElementById('ex').style.display="none" ;
} 
else {  
       document.getElementById('signxup').style.display="none" ;
}  
}
function authr(){
if(document.getElementById('rain').checked == true) {  
 
  document.getElementById('signxin').style.display="none" ;
  document.getElementById('signxup').style.display="none" ;
  document.getElementById('signxmobile').style.display="block" ;
  document.getElementsByClassName('btn-sign-out')[0].style.display="none";
  document.getElementById('ex').style.display="none" ;
} 
else {  
  document.getElementById('signxup').style.display="none" ;
}  
}



function cartpage(){
  hideallproductsdata()
  attachskeleton()
  document.getElementsByClassName('address_holder')[0].style.display = "none";
  document.getElementsByClassName('fetch')[0].style.display="none";
  document.getElementsByClassName('custom-add')[0].style.display = "none";
  document.getElementsByClassName('btn-payment')[0].style.display = "block";
  document.getElementsByClassName('cart-items')[0].style.display = "block";
 document.getElementsByClassName('add')[0].style.display = "none";
 document.getElementsByClassName('btn-address')[0].style.display = "none";
}

function displayorder(){
  hideallproductsdata()
  var rr= document.getElementsByClassName('render')[0]
  if(rr){
    rr.innerHTML =''
  }
  document.getElementsByClassName('fetch')[0].style.display="block";
  document.getElementsByClassName('addtocart')[0].style.display = "none";
    document.getElementsByClassName('rest')[0].style.display = "none";
    document.getElementsByClassName('payment')[0].style.display = "none";
    document.getElementsByClassName('foot')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="none";
    document.getElementById("mySidenav").style.width = "0";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function products(index){
  attachskeleton()  
  document.getElementsByClassName('fetch')[0].style.display="none";
  document.getElementsByClassName('order-manipulation')[0].style.display = "none";
  document.getElementsByClassName('addtocart')[0].style.display = "none";
  var length = document.getElementsByClassName('products').length;
  for(var i=0;i<length;i++){
    if(i == index){
      document.getElementsByClassName('products')[i].style.display="block";
    }else{
      document.getElementsByClassName('products')[i].style.display="none";
    }
  }
   document.getElementsByClassName('rest')[0].style.display = "none";
   document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
   document.getElementsByClassName('foot')[0].style.display="block";
   document.getElementById("mySidenav").style.width = "0";
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
}

function returnhome(index){
  attachskeleton()
  document.getElementsByClassName('fetch')[0].style.display="none";
  document.getElementsByClassName('success')[0].style.display = "none";
  document.getElementsByClassName('addtocart')[0].style.display = "none";
  document.getElementsByClassName('rest')[0].style.display = "block";
  document.getElementsByClassName('payment')[0].style.display = "none";
  document.getElementById("mySidenav").style.width = "0";
  document.getElementsByClassName('foot')[0].style.display="block";
  document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
  var length = document.getElementsByClassName('products').length;
  for(var i=0;i<length;i++){
      document.getElementsByClassName('products')[i].style.display="none";
  }
  hideallproductsdata()
  var rr= document.getElementsByClassName('render')[0]
  if(rr){
    rr.innerHTML =''
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function hideallproductsdata(){
  var length = document.getElementsByClassName('products').length;
  for(var i=0;i<length;i++){
    document.getElementsByClassName('products')[i].style.display="none";
  }
}
function attachskeleton(){
  document.getElementsByClassName('render')[0].innerHTML = `
  <div class="skeleton">
	<div class="product-outer">
		<div class="ownslider">
		<i class="fa"></i>
		<div class="sk-img"></div>
		</div>
		<div class="cont">
		<p class="title"></p>
		<p class="desc"></p>
		<p class="price"></p> 
		<p class="tag"></p>
		<div class="size">
		<p></p>
		<p></p>
		</div>
		<p class="p-type"></p>
		<button class="btn shop-item-button-new"></button>
		</div>
	  </div>
		<div class="product-detail-des">
		<p></p>
		<p class="details"></p>
		</div>
	</div>`;
}