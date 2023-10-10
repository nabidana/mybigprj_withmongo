let params = new URLSearchParams(location.search).get("gamename");

$(document).ready(function () {
    getGameProduct(params);
});

const getGameProduct = function (param) {
    fetch('/getGameItem/'+param, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    }).then( resp =>
        resp.json()
    ).then( (text) => {
            let gamename = `
                <tr>
                    <td class="table_coll" >게임명</td>
                    <td>${text.gamename}</td>
                </tr>
            `;
            $('.game_contents').append(gamename);
            let category = `
                <tr>
                    <td class="table_coll">장르</td>
                    <td>${text.category}</td>
                </tr>
            `;
            $('.game_contents').append(category);

            let discount = text.discount;
            let price = `
                <tr>
                    <td class="table_coll">가격</td>
            `;
            if( "" === discount || discount === null || discount === '0%'){
                let price_cachestr = numberWithCommas(text.price)
                price += `
                        <td>${price_cachestr}</td>
                    </tr>
                `;
            }else{
                let realPrice = text.price - (text.price / 100 * (discount.replace('%','')));
                realPrice = Math.ceil(realPrice / 10) * 10;
                let price_cachestr = numberWithCommas(text.price)
                let realPrice_cachestr = numberWithCommas(realPrice)
                price += `
                        <td>
                            <span class="realprice">${price_cachestr}</span>
                            <span class="discountprice"> [${text.discount}] -> ${realPrice_cachestr}</span>
                        </td>
                    </tr>
                `
            }
            $('.game_contents').append(price);

            let sumnail = `
                <tr>
                    <td class="table_coll">게임 간략 설명</td>
                    <td style="word-break: break-all;">${text.sumnail}</td>
                </tr>
            `;
            $('.game_contents').append(sumnail);
            let date = `
                <tr>
                    <td class="table_coll">등록 일자</td>
                    <td>${text.date}</td>
                </tr>
            `;
            $('.game_contents').append(date);

            let gameproduct = text.productCount
            let gameproduct_tag = `
                <tr>
                    <td class="table_coll">재고 현황</td>
                    <td>${gameproduct}</td>
                </tr>
            `
            $('.game_contents').append(gameproduct_tag)
            let btn_tags = ''
            if('0' === gameproduct || gameproduct === null){
                btn_tags = `
                    <button type="button" class="err_btn" onclick="cantAdd()">장바구니 담기</button>
                    <button type="button" class="err_btn" onclick="cantAdd()">바로 구매하기</button>
                    <button type="button" class="btn_back" onclick="location.href='/'">뒤로가기</button>
                `
            }else{
                btn_tags = `
                    <button type="button" class="buy_btn" onclick="addCart()">장바구니 담기</button>
                    <button type="button" class="buy_btn" onclick="addAndBuyit()">바로 구매하기</button>
                    <button type="button" class="btn_back" onclick="location.href='/'">뒤로가기</button>
                `
            }
            $('.add_userbtns').append(btn_tags)

            let imagelink = `<img class="hero_header" src="${text.imagelink}">`;
            $('.hero_div_header').append(imagelink)
            
        }
    )
}

const addCart = function () {
    let realUserName = $('.userRealyName').text();
    if ('anonymousUser' === realUserName){
        alert('로그인을 진행해주세요.')
        login();
        return
    }
    let chk_c = confirm('장바구니에 추가하시겠습니까?')
    if(chk_c){
        fetch("/addcart", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                userid:realUserName,
                gamename:params
            })
        }).then( resp => 
            resp.text()
        ).then( (text) => {
            if("already" === text){
                alert('이미 장바구니에 추가되어 있습니다.');
            }else if('okay' === text){
                let chk = confirm('장바구니 추가 완료.\n장바구니로 이동하시겠습니까?');
                if(chk){
                    location.href='/buy';
                }
            }else if('lenth' === text){
                alert('추가불가능.\n장바구니의 최대 개수는 10개 입니다.');
            }else{
                alert('에러.\n장바구니에 추가하지 못했습니다.');
            }
        })
    }
}

const addAndBuyit = function () {
    let realUserName = $('.userRealyName').text();
    if ('anonymousUser' === realUserName){
        alert('로그인을 진행해주세요.')
        login();
        return
    }
    let chk_c = confirm('바로구매 하시겠습니까?')
    if(chk_c){
        fetch("/addcart", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                userid:realUserName,
                gamename:params
            })
        }).then( resp => 
            resp.text()
        ).then( (text) => {
            let torf = false;
            if("already" === text){
                alert('이미 장바구니에 추가되어 있습니다.');
                torf = true;
            }else if('okay' === text){
                torf = true;
            }else if('lenth' === text){
                alert('추가불가능.\n장바구니의 최대 개수는 10개 입니다.');
                torf = false;
            }else{
                alert('에러.\n장바구니에 추가하지 못했습니다.');
                torf = false;
            }

            if(torf){
                location.href='/buy'
            }
        })
    }
}

function modify(){
    location.href='/modifygameinfo?gamename='+params;
}

function cantAdd(){
    let realUserName = $('.userRealyName').text();
    if ('anonymousUser' === realUserName){
        alert('로그인을 진행해주세요.')
        login();
        return
    }
    alert('재고가 없는 상품으로,\n장바구니에 추가하지 못합니다.')
}

function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}