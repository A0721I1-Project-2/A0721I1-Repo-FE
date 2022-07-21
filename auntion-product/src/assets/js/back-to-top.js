$(document).ready(function (){
//Khi người dùng cuộn chuột thì gọi hàm scrollFunction
window.onscroll = function() {scrollFunction()};
// khai báo hàm scrollFunction
function scrollFunction() {
  // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    //nếu lớn hơn 20px thì hiện button
    document.getElementById("myBtn").style.display = "block";
  } else {
    //nếu nhỏ hơn 20px thì ẩn button
    document.getElementById("myBtn").style.display = "none";
  }
}
//gán sự kiện click cho button
document.getElementById('myBtn').addEventListener("click", function(){
  //Nếu button được click thì nhảy về đầu trang
  document.body.scrollTop = 800;
  document.documentElement.scrollTop = 800;
});
})
