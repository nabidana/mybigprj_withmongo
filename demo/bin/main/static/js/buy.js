$(document).ready(function () {
    getCarts();
})

const getCarts = function () {
    $('.userCart').empty();
    $('.nodataCart').empty();
    fetch("/buy/getUserCart", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
    }).then( resp =>
        resp.text()
    ).then( (text) => {
        let txt = text;
        console.log(txt);
        if("null" === txt){
            $('.userCart').hide();
            let list_content = `
            <span>장바구니에 담긴 물품이 없습니다.</span>
            `;
            $('.nodataCart').append(list_content);
        }else{
            $('.userCart').show();
            let gameLists = txt.split(",");
            for(i = 0; i < gameLists.length; i++){
                let splitz = gameLists[i].split("|");
                let list_content = `
                    <tr>
                        <td>${splitz[0]}</td>
                        <td>${splitz[1]}</td>
                        <td>${splitz[2]}</td>
                        <td>${splitz[3]}</td>
                    </tr>
                `;
                $('.userCart').append(list_content);
            }
        }
    })
}