// 搜索功能 
$('.btn sub').on('click', function () {
    var btn_val = $('.text_btn').val()
    console.log(123456)
    $.ajax({
        url: "http://127.0.0.1/api/v1/films",
        type: "get",
        data: {
            keyWords: btn_val,
            // type_name: "电影"
        },
        success: function (data) {
            window.location.reload();
            location.href = `/movie/${btn_val}`
            $('.text_btn').val('')
        }
    })
})