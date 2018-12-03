function verificarLogin(){
    let emailLogin = window.localStorage.getItem("emailLogin");

    if(emailLogin != null && emailLogin != "undefined"){
        return true;
    }

    return false;
}

function criarCarrinho(){
    let carrinho = {
        valorTotal: 0,
        produtos: []
    };

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function addCarrinho(produto, qtd){
    let carrinho = window.localStorage.getItem("carrinho");

    if(carrinho == null || carrinho == "undefined"){
        return false;
    }

    carrinho = JSON.parse(carrinho);
    carrinho.valorTotal += produto.valor * qtd;

    for(let i = 0, len = carrinho.produtos.length; i < len; i++){
        if(carrinho.produtos[i].id == produto.id){
            carrinho.produtos[i].qtd += qtd;

            window.localStorage.setItem("carrinho", JSON.stringify(carrinho));


            return;
        }
    }

    produto.qtd = qtd;
    carrinho.produtos.push(produto);

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removerCarrinho(produto){
    let carrinho = window.localStorage.getItem("carrinho");

    if(carrinho == null || carrinho == "undefined"){
        return false;
    }

    carrinho = JSON.parse(carrinho);

    let produtos = [];
    let valor = 0;

    for(let i = 0, len = carrinho.produtos.length; i < len; i++){
        if(carrinho.produtos[i].id != produto.id){
            valor += carrinho.produtos[i].valor * carrinho.produtos[i].qtd;
            produtos.push(carrinho.produtos[i]);
        }
    }

    carrinho.produtos = produtos;
    carrinho.valorTotal = valor;

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function alterarQtd(produto, qtd){
    let carrinho = window.localStorage.getItem("carrinho");

    if(carrinho == null || carrinho == "undefined"){
        return false;
    }

    carrinho = JSON.parse(carrinho);

    for(let i = 0, len = carrinho.produtos.length; i < len; i++){
        if(carrinho.produtos[i].id == produto.id){
            carrinho.produtos[i].qtd = qtd;
            break;
        }
    }

    let valor = 0;

    for(let i = 0, len = carrinho.produtos.length; i < len; i++){
        valor += carrinho.produtos[i].valor * carrinho.produtos[i].qtd;
    }

    carrinho.valorTotal = valor;

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
