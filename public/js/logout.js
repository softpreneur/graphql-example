_("#logout").addEventListener("click", logout_script, false);
//Logout script for user (examinee);
function logout_script(){
    var hr = new XMLHttpRequest();
	var url = "http://sbook.motionwares.com/app_requests/requests/logout.php";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	hr.withCredentials = true;
    hr.onreadystatechange = function (){
        if(hr.readyState == 4 && hr.status == 200){
            var d = JSON.parse(hr.responseText); 
            if(d.s){
                window.location = '../index.html';
            } else if(d.not_loggedin){
                window.location = '../index.html';
            }
            else{
				window.location = '../index.html';
            }
        }
    }
    hr.send("ulogout="+1);
}
//Viewing user name
window.addEventListener('load',function(){
	_('.name').innerHTML = localStorage.getItem('name');
});