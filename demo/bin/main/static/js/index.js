$(document).ready(function () {
    getGames();
});

let nowpage;
let totalpage;
let searchword;
function user_search(){
    searchword = $('#searchText').val();
    getGames();
}

const getGames = function () {
    $('.products').empty();
    let url = '/getGames?'
    if( nowpage != null && nowpage != ""){
        url += 'page='+(nowpage-1)+'&';
    }
    if(searchword != null && searchword != ""){
        url += 'word='+searchword+'&';
    }

    axios({
        url:url,
        method:"get",
    })
    .then( (res) => {
        let data = res.data;
        let totalpage = data.totalpage;
        let nowpage = data.nowpage+1;
        let gamelist = data.games;
        //배열 길이 출력
        //console.log(gamelist.content.length)
        //해쉬맵 가져오기
        //console.log(gamelist.content[0])
        for(i = 0 ; i < gamelist.content.length; i++){
            let tag =`
                <a href="/getGameItem?gamename=${gamelist.content[i].gamename}">
                <img src="${gamelist.content[i].imagelink}">
                <p>${gamelist.content[i].gamename}</p>
                <p class="price">${gamelist.content[i].price}</p>
            `
            $('.products').append(tag);
        }

        let startnum = nowpage - (nowpage % 5 - 1);
        let endpage = startnum + 4;
        $('.paging').empty();

        if( nowpage > 5){
            let beforpage = `
                <li>
                    <button type="button" onclick="before('${startnum}')">이전</button>
                </li>
            `;
            $('.paging').append(beforpage);
        }

        for( i = startnum; i <= endpage; i++){
            if(i == nowpage){
                let pagenation = `
                    <li>
                        <button style="background-color: blue; color: white;" type="button" onclick="move('${i}')">${i}</button>
                    <li>
                `;
                $('.paging').append(pagenation);
            }else if( i <= totalpage){
                let pagenation = `
                    <li>
                        <button type="button" onclick="gonext('${endpage}')">${i}</button>
                    <li>
                `;
                $('.paging').append(pagenation);
            }
        }
        
        if( totalpage > endpage){
            let nextpage = `
            <li>
                <button type="button" onclick="next">다음</button>
            </li>
            `;
            $('.paging').append(nextpage);
        }
    })
    .catch( (err) => {
        $('paging').append(`<p>Error. Server is Dead</p>`);
    })
}

function move(nums){
    nowpage = nums;
    getGames();
}
function before(startnum){
    nowpage = startnum - 1;
    getGames();
}
function gonext(endnum){
    nowpage = endnum + 1;
    getGames();
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
