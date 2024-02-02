AOS.init();
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}else{
  ready();
}

function ready(){

  let removeToCartButton = document.getElementsByClassName('bunrem');
  for (let i = 0; i < removeToCartButton.length; i++){
    let button = removeToCartButton[i];
    button.addEventListener('click',  removeCartItem);
  }

  let qtyInputs = document.getElementsByClassName('cart-qty');
  for(let i = 0; i < qtyInputs.length; i++) {
    let input = qtyInputs[i];
    input.addEventListener('change', qtyChanged);
  }
  
  let addToCartButtons = document.getElementsByClassName('addcart-btn');
  for (let i = 0; i < addToCartButtons.length; i++){
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

function navbgChange(){
  let navbar = document.getElementById('navbar');
  let scrollvalue = window.scrollY;
  if(scrollvalue < 500){
    navbar.classList.remove('navbgChange');
  }else{
    navbar.classList.add('navbgChange');
  };
};
window.addEventListener('scroll', navbgChange);

let productList = document.querySelectorAll(".product-list li");
let active = "images/item-obento.webp";

productList.forEach((e) => {
  e.addEventListener("mouseenter", (event) => {
    productList.forEach((e) => {
      e.classList.remove("active");
    });

    event.target.classList.add("active");
    active = event.target.getAttribute("data-img");
    let banner = document.querySelector(".banner");
    banner.style.backgroundImage = `url('${active}')`;
  }); 
});

// all time fav carousel
const carousel = document.querySelector(".atf-container");
const arrowBtn = document.querySelectorAll(".atf-wrapper i")
const  firstThumbNail = carousel.querySelector(".atf-content").offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "prev" ? -firstThumbNail : firstThumbNail;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// all time fave show hidden container for each thumbnail
let atfList = document.querySelectorAll(".atf-content");

atfList.forEach((e) => {
  e.addEventListener("mouseenter", (event) => {
    atfList.forEach((e) => {
      e.classList.remove("atfActive");
      
    });

    event.target.classList.add("atfActive");
  });
});
// jquery when hover specific div-container/wrapper will show/hide
$(document).ready(function() {
    $(".target").mouseenter(function() {
       let targetIndex = $(this).index(".target") + 1;
       $(".assigned").fadeOut("fast");
    setTimeout(function() {
        $("#assigned" + targetIndex).fadeIn("slow");
    }, 250);
    });
   });


// bundles carousel 
const bunCarousel = document.querySelector(".bundles-container");
const bunArrowBtn = document.querySelectorAll(".bundles-wrapper i")
const  bunThumbNail = bunCarousel.querySelector(".bundles-content").offsetWidth;

let bunDragging = false, bunstartX, bunstartScrollLeft;

bunArrowBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    bunCarousel.scrollLeft += btn.id === "bunprev" ? -bunThumbNail : bunThumbNail;
  });
});

const bundragStart = (e) => {
  bunDragging = true;
  bunCarousel.classList.add("bundragging");
  bunstartX = e.pageX;
  bunstartScrollLeft = bunCarousel.scrollLeft;
}

const bundleDragging = (e) => {
  if(!bunDragging) return;
  bunCarousel.scrollLeft = bunstartScrollLeft - (e.pageX - bunstartX);
};

const bundleDragStop = () => {
  bunDragging = false;
  bunCarousel.classList.remove("bundragging");
}

bunCarousel.addEventListener("mousedown", bundragStart);
bunCarousel.addEventListener("mousemove", bundleDragging);
document.addEventListener("mouseup", bundleDragStop);


// when order btn is clicked order window will show
// computes the total amount to pay
$(document).ready(function(){
  $(".orderBtn").click(function(){
    let targetBtn = $(this).index(".orderBtn") + 1;
    $("#orderPage").show();
    $(".orderQty").on('input', function() {
      let inputNumber = $(this).val();
      let targetNumber = parseFloat($("#productPrice" + targetBtn).text());
      let result = inputNumber * targetNumber;
      $("#totalAmount").text("Total Amount: ₱" + result + ".00");
   });
  });
});

$(document).ready(function(){
  $(".submit-btn").click(function(){
    $("#orderPage").hide();
    document.getElementById("orderQty").value = 0;
    document.getElementById("totalAmount").innerHTML = "Total Amount: ₱0.00";
   });
});
document.getElementById('navCartIcon').addEventListener('click', function(){
  emptyCart();
});
$(document).ready(function(){
  $(".cart-close").click(function(){
    setTimeout(function(){
      $(".cart-popup-wrapper").fadeOut("fast");
    }, 250);
    $(".cart-paypage-wrapper").hide();
      $('.cart-popup-content').hide();
      $('.cart-thankyou-page').hide();
      $('#payPageOncart').show();
      shopMoreClicked()
      clearAllInputsUserInfo()
      clearAllInputsPayMeth()
      editBtnClicked()
  });
});
$(document).ready(function(){
  $(".cart-close-mobile").click(function(){
    setTimeout(function(){
      $(".cart-popup-wrapper").fadeOut("fast");
    }, 250);
    $(".cart-paypage-wrapper").hide();
      $('.cart-popup-content').hide();
      $('.cart-thankyou-page').hide();
      $('#payPageOncart').show();
      shopMoreMobileClicked()
      clearAllInputsUserInfo()
      clearAllInputsPayMeth()
      editBtnClicked()
  });
});

// // if addtocart button click it will add count in cart icon to indicate how many items are inside the cart
$(document).ready(function(){
  $(".addcart-btn").click(function(){
    let notif = document.getElementById("notification");
    
    notif.classList.add('show');

    setTimeout(function() {
      notif.classList.remove('show');
    }, 2000);
  });  
});





//removes the target item inside the cart
function removeCartItem(event) {
  let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      updateCartTotal();
      updateCountItems();
}

function qtyChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}


// if clicked target button it will add the target item in cart
function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement
  let prodDeetsBundles = shopItem.getElementsByClassName('item-oncart')[0].innerHTML;
  let imgSrc = shopItem.getElementsByClassName('imgSrc')[0].src;
  addItemToCart(prodDeetsBundles, imgSrc);
  updateCartTotal();
  updateCountItems();
}
// add item to cart 
function addItemToCart(prodDeetsBundles, imgSrc){
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  let cartItems = document.getElementsByClassName('cart-paypage-oncart')[0]
  let cartItemDupes = cartItems.getElementsByClassName('imgSrc');
  for (let i = 0; i < cartItemDupes.length; i++){
    if (cartItemDupes[i].src == imgSrc){
      $(".cart-itemduplicate-notif").show();
      return;
    }
  }
  let cartRowContentsBundles = `

  <div class="bundles-content item-oncart-content">
              <div class="bundles-imgcon">
                <img class="imgSrc" src="${imgSrc}">
              </div>
              <div class="bundles-deetscon item-oncart">
                ${prodDeetsBundles}
              </div>
              
              <button  id="bunRemove" class="bunrem">remove</button>
              <div class="bundles-inpcon" id="bunInpCon">
                <div class="bun-qtycon">
                  <p>Quantity:</p>
                  <input type="number" class="cart-qty" value="1">
                </div>
              </div>
          </div>
  `
  cartRow.innerHTML = cartRowContentsBundles;
  cartItems.insertBefore(cartRow, cartItems.firstChild);
  cartRow.getElementsByClassName('bunrem')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-qty')[0].addEventListener('change', qtyChanged);
}

function emptyCart() {
  let container = document.getElementById("payPageOncart");
  let count = container.getElementsByClassName("cart-row").length;
   
  document.getElementById("cartcount").innerHTML = count;
 
  if(count === 0){
    let notif = document.getElementById("cartEmptyNotif");
    
    notif.classList.add('show-empty-notif');

    setTimeout(function() {
      notif.classList.remove('show-empty-notif');
    }, 2000);
  }else{
    $(".cart-popup-wrapper").fadeIn("fast");
    setTimeout(function(){
      $(".cart-popup-content").fadeIn("slow");
    }, 250);
    $(".cartPay").show();
    $(".cart-thankyou-page").hide();
    
  }
 }

// Count the number of div elements inside the container
function updateCountItems() {
  let container = document.getElementById("payPageOncart");
  let countDiv = document.getElementsByClassName("cart-row");
   
  let count = container.getElementsByClassName("cart-row").length;
  console.log(count);
   
  document.getElementById("cartcount").innerHTML = count;
 }

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName('cart-paypage-oncart')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for(let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName('cart-qty')[0];
    let price = parseFloat(priceElement.innerText.replace('₱', ''));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
    
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = '₱ ' + total + '.00';
  document.getElementsByClassName('cart-total-amount')[0].innerText = '₱ ' + total + '.00';
}

function cartPayClicked(){
  $("#payPageOncart").css({
    width : '100%',
    overflowY: 'auto',
    height: '320px',
    overflowX : 'hidden'
});
$(".oncart-paypage").animate({
  width: '35%',
});
$("#payPageOncart .bundles-content").css({
  display : 'inline-block',
  width: '100%',
  height : '100%',
  paddingTop : '0px',
  paddingBottom : '10px',
});
$("#payPageOncart .bundles-content .bundles-imgcon").css({
  width : '100%',
  height : '150px',
  margin : '10px auto',
  paddingBottom : '0px',
  boxShadow: 'rgba(0, 0, 0, 0.8) 0px 5px 15px'
});
$("#payPageOncart .bundles-content .bundles-imgcon img").css({
  height : '100%',
});
$("#payPageOncart .bundles-content .bundles-deetscon").css({
  marginTop : '20px',
  marginLeft : '10px'
});
$("#payPageOncart .bundles-content .bundles-inpcon").css({
  width : '80%',
  marginTop : '0px',
  marginLeft : '30px'
});
$("#payPageOncart .bundles-content .bundles-inpcon .bun-qtycon").css({
  marginTop : '0px',
});
$("#payPageOncart .bundles-content .bundles-inpcon .bun-total").css({
  marginTop : '0px',
});
$(".cart-items .bundles-content button").css({
  marginTop : '12px',
});
  $(".cart-paypage-wrapper").show();
  $(".cart-sum-all-product").hide();
  $(".paypage-totalcon").show();
};
  

  function shopMoreClicked(){
    $(document).ready(function(){
        $("#payPageOncart").css({
          height: 'auto',
        }); 
        $(".cart-popup-content").css({
          height: '70vh !important'
        });
        $(".oncart-paypage").animate({
          width: '100%',
        });
        $("#payPageOncart .bundles-content").css({
          display : 'flex',
          flexDirection : 'row',
          height : '190px',
          gap : '30px',
          paddingBottom : '0px',
          paddingTop : '0px',
        });
        $(".cart-items .bundles-content .bundles-imgcon").css({
          width : '30%',
          height : '100%',
          paddingBottom : '0px',
          paddingTop : '0px',
          boxShadow: 'none',
          margin : '0px 0px'
        });
        $("#payPageOncart .bundles-content .bundles-deetscon").css({
          width : '180px',
          marginLeft : '0px'
        });
        $("#payPageOncart .bundles-content .bundles-inpcon").css({
          width : '30%',
          marginLeft : '0px'
        });
        $("#payPageOncart .bundles-content .bundles-inpcon .bun-qtycon").css({
          marginTop : '100px',
          width : '100px',
        });
        $("#payPageOncart .bundles-content .bundles-inpcon .bun-total").css({
          marginTop : '100px',
        });
        $(".cart-items .bundles-content button").css({
          marginTop : '5px',
        });
        $(".cart-paypage-wrapper").hide();
        $(".cart-sum-all-product").show();
        $(".paypage-totalcon").hide();
     });
  }
  $('.cartPay').click(function(){
    cartPayClicked()
  });
  $('.shopMore').click(function(){
    shopMoreClicked()
  });

  // $('.btn-cart').click(function(){
  //   $(".btn-cart").animate({
  //     width: '45%',
  //   });
  // })

  function cartPayMobileClicked(){
    $("#payPageOncart").css({
      width : '100%',
      overflowY: 'auto',
      height: '500px',
      overflowX : 'hidden',
      paddingBottom : '25px'
    });
    $(".oncart-paypage").animate({
      width: '45%',
    });
    $(".cart-popup-paypage").css({
      marginLeft : '0px'
    });
    $("#payPageOncart .bundles-content").css({
      display : 'inline-block',
      width: '100%',
      height : 'auto',
      paddingTop : '0px',
      paddingBottom : '20px',
    });
    $("#payPageOncart .bundles-content .bundles-imgcon").css({
      width : '100%',
      height : '150px',
      margin : '10px auto',
      paddingBottom : '0px',
      boxShadow: 'rgba(0, 0, 0, 0.8) 0px 5px 15px'
    });
    $("#payPageOncart .bundles-content .bundles-imgcon img").css({
      width : '100%',
      height : '100%',
    });
    $("#payPageOncart .bundles-content .bundles-deetscon").css({
      marginTop : '20px',
      marginLeft : '10px',
      height : '100px',
      width : '90%',
      lineHeight : '1.2'
    });
    $("#payPageOncart .bundles-content .bundles-inpcon").css({
      width : '80%',
      marginTop : '0px',
      marginLeft : '10px'
    });
    $("#payPageOncart .bundles-content .bundles-inpcon .bun-qtycon").css({
      marginTop : '30px',
    });
    $("#payPageOncart .bundles-content .bundles-inpcon .bun-total").css({
      marginTop : '0px',
    });
    $(".cart-items .bundles-content button").css({
      marginTop : '12px',
    });
      $(".cart-paypage-wrapper").show();
      $(".cart-sum-all-product").hide();
      $(".paypage-totalcon").show();
  };
 
  function shopMoreMobileClicked(){
    $(document).ready(function(){
        $("#payPageOncart").css({
          height: '100%',
          gap : '10px',
          paddingBottom : '115px'
        }); 
        $(".cart-popup-content").css({
          height: '100%'
        });
        $(".oncart-paypage").animate({
          width: '100%',
        });
        $("#payPageOncart .bundles-content").css({
          display : 'flex',
          flexDirection : 'row',
          height : '150px',
          gap : '10px',
          paddingBottom : '0px',
          paddingTop : '0px',
        });
        $(".cart-items .bundles-content .bundles-imgcon").css({
          width : '30%',
          height : '100%',
          paddingBottom : '0px',
          paddingTop : '0px',
          boxShadow: 'none',
          margin : '0px 0px'
        });
        $("#payPageOncart .bundles-content .bundles-deetscon").css({
          width : '180px',
          marginLeft : '0px',
          marginTop : '0px'
        });
        $("#payPageOncart .bundles-content .bundles-deetscon p").css({
          lineHeight : '14px',
        });
        $("#payPageOncart .bundles-content .bundles-inpcon").css({
          width : '30%',
          marginLeft : '0px'
        });
        $("#payPageOncart .bundles-content .bundles-inpcon .bun-qtycon").css({
          marginTop : '100px',
          width : '100px',
        });
        $("#payPageOncart .bundles-content .bundles-inpcon .bun-total").css({
          marginTop : '100px',
        });
        $(".cart-items .bundles-content button").css({
          marginTop : '5px',
        });
        $(".cart-paypage-wrapper").hide();
        $(".cart-sum-all-product").show();
        $(".paypage-totalcon").hide();
     });
  }
  $('.cartPayMobile').click(function(){
    cartPayMobileClicked()
  });
  $('.shopMoreMobile').click(function(){
    shopMoreMobileClicked()
  });


   
   $(document).ready(function(){
    $('.fa-circle-xmark').click(function() {
      $('.cart-itemduplicate-notif').hide();
    });
   });
   function capitalizeAllInputs() {
    var inputs = document.getElementsByClassName('inputText');
    for (var i = 0; i < inputs.length; i++) {
       if (inputs[i].type === 'text') {
         var words = inputs[i].value.split(' ');
         for (var j = 0; j < words.length; j++) {
           words[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1);
         }
         inputs[i].value = words.join(' ');
       }
    }
   }
  
   $(document).ready(function() {
    $('#paymentMethod').change(function() {
       let selectedOption = $(this).val();
       if (selectedOption === 'COD') {
         $('#codPayment').show();
         $('#onlinePayment').hide();
       } else if (selectedOption == 'onlinePay') {
          $('#codPayment').hide();
          $('#onlinePayment').show();
       }
    });
   });

   $(document).ready(function() {
    $('#bankWallet').change(function() {
       let selectedOption = $(this).val();
       if(selectedOption === 'bank') {
        $('#bankOption').show();
        $('#ewalletOption').hide();
       document.getElementById('placeOrder').removeEventListener('click', ewalletPlaceOrderClick);
       document.getElementById('placeOrder').addEventListener('click', bankPlaceOrderClick);
        
     }else if (selectedOption === 'ewallet') {
        $('#bankOption').hide();
        $('#ewalletOption').show();
        document.getElementById('placeOrder').removeEventListener('click', bankPlaceOrderClick);
        document.getElementById('placeOrder').addEventListener('click', ewalletPlaceOrderClick);
      }
    });

    function ewalletPlaceOrderClick() {
      let inpEwalletAccName = document.getElementById("inpEwalletAccName").value;
      let inpEwalletCardNum = document.getElementById("inpEwalletCardNum").value;
      let inpEwalletCvv = document.getElementById("inpCvv").value;

  
      if (inpEwalletAccName.trim() === "") {
        $('.input-alert13').show();
        }else if(inpEwalletCardNum.trim() === ""){
          $('.input-alert14').show();
        }else if(inpEwalletCardNum.length < 13){
          $('.input-alert14').show();
        }else{
          $(".cart-paypage-wrapper").hide();
            $('.cart-popup-content').hide();
              $('.cart-thankyou-page').show();
                $(".cart-sum-all-product").show();
                  $(".paypage-totalcon").hide();
                    $('.cart-row').remove();
                            $("#payPageOncart").css({
                              overflowY: 'hidden',
                              height: 'auto'
                            }); 
                            $(".oncart-paypage").animate({
                              width: '100%',
                            });
                            updateCountItems();
                            updateCartTotal();
      }
    }
    function bankPlaceOrderClick() {
      let inpNameOnCard = document.getElementById("inpNameOnCard").value;
      let inpCardNumber = document.getElementById("inpCardNumber").value;
      let inpCvv = document.getElementById("inpCvv").value;
      if (inpNameOnCard.trim() === "") {
        $('.input-alert10').show();
          }else if(inpCardNumber.trim() === ""){
            $('.input-alert11').show();
            }else if(inpCardNumber.length < 24){
              $('.input-alert11').show();
              }else if(inpCvv.trim() === ""){
              $('.input-alert12').show();
              }else if(inpCvv.length < 3){
                $('.input-alert12').show();
                } else{
                $(".cart-paypage-wrapper").hide();
                  $('.cart-popup-content').hide();
                    $('.cart-thankyou-page').show();
                      $(".cart-sum-all-product").show();
                        $(".paypage-totalcon").hide();
                          $('.cart-row').remove();
                            updateCountItems();
                            updateCartTotal();
                                  $("#payPageOncart").css({
                                    overflowY: 'hidden',
                                    height: 'auto'
                                  }); 
                                  $(".oncart-paypage").animate({
                                    width: '100%',
                                  });
            } 
    }
   });
   let bankInputs = document.getElementById('onlinePayment').getElementsByTagName('input');
    for (let i = 0; i < bankInputs.length; i++) {
      bankInputs[i].addEventListener('keydown', function() {
      $('.input-alert10').hide();
      $('.input-alert11').hide();
      $('.input-alert12').hide();
      $('.input-alert13').hide();
      $('.input-alert14').hide();
    });
    }
   
  document.getElementById('payPageSubmit').addEventListener('click', function() {
    blankInput();
   });
   document.getElementById('payPageEdit').addEventListener('click', function() {
    editBtnClicked()
   });
   function editBtnClicked(){
        let inputs = document.getElementById('payPageUserInfo').getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].disabled = false;
        }
        setTimeout(function() {
          $(".cart-paypage-compute").fadeOut("slow");
      }, 250)  
      $('.paypage-edit-btn').hide();
      $('.paypage-submit-btn').show();
   };
function blankInput(){
  let inpName = document.getElementById("inpName").value;
  let email = document.getElementById('inpEmail').value;
  let inpAddress = document.getElementById("inpAddress").value;
  let inpCity = document.getElementById("inpCity").value;
  let inpBrgy = document.getElementById("inpBrgy").value;
  let inpZip = document.getElementById("inpZip").value;
  if(inpName.trim() === ""){
    $('.input-alert1').show()
    }else if(!validateEmail(email)){
      $('.input-alert2').show()
      }else if(inpAddress.trim() === ""){
        $('.input-alert3').show()
        }else if(inpCity.trim() === ""){
          $('.input-alert4').show()
          }else if(inpBrgy.trim() === ""){
            $('.input-alert5').show()
            }else if(inpZip.trim() === ""){ 
              $('.input-alert6').show()
              }else if(inpZip.length < 4){
                $('.input-alert6').show()
                }else{
                let inputs = document.getElementById('payPageUserInfo').getElementsByTagName('input');
                  for (let i = 0; i < inputs.length; i++) {
                    inputs[i].disabled = true;
                  }
                    setTimeout(function() {
                      $(".cart-paypage-compute").fadeIn("slow");
                    }, 250)      
                      $('.paypage-edit-btn').show();
                      $('.paypage-submit-btn').hide();
                      }
}
// Attach keydown event to all input fields
let userInputs = document.getElementById('payPageUserInfo').getElementsByTagName('input');
for (let i = 0; i < userInputs.length; i++) {
  userInputs[i].addEventListener('keydown', function() {
  $('.input-alert1').hide();
  $('.input-alert2').hide();
  $('.input-alert3').hide();
  $('.input-alert4').hide();
  $('.input-alert5').hide();
  $('.input-alert6').hide();
 });
}
function clearAllInputsUserInfo() {
  var inputs = document.getElementById('payPageUserInfo').getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
  }
}
function clearAllInputsPayMeth() {
  var inputs = document.getElementById('payPagePayMeth').getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
  }
}
   function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail)\.com$/;
    return re.test(String(email).toLowerCase());
   }
   function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var inputField = document.getElementById("inpCardNumber");
   
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

      if (inputField.value.length >= 24) {
        return false;
      }
      
    if (inputField.value.length % 5 == 0 && inputField.value.length != 0) {
      inputField.value += '-';
    }
    return true;
    }
    function isNumberCvv(evt) {
      var charCode = (evt.which) ? evt.which : event.keyCode;
      var inputField = document.getElementById("inpCvv");
     
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
     if (inputField.value.length >= 3) {
   return false;
 }
      return true;
      }

  function isNumberGcash() {
    var inputField = document.getElementById("inpEwalletCardNum");
    var inputValue = inputField.value.replace(/[^0-9]/g, '');
    var formattedValue = '';
    
    if(inputField.value.length >= 13) {
      return false;
    }else if (inputValue.length > 9) {
        formattedValue += inputValue.substring(0, 4) + '-';
        formattedValue += inputValue.substring(4, 7) + '-';
        formattedValue += inputValue.substring(7);
    }else {
        formattedValue = inputValue;
    }

    inputField.value = formattedValue;
}


function codContactNumber() {
  var inputField = document.getElementById("inpCodContact");
  var inputValue = inputField.value.replace(/[^0-9]/g, '');
  var formattedValue = '';
  
  if(inputField.value.length >= 13) {
    return false;
  }else if (inputValue.length > 9) {
      formattedValue += inputValue.substring(0, 4) + '-';
      formattedValue += inputValue.substring(4, 7) + '-';
      formattedValue += inputValue.substring(7);
  }else {
      formattedValue = inputValue;
  }

  inputField.value = formattedValue;
}

document.getElementById('codPlaceOrderBtn').addEventListener('click', function(){
  codInputCheck();
});
function codInputCheck(){
  let inputContactNum = document.getElementById('inpCodContact').value;
  let inputLandMark = document.getElementById('inpCodLandMark').value;
  let inputCareOff = document.getElementById('inpCodCareOff').value;

  if(inputContactNum.trim() === ""){
    $('.input-alert7').show();
  }else if(inputContactNum.length < 13) {
    $('.input-alert7').show();
  }else if(inputLandMark.trim() === ""){
    $('.input-alert8').show();
  }else if(inputCareOff.trim() === ""){
    $('.input-alert9').show();
  }else{
    $(".cart-paypage-wrapper").hide();
            $('.cart-popup-content').hide();
              $('.cart-thankyou-page').show();
                $(".cart-sum-all-product").show();
                  $(".paypage-totalcon").hide();
                    $('.cart-row').remove();
                      updateCountItems();
                      updateCartTotal();
                            $("#payPageOncart").css({
                              overflowY: 'hidden',
                              height: 'auto'
                            }); 
                            $(".oncart-paypage").animate({
                              width: '100%',
                            });
  }
}
let codInputs = document.getElementById('codPayment').getElementsByTagName('input');
for (let i = 0; i < codInputs.length; i++) {
  codInputs[i].addEventListener('keydown', function() {
  $('.input-alert7').hide();
  $('.input-alert8').hide();
  $('.input-alert9').hide();
 });
}

let scrollable = document.querySelector('.bestsale-container');

scrollable.addEventListener('scroll', function () {
    let scrollbarThumb = scrollable.querySelector('::-webkit-scrollbar-thumb');

    if (scrollbarThumb) {
        scrollbarThumb.style.opacity = 1;
    }
});

scrollable.addEventListener('mouseleave', function () {
    let scrollbarThumb = scrollable.querySelector('::-webkit-scrollbar-thumb');

    if (scrollbarThumb) {
        scrollbarThumb.style.opacity = 0;
    }
});