$divItensFinalizarCompra = $("#divItensFinalizarCompra");

let carrinho = window.localStorage.getItem("carrinho");

if(carrinho == null || carrinho == "undefined"){
    criarCarrinho();

    carrinho = {valorTotal: 0, produtos: []};
}else{
    carrinho = JSON.parse(carrinho);
}


function exibirFinalizarCompra(){
    $divItensFinalizarCompra.html("");


    for(let i=0, len = carrinho.produtos.length; i<len; i++){
        exibirItemFinalizarCompra(carrinho.produtos[i]);
    }


    $("#total").html("R$ "+carrinho.valorTotal);

    if(carrinho.produtos.length == 0){
        $('.panel-footer button').attr("disabled", "disabled");
        $divItensFinalizarCompra.html("Nenhum produto no carinho!");
    }else{
        $('.panel-footer button').removeAttr("disabled");
    }
}

function exibirItemFinalizarCompra(item){
    let template = [
        '<div class="row" id="item'+item.id+'">',
            '<div class="col-md-2"><img style="width:80px; height:80px" class="img-responsive" src="img/'+item.image+'"></div>',
            '<div class="col-md-4">',
                '<h4 class="product-name"><strong>'+item.nome+'</strong></h4><h4><small>'+item.descricao+'</small></h4>',
            '</div>',
            '<div class="col-md-6">',
                '<div class="col-xs-6 text-right">',
                    '<h6><strong>R$ '+item.valor*item.qtd+',00</h6>',
                '</div>',
                '<div class="col-md-4">',
                    '<input type="number" placeholder="quantidade" class="form-control" name="qtd" min="1" value="'+item.qtd+'">',
                '</div>',
                '<div class="col-md-2">',
                    '<button type="button" class="btn btn-link btn-xs">',
                        '<span class="glyphicon glyphicon-trash"> </span>',
                    '</button>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');

    $divItensFinalizarCompra.append(template);

    $("button", "#item"+item.id).click(function(){
        removerCarrinho(item);
        carrinho = window.localStorage.getItem("carrinho");

        if(carrinho == null || carrinho == "undefined"){
            criarCarrinho();

            carrinho = {valorTotal: 0, produtos: []};
        }else{
            carrinho = JSON.parse(carrinho);
        }
        exibirFinalizarCompra();
        exibirCarrinho();
    });

    $("input", "#item"+item.id).change(function(){
        alterarQtd(item, parseInt($(this).val()));
        carrinho = window.localStorage.getItem("carrinho");

        if(carrinho == null || carrinho == "undefined"){
            criarCarrinho();

            carrinho = {valorTotal: 0, produtos: []};
        }else{
            carrinho = JSON.parse(carrinho);
        }
        exibirFinalizarCompra();
        exibirCarrinho();
    });
}

let emailLogin = window.localStorage.getItem("emailLogin");

if(!verificarLogin() || emailLogin == null || emailLogin == "undefined"){
    window.location.href = "index.html";
}


let comprasFeitas = [];
let $divCompras = $("#divCompras");
let $tableCompras = $("#tableCompras");

function exibirComprasFeitas(){
    let compras = [];

    $divCompras.html("");

    for(let i=0, len = comprasFeitas.length; i<len; i++){
        if(comprasFeitas[i].email == emailLogin){
            compras.push(comprasFeitas[i]);
        }
    }

    if(compras.length > 0){
      $tableCompras.removeClass("hide");
    }else{
      $tableCompras.addClass("hide");
    }

    for(let i=0, len = compras.length; i<len; i++){
        exibirCompra(compras[i]);
    }
}

function dataFormatada(data){
    let dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    let mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    let ano = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}

function horaFormatada(data){
    let h = data.getHours();
    if (h.toString().length == 1)
      h = "0"+h;
    let m = data.getMinutes();
    if (m.toString().length == 1)
      m = "0"+m;
    return h+":"+m;
}

function exibirCompra(compra){
    let d = new Date(compra.date);

    let template = [
        '<tr>',
            '<td>',
                dataFormatada(d),
            '</td>',
            '<td>',
                horaFormatada(d),
            '</td>',
            '<td>',
                'R$ '+compra.valorTotal+',00',
            '</td>',
        '</tr>',
    ].join('');

    $divCompras.append(template);
}

$.get("http://rem-rest-api.herokuapp.com/api/Taynara/comprasLoja", function(response){
  comprasFeitas = response;
  exibirComprasFeitas();
});

$("#finalizar").click(function(){
    carrinho.email = emailLogin;
    carrinho.date = new Date();

    $.ajax({
        url: "http://rem-rest-api.herokuapp.com/api/Taynara/comprasLoja",
        type: "POST",
        data: carrinho,
        success: function(data){
            comprasFeitas.push(carrinho);

            carrinho = {
                valorTotal: 0,
                produtos: []
            };

            window.localStorage.setItem("carrinho", JSON.stringify(carrinho));

            exibirFinalizarCompra();
            exibirCarrinho();
            exibirComprasFeitas();
        }
    });
});

exibirFinalizarCompra();
