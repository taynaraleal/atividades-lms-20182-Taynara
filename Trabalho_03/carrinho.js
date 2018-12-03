
    $divItens = $("#dropdown-cart");

    function exibirCarrinho(){
        $divItens.html("");

        let carrinho = window.localStorage.getItem("carrinho");

        if(carrinho == null || carrinho == "undefined"){
            criarCarrinho();

            carrinho = {valorTotal: 0, produtos: []};
        }else{
            carrinho = JSON.parse(carrinho);
        }

        console.log(carrinho);

        for(let i=0, len = carrinho.produtos.length; i<len; i++){
            exibirItemCarrinho(carrinho.produtos[i]);
        }

        if(carrinho.produtos.length > 0){
            let template = [
                '<li class="divider"></li>',
                '<li><a class="text-center" href="compras.html">Finalizar</a></li>'
            ].join('');

            $divItens.append(template);
        }else{
            $divItens.append('<li style="padding:5px;">Carrinho Vazio!</li>');
        }
    }

    function exibirItemCarrinho(item){
        let template = [
            '<li id="itemCarrinho'+item.id+'">',
                '<span class="item">',
                    '<span class="item-left">',
                        '<img src="img/'+item.image+'" alt="" />',
                        '<span class="item-info">',
                            '<span>'+item.nome+'</span>',
                            '<span>R$ '+item.valor*item.qtd+',00</span>',
                        '</span>',
                    '</span>',
                    '<span class="item-right">',
                        '<button class="btn btn-xs btn-danger pull-right">x</button>',
                    '</span>',
                '</span>',
            '</li>'
        ].join('');

        $divItens.append(template);

        $("button", "#itemCarrinho"+item.id).click(function(){
            removerCarrinho(item);
            exibirCarrinho();
            if(exibirFinalizarCompra){
                exibirFinalizarCompra();
            }
        });
    }

    exibirCarrinho();
