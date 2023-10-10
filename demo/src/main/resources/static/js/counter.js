$(document).ready(function () {
    getCount();
});

const getCount = function () {
    let username = $('.realyname').text();
    if( username != ''){
        fetch('/myitem/cartCount', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
        }).then( resp =>
            resp.text()
        ).then( (text) => {
            let numberSpells;
            if( 'null' === text){
                numberSpells = `(0)`;
            }else{
                numberSpells = `(${text})`;
            }
            $('.buy_cls').append(numberSpells)
        })
    }
}