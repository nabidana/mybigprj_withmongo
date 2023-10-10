let nowpage;
let totalpage;
let searchword;

$(document).ready(function () {
    readyforcontent();
});

const readyforcontent = function () {
    $('.tbody_content').empty();
    let url = '/useraccount/getAlluser?';
    if( nowpage != null && nowpage != ""){
        url += 'page='+(nowpage-1)+'&';
    }
    if(searchword != null && searchword != ""){
        url += 'word='+searchword+'&';
    }
    //console.log(url);
    axios({
        url:url,
        method:"post",
    })
    .then( (res) => {
        // console.log(res);
        //console.log(res.data);
        let data = res.data;
        nowpage = data.nowpage+1;
        totalpage = data.totalpage;
        let userlist = data.userlist;
        //console.log(userlist[1].userRole);

        for(i = 0 ; i < userlist.length; i++){
            if( userlist[i].userRole == "ADMIN"){
                continue;
            }
            let tag = `
                <tr>
                    <td>${userlist[i].userId}</td>
                `;
            if(userlist[i].userRole == "USER"){
                tag += `
                    <td>사용자</td>
                `;
            }else{
                tag +=`
                    <td>${userlist[i].userRole}</td>
                `;
            }

            if(userlist[i].enabled == true){
                tag += `
                    <td style="background-color: green;">활성화</td>
                    <td>
                        <button type="button" class="redbtn" onclick="doabled('${userlist[i].userId}','disabled')">비활성화</button>
                    </td>
                    <td>
                        <button type="button" class="yellowbtn" onclick="cleanpwd('${userlist[i].userId}')">패스워드 초기화</button>
                    </td>
                `;
            }else{
                tag += `
                    <td style="background-color: red;">비활성화</td>
                    <td>
                        <button type="button" class="greenbtn" onclick="doabled('${userlist[i].userId}','enabled')">활성화</button>
                    </td>
                    <td>
                        해당사항 없음
                    </td>
                `;
            }

            tag +=`
            <td>
                <button type="button" class="redbtn" onclick="removeed('${userlist[i].userId}')">사용자 삭제</button>
            </td>
            </tr>
            `;
            $('.tbody_content').append(tag);
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

    })
}

function move(nums){
    nowpage = nums;
    readyforcontent();
}
function before(startnum){
    nowpage = startnum - 1;
    readyforcontent();
}
function gonext(endnum){
    nowpage = endnum + 1;
    readyforcontent();
}

const cleanpwd = function (userid) {
    let checks = confirm(userid+' 의 패스워드를 초기화 하시겠습니까?');
    if(!checks){
        return;
    }
    fetch("/useraccount/cleanUser", {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: userid
    }).then( resp => 
        resp.text()
    ).then( (text) => {
        let txt = text;
        if("okay" === txt){
            alert(userid+' 패스워드 초기화 성공.');
        }else{
            alert(userid+' 패스워드 초기화 실패.');
        }
    })
}

const doabled = function (userid, able) {
    let abled = "";
    if("disabled" === able){
        abled = "비활성화";
    }else{
        abled = "활성화";
    }
    let checks = confirm(userid+' 를 '+abled+' 하시겠습니까?');
    if(!checks){
        return;
    }
    fetch("/useraccount/ableUser", {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            userid:userid,
            able:able
        })
    }).then( resp => {
        let status = resp.status;
        if(status === 200){
            readyforcontent();
            alert(userid+" "+abled+" 성공.");
        }else{
            alert(userid+" "+abled+" 실패.");
        }
    })
}

function user_search(){
    searchword = $('#searchText').val();
    readyforcontent();
}

const removeed = function (userid) {
    let checks = confirm('경고!\n'+userid+'를 삭제하시겠습니까?');
    if(!checks){
        return;
    }
    fetch("/useraccount/deleteUser", {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
        body: userid
    }).then( resp => 
        resp.text()
    ).then( (text) => {
        let types = text;
        if("true" === types){
            readyforcontent();
            alert("사용자 삭제 성공.")
        }else{
            alert("사용자 삭제 실패.");
        }
    })
}