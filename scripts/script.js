document.getElementById("nav").style.display = "none";
document.getElementById("vocabulary").style.display = "none";
document.getElementById("FAQ").style.display = "none";





document.getElementById("get-started-btn").addEventListener("click",function (event) {
    const pass = document.getElementById("password").value;
    if ( "1234" === pass ) {
        document.getElementById("nav").style.display = "block";
        document.getElementById("vocabulary").style.display = "block";
        document.getElementById("FAQ").style.display = "block";

        document.getElementById("Banner").style.display = "none";
        
    } else {
        alert("The password is not 1234");
    }
})