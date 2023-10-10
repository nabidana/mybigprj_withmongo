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
            let discount = gamelist.content[i].discount;
            let price;
            if( "" === discount || discount === null || discount === '0%'){
                if('무료' === gamelist.content[i].price){
                    price = `${gamelist.content[i].price}`
                }else{
                    let price_cachestr = numberWithCommas(gamelist.content[i].price)
                    price = `${price_cachestr}원`
                }
            }else{
                let realPrice = gamelist.content[i].price - (gamelist.content[i].price / 100 * (discount.replace('%','')));
                realPrice = Math.ceil(realPrice / 10) * 10;
                let price_cachestr = numberWithCommas(gamelist.content[i].price)
                let realPrice_cachestr = numberWithCommas(realPrice)
                price = `
                    <span class="lendering">${price_cachestr}원</span><br>
                    <span class="dis_txt">[${discount}] => </span>${realPrice_cachestr}원
                `
            }
            let myGamename = gamelist.content[i].gamename
            let realGamename = '';
            if(myGamename.length > 17){
                realGamename += '<p class="name_stra">'
                let mok = myGamename.length/2;
                realGamename += `${myGamename.substr(0, mok)}<br>${myGamename.substr(mok)}`
                realGamename += '</p>'
            }else{
                realGamename = '<p>'+myGamename+'</p>'
            }
            let productCs = ''
            let productCount = gamelist.content[i].productCount
            if( '' === productCount || '0' === productCount){
                productCs = `<p class="noCount">재고현황 : ${gamelist.content[i].productCount}</p>`
            }else{
                productCs = `<p>재고현황 : ${gamelist.content[i].productCount}</p>`
            }
            let tag =`
                <a href="/getGameItem?gamename=${gamelist.content[i].gamename}">
                <img src="${gamelist.content[i].imagelink}">
                ${realGamename}
                <p class="price">${price}</p>
                ${productCs}
            `
            $('.products').append(tag);
        }

        let startnum = nowpage - (nowpage % 5 - 1);
        let endpage = startnum + 4;
        // console.log(startnum)
        // console.log(totalpage)
        // console.log(endpage)
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
                        <button type="button" onclick="move('${i}')">${i}</button>
                    <li>
                `;
                $('.paging').append(pagenation);
            }
        }
        
        if( totalpage > endpage){
            let nextpage = `
            <li>
                <button type="button" onclick="gonext(${endpage})">다음</button>
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

function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}