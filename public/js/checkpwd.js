function check_pass() {
    if (document.getElementById("password").value ==
            document.getElementById("repassword").value) {
        document.getElementById("notice").style.display = "none";
        document.getElementById("submit").disabled = false;
        
    } else {
        document.getElementById("notice").style.display = "block";
        document.getElementById("submit").disabled = true;
    }
}
