
function insert_data(){
          
          var payload = {"Email":document.getElementById('mail').value,"Restaurant_name":document.getElementById('name').value,"Phone_no":document.getElementById('phone').value,"Address":document.getElementById('street').value,"City":document.getElementById('city').value,"Donator_name":document.getElementById('owner').value,"Preference":document.getElementById('mp').value,"Availability":document.getElementById('num').value}
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", 'application/json;charset=utf-8');
          
          var raw = JSON.stringify(payload);
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          alert("Note the order ID to cancel your order")
          
          
          fetch("/server/food_donation_function/insert_data",requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error',error));
            window.location.href="orders.html";
      }
 
      
$(document).ready(function(){

        //Fires the GET API defined in the function on page load
      // All URLs to the Advanced I/O function will be of the pattern: /server/{function_name}/{url_path}
        $.ajax({
            type: 'GET',
              url: '/server/food_donation_function/order', 
            success: function(html){
                //Appends the items to the HTML from the server on success
                $("#order-list-div ul").append(html);
            }
        });
    

   
      });
function close_order(){
          
        var payload = {"Order_ID":document.getElementById('ID').value}
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json;charset=utf-8');
        
        var raw = JSON.stringify(payload);
        
        var requestOptions = {
         
          body: raw,
         
        };
        alert('Order has been canceled successfully');
        
        
        fetch("/server/food_donation_function/close_order",requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error',error));
          
          window.location.href="index.html";
    }


   

/*------------------------------------------------------------*/

function fill_data(){
          
  var payload = {"Email":document.getElementById('mail1').value,"Trust_name":document.getElementById('name1').value,"Phone_no":document.getElementById('phone1').value,"Address":document.getElementById('street1').value,"City":document.getElementById('city1').value,"Acceptor_name":document.getElementById('owner1').value,"Type":document.getElementById('ty').value,"No_of_members":document.getElementById('mem').value}
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", 'application/json;charset=utf-8');
  
  var raw = JSON.stringify(payload);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  alert("Contact the donator to get food")
  
  
  fetch("/server/food_donation_function/fill_data",requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error',error));
    window.location.href="index.html";
}
