$(document).ready(function () {
    getmyItems();
})

let myGameList = [];
let startnum = 0;
let endnum = 9;
let totalnum = 0;

const getmyItems = function () {
    $('.paging').empty();

    fetch('/myitem/getall', {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    }).then( resp => 
        resp.json()
    ).then( (text) => {
        myGameList = text;
        totalnum = myGameList.length;
        if(totalnum > 0){
            $('.my_items').show();
            $('.nodata_items').hide();
            changeGameList(startnum, endnum);
        }
        console.log(Math.floor(totalnum/9)+1)
        if(totalnum > 9){
            let moks = Math.floor(totalnum/9)+1;
            for(i = 1; i <= moks; i++){
                let btnTag = `
                    <li>
                        <button type="button" onclick="change('${i}')>${i}</button>
                    </li>
                `
                $('.paging').append(btnTag);
            }
        }
    }).catch(err => {
        $('.my_items').hide()
        $('.nodata_items').show()
    })
}

function change(num){
    startnum = (9 * num) -1;
    endnum = (9 * num)
    changeGameList(startnum, endnum);
}

function changeGameList(start, end){
    $('.tbody_content').empty();
    for(i = start; i < end; i++){
        if(i < totalnum){
            getGamez(myGameList[i])
        }
    }
}

const getGamez = function (gamename) {
    fetch('/getGameItem/'+gamename, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    }).then( resp =>
        resp.json()
    ).then( (text) => {
        let discount = text.discount;
        let price;
        if("" === discount || discount === null || discount === '0%'){
            price = text.price;
        }else{
            let realPrice = text.price - (text.price / 100 * (discount.replace('%','')));
            price = Math.ceil(realPrice / 10) * 10;
        }

        let addTableContent = `
            <tr>
                <td>
                    <img class="" src="${text.imagelink}">
                </td>
                <td class="table_content_name">${text.gamename}</td>
                <td class="table_content_category">${text.category}</td>
                <td class="table_content_price">${price}</td>
                <td class="table_content_delete">
                    <button type="button" class="btn_warn" onclick="deleteMyGames('${text.gamename}')">삭제</button>
                </td>
            </tr>
        `;
        $('.my_items').append(addTableContent);
    })
}

const deleteMyGames = function (gamename) {
    let chk = confirm(gamename+'을 삭제하시겠습니까?');
    if(chk){

        fetch('/myitem/delete/'+gamename, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
            },
        }).then( resp =>
            resp.text()
        ).then( (text) => {
            if( 'okay' === text){
                alert(gamename+'삭제를 성공하였습니다.');
                location.href='/myitem';
            }else{
                alert('Error. 게임 삭제를 실패하였습니다.')
;            }
        })
    }
}