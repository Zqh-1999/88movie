$("#close").click(function () {
    $(".hide-center").fadeOut("slow")
    $(".overCurtain").fadeOut("slow")
})
// 注册
$('#BSignIn').on('click', function () {
    let formData = $('#user-reg').serialize();
    console.log(formData)
    $.ajax({
        url: 'http://127.0.0.1/api/v1/users',
        type: 'post',
        data: formData,
        success: function (data) {
            console.log(data)
        }
    })
})