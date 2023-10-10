$(document).ready( function () {
    getUserInfor();
})
const getUserInfor = function () {
    fetch("/modifyuser/get", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    }).then( resp =>
        resp.json()
    ).then ( (text) => {
        let isiterr = text.err;
        if('Y' === isiterr){
            alert('정보를 찾을 수 없습니다.');
            self.close()
        }else{
            let id = text.id
            let pw = text.pw

            let tagString = `
                ID : <input type="text" id="userId" name="userId" value="${id}">
                PW : <input type="text" id="userPassword" name="userPassword" value="${pw}">
                <button type="button" onclick="doModify()">수정하기</button>
                <button type="button" onclick="closed()">돌아가기</button>
            `
            $('.modify-form').append(tagString);
        }
    })
}

function doModify(){
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

    window.opener.domodifys(id, pwd);
    self.close();
}

function closed(){
    self.close();
}