function _(x){
    return document.querySelector(x);
}
function ajaxObj(meth, url){
    var hr = new XMLHttpRequest();
    hr.open(meth, url, true);
    return hr;
}
function ajaxReturn(hr){
    if(hr.readyState == 4 && hr.status == 200){
        return true;
    }
}
db = openDatabase('screenbook', '1.0', 'Screenbook database', 5*1024*1024);