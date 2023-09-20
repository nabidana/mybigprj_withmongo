$(document).ready(function () {
    getGames();
});

const getGames = function () {
    axios({
        url:'/getGames',
        method:"get",
    })
    .then( (res) => {
        let data = res.data;
        let totalpage = data.totalpage;
        let nowpage = data.nowpage;
        let gamelist = data.games;
        //배열 길이 출력
        //console.log(gamelist.content.length)
        //해쉬맵 가져오기
        //console.log(gamelist.content[0])
        for(i = 0 ; i < gamelist.content.length; i++){
            let tag =`
                <a href="/getGameItem?gamenae=${gamelist.content[i].gamename}">
                <img src="${gamelist.content[i].imagelink}">
                <p>${gamelist.content[i].gamename}</p>
                <p class="price">${gamelist.content[i].price}</p>
            `
            $('.products').append(tag);
        }
        if(nowpage != 0){
            let beforpage = `
                <li>
                    <a href="#" onclick="beforemove(${nowpage})">이전</a>
                </li>
            `
            $('.paging').append(beforpage);
        }
        for(i = nowpage; i < nowpage+5; i++){    
            if(i < totalpage){
                let nowpages = `
                    <li>
                        <button type="button" onclick="move(${i})">${i+1}</button>
                    </li>
                `
                $('.paging').append(nowpages);
            }
        }
    })
    .catch( (err) => {
        $('paging').append(`<p>Error. Server is Dead</p>`);
    })
}


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
const cstdologin = function (id, pwd) {

    let frm2 = document.createElement('form');
    frm2.action = "/dologin"
    frm2.method = "POST"
    console.log(id, pwd)
    let input1 = document.createElement('input');
    input1.setAttribute("type", "hidden");
    input1.setAttribute("name", "userId");
    input1.setAttribute("id", "userId");
    input1.setAttribute("value", id)
    let input2 = document.createElement('input');
    input1.setAttribute("type", "hidden");
    input1.setAttribute("name", "userPassword");
    input1.setAttribute("id", "userPassword");
    input1.setAttribute("value", pwd);

    frm2.appendChild(input1);
    frm2.appendChild(input2);
    document.body.appendChild(frm2)

    frm2.submit();
}