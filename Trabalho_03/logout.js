$("#logout").click(function(){
    window.localStorage.removeItem("emailLogin");

    $("form", ".produto").hide();
    $(".produto .thumbnail").css({
      height: "440px"
    });

    window.location.href = "index.html";
});
