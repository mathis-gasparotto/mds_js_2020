$(document).ready(function() {
    
    $(".subnav").hide();

    const navbar = $("#main-menu");
    const button = $("#top_button");

    $(window).scroll(function () {
        if ($(window).scrollTop() <= 80) {
            navbar.removeClass("nav-scroll");

            button.removeClass("top_button");
            button.addClass("top_button_del");
        } else {
            navbar.addClass("nav-scroll");

            button.addClass("top_button");
            button.removeClass("top_button_del");
        }
    });
    

    $("#pres").click(function() {
        $("#subnav1").show();
        $("#subnav2").hide();
        $("#subnav3").hide();
        $("#subnav4").hide();
    });
    
    $("#fil").click(function() {
        $("#subnav1").hide();
        $("#subnav2").show();
        $("#subnav3").hide();
        $("#subnav4").hide();
    });

    $("#prod").click(function() {
        $("#subnav1").hide();
        $("#subnav2").hide();
        $("#subnav3").show();
        $("#subnav4").hide();
    });

    $("#cont").click(function() {
        $("#subnav1").hide();
        $("#subnav2").hide();
        $("#subnav3").hide();
        $("#subnav4").show();
    });

    $("#logo").click(function() {
        $("#subnav1").hide();
        $("#subnav2").hide();
        $("#subnav3").hide();
        $("#subnav4").hide();
    });
})

