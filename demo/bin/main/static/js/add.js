$(document).on('click', 'button[id="input_btn"]', function(event) {
    let gamename = $('input[name=gameName]').val()
    if( gamename == ""){
        alert("게임 이름이 비어있음");
        return
    }
    let price = $('input[name=price]').val()
    if( price == ""){
        alert("게임 가격이 비어있음");
        return
    }
    let discount = $('input[name=discount]').val()
    let sumnail = $('input[name=sumnail]').val()
    if( sumnail == ""){
        alert("썸네일이 비어있음");
        return
    }
    let category = $('input[name=category]').val()
    if( category == ""){
        alert("카테고리가 비어있음");
        return
    }
    let imagelink = $('input[name=imagelink]').val()
    if( imagelink == ""){
        alert("이미지 링크가 비어있음");
        return
    }
    let productCount = $('input[name=productcount]').val()
    if( productCount == ""){
        alert("상품 재고가 비어있음");
        return
    }

    $.ajax({
        url:'/inputGame',
        method:'PUT',
        data:{
            gamename : gamename,
            price : price,
            discount : discount,
            sumnail : sumnail,
            category : category,
            imagelink : imagelink,
            productCount:productCount
        },
        success:function(data){
            if( data === 'OKAY'){
                alert('등록 성공');
            }else if(data === 'FAIL'){
                alert('등록 실패');
            }else{
                alert('서버 에러');
            }
            location.href='/';
        }
    })
    
})

$(document).on('click', 'button[id="return_btn"]', function(event) {
    location.href='/';
})