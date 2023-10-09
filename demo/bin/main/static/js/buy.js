$(document).ready(function () {
    getCarts();
})

let nowgamelist = [];
let totalPrice = 0;

const getCarts = function () {
    $('.tbody_content').empty();
    $('.nodataCart').empty();
    $('.totalPriceDiv').empty();
    $('.footer').empty();
    $('.all_dt').empty();
    totalPrice = 0;
    fetch("/buy/getUserCart", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    }).then( resp =>
        resp.text()
    ).then( (text) => {
        let txt = text;
        if("null" === txt){
            $('.userCart').hide();
            $('.nodataCart').show();
            let list_content = `
                <span>장바구니에 담긴 물품이 없습니다.</span>
            `;
            $('.nodataCart').append(list_content);
            let btns = `
                <button type="button" class="btn_back" onclick="location.href='/'">뒤로가기</button>
            `
            $('.footer').append(btns);
        }else{
            $('.userCart').show();
            $('.nodataCart').hide();

            let gameLists = txt.split("||");
            for(i = 0; i < gameLists.length-1; i++){
                nowgamelist.push(gameLists[i]);
                getGames(gameLists[i]);
            }
            let btns = `
                <button type="button" class="buy_btn" onclick="userbuyit()">구매하기</button>
                <button type="button" class="btn_back" onclick="location.href='/'">뒤로가기</button>
            `
            $('.footer').append(btns);
        }
    })
}

const getGames = function (gamename) {
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
                <td>${text.gamename}</td>
                <td>${text.category}</td>
                <td>${price}</td>
                <td>${discount}</td>
                <td>
                    <button type="button" class="btn_warn" onclick="deleteCart('${text.gamename}')">제거</button>
                </td>
            </tr>
        `
        $('.tbody_content').append(addTableContent);
        totalPrice += Number(price);
        let totalprice_str = `
            <p class="count_num"> 총 금액 : ${totalPrice} 원 </p>
        `;
        $('.totalPriceDiv').html(totalprice_str);
    })
}

const deleteCart = function (gamename) {
    let chk = confirm('['+gamename+'] 을 장바구니에서 삭제하시겠습니까?');
    if(chk){
        fetch('/deletecart/'+gamename, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
            },
        }).then( resp => 
            resp.text()
        ).then( (text) => {
            if('okay' === text){
                getCarts();
            }else{
                alert(gamename+'삭제 실패.');
            }
        })
    }
}

function userbuyit(){
    let chk = confirm('구매하시겠습니까?');
    if(chk){
        fetch('/myitem/add', {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
        }).then( resp =>
            resp.text()
        ).then( (text) => {
            if('okay' === text){
                alert('구매 성공.')
                location.href='/'
            }else if(text.startsWith('already')){
                let msgs = text.substring(8)
                alert(msgs+'을 이미 구매하셨습니다.')
            }else{
                alert('Error. 구매에 실패하였습니다.');
            }
        })
    }
}