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
                    <td><input type="text" name="category" class="input_txt" value='${text.category}'></td>
                </tr>
            `;
            $('.game_contents').append(category);

            let price = `
                <tr>
                    <td class="table_coll">가격</td>
                    <td><input type="text" name='price' class="input_txt" value='${text.price}'></td>
                </tr>
            `;
            $('.game_contents').append(price);
            let discount = `
                <tr>
                    <td class="table_coll">할인율</td>
                    <td><input type="text" name="discount" class="input_txt" value='${text.discount}'></td>
                </tr>
            `;
            $('.game_contents').append(discount);
            let sumnail = `
                <tr>
                    <td class="table_coll">게임 간략 설명</td>
                    <td style="word-break: break-all;">
                        <textarea type="text" id="sumnail" class="input_area" oninput='calcTextHeight(this)'>${text.sumnail}</textarea>
                    </td>
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
            
            let imagelink = `
                <tr>
                    <td class="table_coll" >이미지 링크</td>
                    <td style="word-break: break-all;">
                        <textarea type="text" id="imagelink" class="input_area" oninput='calcTextHeight(this)'>${text.imagelink}</textarea>
                    </td>
                </tr>
            `;
            $('.game_contents').append(imagelink);

            let testImageLink = `<img class="hero_header" src="${text.imagelink}">`;
            $('.hero_div_header').append(testImageLink)
    })
}

function calcTextHeight(e){
    e.style.height='auto';
    e.style.height=`${e.scrollHeight}px`
}

function goBackPages(){
    location.href='/getGameItem?gamename='+params
}

function doModyit(){
    let gamename = params;
    let category = $('input[name=category]').val();
    let price = $('input[name=price]').val();
    let discount = $('input[name=discount]').val();
    let sumnail = $('#sumnail').val();
    let imagelink = $('#imagelink').val();

    fetch('/modifyGameIts', {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            gamename:gamename,
            price:price,
            discount:discount,
            sumnail:sumnail,
            category:category,
            imagelink:imagelink
        })
    }).then( resp => 
        resp.text()
    ).then( (text) => {
        if('okay' === text){
            alert('수정을 완료하였습니다.')
        }else{
            alert('수정을 실패하였습니다.')
        }
        location.href='/getGameItem?gamename='+params
    })
}