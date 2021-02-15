$(document).ready(function () {

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

    $("#mdp_error").hide(); 
    $("#length_error").hide();
    $("#num_error").hide();
    $("#zip_error").hide();
    $("#mdp_condition").hide();
    $("#paiement_form").hide();

    //Formulaire
    $("#contact_form").submit(function (event) {
        event.preventDefault(); //retire le comportement par défaut du navigateur
        
        //mdp confirme
        let password = $("#mdp").val();
        let confirmPassword = $("#mdp_cfrm").val();
        if (password === confirmPassword) {
            $("#mdp_error").hide(); 
        } else {
            $("#mdp_error").show();
        }

        //length num
        var num = $("#num").val();
        if (num.length === 10) {
            $("#num_error").hide();
        } else {
            $("#num_error").show();
        }
    
        //length zip
        var zip = $("#zip").val();
        if (zip.length <= 5) {
            $("#zip_error").hide();
        } else {
            $("#zip_error").show();
        }

        //verif mdp
        //const regex = /^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])[0-9a-zA-Z!@#\$%\^&\*]{8,}$/;
        console.log(password.match(regex));
        if (password.match(regex)){
            console.log('ui');
            $("#mdp_condition").hide();
        }else{
            console.log('no');
            $("#mdp_condition").show();
        }

        /*if (password.match(/[^0-9a-zA-Z]/) && password.length >= 8){
            console.log('ui');
            $("#mdp_condition").hide();
        }else{
            console.log('no');
            $("#mdp_condition").show();
        }*/

        //partir sur le formulaire de paiement
        /*if (){
            console.log('oui');
            $("#contact_form").hide();
            $("#paiement_form").show();
        }*/

    });
})