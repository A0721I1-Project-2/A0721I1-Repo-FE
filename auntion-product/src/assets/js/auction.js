let arrayImage = ["src/assets/img/auction/image1.jpg", "src/assets/img/auction/image2.jpg", "src/assets/img/auction/image3.jpg", "src/assets/img/auction/image4.jpg", "src/assets/img/auction/image5.jpg", "src/assets/img/auction/image6.jpg", "src/assets/img/auction/image7.jpg"];

$(document).ready(function() {
  document.getElementById('mainImage').src = arrayImage[0];
  document.getElementById('numbertext').innerText = "1/" + arrayImage.length;
  for (let index = 0; index < arrayImage.length; index++) {
    document.getElementById('dot').innerHTML += `<span class="dot" onclick="currentSlide(`+ index +`)"></span>`;
  }
})

function selectImage(src) {
  console.log(src);
  document.getElementById('mainImage').src = src;
}

function plusPrice() {
  let currentPrice = document.getElementById('price').value;
  let priceStep = document.getElementById('priceStep').innerText;
  let price = Number(currentPrice) + Number(priceStep);
  document.getElementById('price').value = price;
}

function minusPrice() {
  let currentPrice = document.getElementById('price').value;
  let priceStep = document.getElementById('priceStep').innerText;
  let price = Number(currentPrice) - Number(priceStep);
  document.getElementById('price').value = price;
}

// Set the date we're counting down to
var countDownDate = new Date("July 8, 2022 21:30:00").getTime();
// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("time-remain").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("time-remain").innerHTML = "Finished";
    document.getElementById("winner").innerHTML = "Winner";
  }
}, 1000);

function prevImage() {
  let src = document.getElementById('mainImage').src;
  let image = "";
  let numberText;
  if (src.indexOf(arrayImage[0]) == -1) {
    for (let index = 1; index < arrayImage.length; index++) {
      if (src.indexOf(arrayImage[index]) != -1) {
        image = arrayImage[index - 1];
        numberText = index;
        break;
      }
    }
    document.getElementById('mainImage').src = image;
    document.getElementById('numbertext').innerText = numberText + "/" + arrayImage.length;
  } else {
    document.getElementById('mainImage').src = arrayImage[arrayImage.length - 1];
    document.getElementById('numbertext').innerText = arrayImage.length + "/" + arrayImage.length;
  }
}

function nextImage() {
  let src = document.getElementById('mainImage').src;
  let image = "";
  let numberText;
  if (src.indexOf(arrayImage[arrayImage.length - 1]) == -1) {
    for (let index = 0; index < arrayImage.length - 1; index++) {
      if (src.indexOf(arrayImage[index]) != -1) {
        image = arrayImage[index + 1];
        numberText = index + 2;
        console.log(numberText)
        break;
      }
    }
    document.getElementById('mainImage').src = image;
    document.getElementById('numbertext').innerText = numberText + "/" + arrayImage.length;
  } else {
    document.getElementById('mainImage').src = arrayImage[0];
    document.getElementById('numbertext').innerText = 1 + "/" + arrayImage.length;
  }
}

function currentSlide(index) {
  document.getElementById('mainImage').src = arrayImage[index];
  document.getElementById('numbertext').innerText = (index + 1) + "/" + arrayImage.length;
}
