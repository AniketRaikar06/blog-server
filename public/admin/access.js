$(function() {
  $("#myTable").tablesorter();
});

$(function() {
  $("#myTable").tablesorter({ sortList: [[0,0], [1,0]] });
});

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
  
//for auth using email and password

function signUp(){
  var email = document.getElementById("semail");
  var password = document.getElementById("spassword");
  const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
}

function signIn(){
  var email = document.getElementById("signemail");
  var password = document.getElementById("signpassword");
  const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
}

function signOut(){
  firebase.auth().signOut();
  alert("Buy ! , see you soon");
}

firebase.auth().onAuthStateChanged(function(user){
  if(user){      
      if(user.email === null){
        window.location.replace("./adminlogin.html");
      }
      document.getElementById('userdetails').innerHTML = `
      <p><i class="fa fa-sign-in"></i> signed as </p>
      <p id="useremail"><i class="fa fa-user"></i> ${user.email}</p> <br/>
      <i class="fa fa-sign-out" onclick="signOut()"></i>`
      getdetails()
      listtickets()
    }
  else{
    window.location.replace("./adminlogin.html");
  }
});

//for sign up using phone number 
function sendotp(){
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          document.getElementById('otpno').style.display="block";
          document.getElementById('verifyotp').style.display="block";
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
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            console.log(error);
            // ...
          });
}


//for verifying otp 
function verify(){
const code = document.getElementById('otpno').value;
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  // ...
}).catch((error) => {
  alert(error)
  console.log("User couldn't sign in (bad verification code?");
  // ...
});
}

//admin functionalities
var id,orderid;
const arr =[]
var allorder =[]
var allAddress=[]

//function for fetching all the order from the firebase server 
function getdetails(){
  const db = firebase.database();
  const ref = db.ref('order_details/orders');
  // Attach an asynchronous callback to read the data at our posts reference

  ref.once('value', (snapshot ) => {
    snapshot.forEach( (childsnapshot) =>{
      childsnapshot.forEach((y)=>{
        let x  = childsnapshot.val()
       // console.log(x)       
        if(!y.val().OrderID){
          allAddress.push({data:y.val() , key:y.key})
        }else{
          allorder.push({data:y.val() , key:y.key})
        }
      })
    })
    allorder.map((x,index)=>{
      if(!x.data.OrderID){
      }else{
        var fetchorder = document.createElement('tr')
        var collect = document.getElementsByClassName('table_result')[0]
        var am = x.data.Cart_total / 100;
        var fetchorderdetails = `
        <tr>
          <th scope="row">${index+1}</th>
          <td>${x.data.OrderID}</td>
          <td>${x.data.Customer}</td>
          <td>${x.data.Order_Status}</td>
          <td>${am} &#8377 </td>
          <td>${x.data.Recievers_details}</td>
          <td style="color:#0099e3; cursor:pointer;" onclick="fetchdata( '${x.data.userID}' , ${x.data.OrderID})">View details</td>
        </tr>
      ` 
      fetchorder.innerHTML = fetchorderdetails
      collect.append(fetchorder)
      }     
    })

    const all = allorder.length ;
    const all1 = allAddress.length;
    const allemail  = allorder.length*2;
    document.getElementById('count_order').innerHTML = all;
    document.getElementById('count_user').innerHTML = all1;
    document.getElementById('count_email').innerHTML = allemail;
  });
}

//for fetching data based on userID
function fetchdata(userID , orderID){
  if(arr.length > 0){
    arr.pop()
    Attach()
  }
  const db = firebase.database();
  const ref = db.ref('order_details/orders/'+ `${userID}` );
  // Attach an asynchronous callback to read the data at our posts reference

  ref.once('value', (snapshot) => {
    snapshot.forEach( (childsnapshot) =>{
      let x  = childsnapshot.val()
      if(x.OrderID == orderID){
        arr.push( {data:x , key:childsnapshot.key })
      }
     
    })
    Attach()
  });
}
var collect = document.getElementsByClassName('adminresult')[0]

//displaying order detials on the admin page 
function Attach(){
  arr.map((x,index)=>{
    var fetchorder = document.createElement('div')
    //var collect = document.getElementsByClassName('adminresult')[0]
    var fetchorderdetails = `
    <div class="order">
    <p>Order ID - ${x.data.OrderID} | User ID - ${x.data.userID} </p> 
    <p>${x.data.Customer}</p>
    <p>${x.data.Email}</p>
    <p>Orders Details : <br/>
    ${x.data.Details.map(x => 
      {return(
        `name: ${x.title} | price: ${x.price} | size: ${x.size} | quantity: ${x.quantity} <br/>`
      )}
    )}
    </p>
    <p>${x.data.Quantity}</p>
    <p>Order status : <br/>
    <input type="text" class="orderstatus form-control" value="${x.data.Order_Status}"></p>
    <p>Payment status: <br/>
    <input type="text" class="paymentstatus form-control" value="${x.data.paymentstatus}"></p>
    <p>Payment Details : ${x.data.gateway}</p>
    <p> Payable Amount - ${x.data.Cart_total / 100} &#8377</p>
    <p>${x.data.PurchaseDate} - ${x.data.PurchaseTime}</p>
    <button class="btn btn-primary" onclick="Updatestatus( '${x.data.userID}','${x.key}', ${index} )">Update</button>
    
    </div>
  ` 
  if(document.getElementsByClassName('order')[0]){
    document.getElementsByClassName('order')[0].remove()
  }
  
  fetchorder.innerHTML = fetchorderdetails
  
  collect.append(fetchorder)
  })

}

//updating order status 
const Updatestatus=(userid,key,i)=>{
  const update = document.getElementsByClassName('orderstatus')[i].value
  const payment = document.getElementsByClassName('paymentstatus')[i].value
  firebase.database().ref('order_details/orders/'+userid+'/'+key).update({
    Order_Status:update,
    paymentstatus:payment
  })
}

//for listing support tickets
const listtickets=async ()=>{
  $.ajax({
    //http://localhost:3100/createOrder
    url : 'http://localhost:3100/listtickets',
    type: 'GET',
    headers: {"content-type":"application/json",
  "apikey":"58ddc702a1598164"},
    success: function(res){
      if(!res.error){
        attachticket(res.data);
      }
    },
    error:function(err){
      console.log(err)
    }})
}

function attachticket(data){
  var collect = document.getElementsByClassName('ticket_result')[0]
  data.map((x,index)=>{
  var fetchorder = document.createElement('tr')
        var fetchorderdetails = `
        <tr>
          <th scope="row">${index+1}</th>
          <td>${x.email}</td>
          <td>${x.message}</td>
          <td>${x.number}</td>
        </tr>
      ` 
      fetchorder.innerHTML = fetchorderdetails
      collect.append(fetchorder)
  })
}

