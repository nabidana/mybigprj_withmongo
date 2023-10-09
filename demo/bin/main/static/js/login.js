function logins(){
    let id = $('#userId').val();
    if(id.length < 1){
        alert('ID를 입력해주세요')
        return
    }
    let pwd = $('#userPassword').val();
    if(pwd.length < 1){
        alert('패스워드를 입력해주세요');
        return
    }

    window.opener.dologin(id, pwd);
    self.close();
}

function closed(){
    self.close();
}