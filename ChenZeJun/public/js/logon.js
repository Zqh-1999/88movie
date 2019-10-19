$("#login").click(function () {
    $(".hide-center").fadeIn("slow");
    $(".overCurtain").fadeIn("slow");
})
$("#close").click(function () {
    $(".hide-center").fadeOut("slow")
    $(".overCurtain").fadeOut("slow")
})


$(".loginPassword").on("click", ".fa-eye-open", function () {
    $(this).removeClass("fa-eye-open").addClass("fa-eye");
    $(this).prev().attr("type", "text");
});

$(".loginPassword").on("click", ".fa-eye", function () {
    $(this).removeClass("fa-eye").addClass("fa-eye-open");
    $(this).prev().attr("type", "loginPassword");
});



//1.登录校验
$('#BSignIn').on('click', function () {
    let formData = $('#user-signin').serialize();
    console.log(formData)
    $.ajax({
        type: 'post',
        url: 'http://127.0.0.1/api/v1/users/login',
        data: formData,
        success: function (data) {
            console.log(data)
            // if (data.code == '1201') {
            //     $(".btn-login").attr("disabled", "disabled");
            //     alert(data.message);
            // } else if (data.code == '1202') {
            //     $(".btn-login").removeAttr("disabled");
            //     alert(data.message);
            //     location.href = "/user";
            // }
        }
    })

}); 