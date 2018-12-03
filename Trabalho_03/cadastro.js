let usuarios = [];


$.get('http://rem-rest-api.herokuapp.com/api/Taynara/loginUsuario', function(response){
  usuarios = response;
  console.log(usuarios);
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function emailCadastrado(email){
    for(let i=0, len = usuarios.length; i < len; i++){
        if(email == usuarios[i].email){
            return true;
        }
    }
    return false;
}

$(function(){
    $("#cadastro").submit(function(){
        $("#cadastroRealizado").addClass("hide");

        let $email = $("#email", this);
        let $senha = $("#senha", this);

        let email = $email.val();
        let senha = $senha.val();

        let _this = this;

        console.log(emailCadastrado(email));

        if(emailCadastrado(email) || email.trim().length == 0 || !validateEmail(email)){
            $email.parent().addClass("has-error");
            $email.siblings("p").removeClass("hide");
            return false;
        }else{
            $email.parent().removeClass("has-error");
            $email.siblings("p").addClass("hide");
        }

        if(senha.trim().length == 0){
            $senha.parent().addClass("has-error");
            $senha.siblings("p").removeClass("hide");
            return false;
        }else{
            $senha.parent().removeClass("has-error");
            $senha.siblings("p").addClass("hide");
        }

        $.ajax({
            type:'POST',
            url:'http://rem-rest-api.herokuapp.com/api/Taynara/loginUsuario',
            data: {email: email, senha: senha},
            success: function(data){
                usuarios.push({
                    email: email,
                    senha: senha
                });
                $email.val("");
                $senha.val("");

                $("#cadastroRealizado").removeClass("hide");
            }
        });

        return false;
    });

    $("#login").submit(function(){
        let $email = $("#email", this);
        let $senha = $("#senha", this);

        let email = $email.val();
        let senha = $senha.val();


        if(email.trim().length == 0 || !validateEmail(email)){
            $email.parent().addClass("has-error");
            $email.siblings("p").removeClass("hide");
            return false;
        }else{
            $email.parent().removeClass("has-error");
            $email.siblings("p").addClass("hide");
        }

        if(senha.trim().length == 0){
            $senha.parent().addClass("has-error");
            $senha.siblings("p").removeClass("hide");
            return false;
        }else{
            $senha.parent().removeClass("has-error");
            $senha.siblings("p").addClass("hide");
        }


        let flag = false;

        for(let i=0, len = usuarios.length; i < len ; i++){
            console.log(usuarios[i]);

            console.log(email);
            console.log(usuarios[i].email);

            console.log(senha);
            console.log(usuarios[i].senha);

            if(usuarios[i].email == email && usuarios[i].senha == senha){
                window.localStorage.setItem("emailLogin", usuarios[i].email);
                $("#comLogin").show();
                $("#semLogin").hide();

                $("form", ".produto").show();
                $(".produto .thumbnail").css({
                  height: "480px"
                });
                flag = true;
                break;
            }
        }

        if(!flag){
            $("#falhaNoLogin").removeClass("hide");
        }else{
            $("#falhaNoLogin").addClass("hide");
        }

        return false;
    });
});
