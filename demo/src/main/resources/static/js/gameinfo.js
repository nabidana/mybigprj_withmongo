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
            if( "" === discount || discount === null){
                price += `
                        <td>${text.price}</td>
                    </tr>
                `;
            }else{
                let realPrice = text.price - (text.price / 100 * (discount.replace('%','')));
                realPrice = Math.ceil(realPrice / 10) * 10;
                price += `
                        <td>
                            <span class="realprice">${text.price}</span>
                            <span class="discountprice"> [${text.discount}] -> ${realPrice}</span>
                        </td>
                    </tr>
                `
            }
            $('.game_contents').append(price);

            let sumnail = `
                <tr>
                    <td class="table_coll">게임 간략 설명</td>
                    <td>${text.sumnail}</td>
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

            let imagelink = `<img class="hero_header" src="${text.imagelink}">`;
            $('.hero_div_header').append(imagelink)
            
        }
    )
}

const addCard = function () {
    
    // fetch("/addcart", {
    //     method:"PUT",
    //     headers:{
    //         "Content-Type":"application/json",
    //     },
    //     body: JSON.stringify({
    //         userid:
    //     })
    // })
}