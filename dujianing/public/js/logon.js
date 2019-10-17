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