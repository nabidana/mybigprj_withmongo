function wantsignup(){
    let id = $('#userId').val()
    if(id.length < 3){
        alert("ID글자의 길이는 3글자 이상으로 해주세요");
        return
    }
    let pwd = $('#userPassword').val();
    if(pwd.length < 6){
        alert("패스워드의 길이는 6글자 이상으로 해주세요");
        return
    }

    window.opener.dosignup(id, pwd);
    self.close();
}

function closed() {
    self.close();
}