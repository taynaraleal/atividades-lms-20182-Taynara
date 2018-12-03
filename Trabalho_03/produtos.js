let produtos = [
    {
        nome: 'Caneca You are my person',
        valor: 25,
        id: 1,
        image: 'caneca.jpeg',
    },
    {
        nome: 'Capa para Iphone',
        valor: 10,
        id: 2,
        image: 'case.jpeg',
    },
    {
        nome: 'Chaveiro',
        valor: 7,
        id: 3,
        image: 'chaveiro.jpeg',
    },
    {
        nome: 'Quadro decorativo',
        valor: 18,
        id: 4,
        image: 'quadro.jpeg',
    },
    {
        nome: 'Agenda 2019',
        valor: 50,
        id: 5,
        image: 'agenda.jpeg',
    },
    {
        nome: 'Moleton',
        valor: 75,
        id: 6,
        image: 'moleton.jpeg',
    },
    {
        nome: 'Kit Greys Store',
        valor: 99,
        id: 7,
        image: 'kit.jpeg',
    }, 
    {
        nome : 'Blusa',
        valor: 22,
        id : 8,
        image : 'blusa.jpg',
      }

];

$(function () {

    let $divProdutos = $("#divProdutos");

    function adicionarProdutos() {
        $divProdutos.html("");
        for (let i = 0, len = produtos.length; i < len; i++) {
            adicionarProduto(produtos[i]);
        }
    }

    function adicionarProduto(produto) {
        let template = [
            '<div class="col-sm-4 col-md-3 produto" id="produto' + produto.id + '">',
            '<div class="thumbnail" >',
            '<img src="img/' + produto.image + '" class="img-responsive">',
            '<div class="caption">',
            '<div class="row">',
            '<div class="col-md-6 col-xs-6">',
            '<h3>' + produto.nome + '</h3>',
            '</div>',
            '<div class="col-md-6 col-xs-6 price">',
            '<h3><label>R$ ' + produto.valor + ',00</label></h3>',
            '</div>',
            '</div>',
            '<div class="row">',
            '<form class="form carrinho" role="form" novalidate>',
            '<div class="col-md-6 form-group">',
            '<input type="number" placeholder="quantidade" class="form-control" name="qtd" min="1" value="1">',
            '</div>',
            '<div class="col-md-6">',
            '<button type="submit" href="#" class="btn btn-default btn-product"><span class="glyphicon glyphicon-shopping-cart"></span></button>',
            '</div>',
            '</form>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');

        $divProdutos.append(template);

        $("form", "#produto" + produto.id).submit(function () {
            let qtd = $("input", this).val();
            qtd = parseInt(qtd);
            addCarrinho(produto, qtd);
            exibirCarrinho();
            return false;
        });
    }

    adicionarProdutos();
});
