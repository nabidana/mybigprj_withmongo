function login() {
    let option = "width = 700, height = 700, top = 100, left = 200, location=no, toolbars=no, status=no, menubar=no";
    let url = '/login'
    window.open("", "loginPage", option);

    let frm = document.createElement('form');
    frm.action = url
    frm.method = 'POST';
    frm.target = "loginPage";
    document.body.appendChild(frm);
    frm.submit();
}

function signup() {
    let option = "width = 700, height = 700, top = 100, left = 200, location=no, toolbars=no, status=no, menubar=no";
    let url = '/signup'
    window.open("", "signupPage", option);

    let frm = document.createElement('form');
    frm.action = url
    frm.method = 'POST';
    frm.target = "signupPage";
    document.body.appendChild(frm);
    frm.submit();
}

function modifyuser(){
    let option = "width = 700, height = 700, top = 100, left = 200, location=no, toolbars=no, status=no, menubar=no";
    let url = '/modifyuser'
    window.open("","modifyuserPage",option);

    let frm = document.createElement('form');
    frm.action = url
    frm.method="POST"
    frm.target="modifyuserPage"
    document.body.appendChild(frm)
    frm.submit()
}

function dosignup(id, pwd){
    cstdosignup(id, pwd);
}
const cstdosignup = function (id, pwd) {

    axios({
        url:'/signup',
        method:"put",
        data:{
            userId : id,
            userPassword : pwd
        }
    })
    .then( (res) => {
        console.log(res)
        let data = res.data;
        if(data === 'OKAY'){
            alert("회원가입 요청 성공");
        }else{
            alert("회원가입 실패");
        }
    })
    .catch( (err) => {
        alert("에러. 서버 응답 불가");
    })
}

function dologin(id, pwd){
    cstdologin(id, pwd);
}
const cstdologin = function (ids, pwd) {

    let frm2 = document.createElement('form');
    frm2.action = "/dologin"
    frm2.method = "POST"
    console.log(ids, pwd)
    let input1 = document.createElement('input');
    input1.setAttribute("type", "hidden");
    input1.setAttribute("name", "userId");
    input1.setAttribute("id", "userId");
    input1.setAttribute("value", ids)

    let input2 = document.createElement('input');
    input2.setAttribute("type", "hidden");
    input2.setAttribute("name", "userPassword");
    input2.setAttribute("id", "userPassword");
    input2.setAttribute("value", pwd);

    frm2.appendChild(input1);
    frm2.appendChild(input2);
    document.body.appendChild(frm2)

    frm2.submit();
}

function domodifys(id, pwd){
    cstmodifys(id,pwd);
}
const cstmodifys = function (id, pwd) {
    fetch('/modifyuser/modify', {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            userid:id,
            userpw:pwd
        })
    }).then( resp =>
        resp.text()
    ).then( (text) => {
        console.log(text)
        if( 'error' === text){
            alert('err. 서버를 확인해주세요')
        }else if('cant match' === text){
            alert('수정하는 회원을 확인해주세요')
            location.href='/logout'
        }else{
            alert('정보 수정 성공.\n다시 로그인 해주세요')
            location.href='/logout'
        }
    })
}