$(document).ready(function () {
    $("#tab").hide();
    $("#hide_tab").hide();
    $("#remove_lines").hide();

    //formulaire
    $("#form_add").submit(function (event) {
        event.preventDefault(); //retire le comportement par défaut du navigateur
        $("#tab").show();
        $("#hide_tab").show();
        $("#remove_lines").show();

        var num_add = $("#num_add").val();
        var quest = $("#quest").val();
        var rep = $("#rep").val();
        console.log(num_add);
        console.log(quest);
        console.log(rep);

        /*$('#line').after('\
        <tr class="new_line">\
        <td class="num">' + num_add + '</td>\
        <td>' + quest + '</td>\
        <td>' + rep + '</td>\
        <td> - </td>\
        </tr>\
        ');*/
        

        $('.last_line').after('\
        <tr class="line added_line new_line">\
        <td class="num">' + num_add + '</td>\
        <td>' + quest + '</td>\
        <td>' + rep + '</td>\
        <td> - </td>\
        </tr>\
        ');

        var line = $(".line");
        line.removeClass("last_line");

        var new_line = $(".new_line");
        
        new_line.addClass("last_line");
        new_line.removeClass("new_line");

    });

    //masquer le tableau
    $("#hide_tab").submit(function (event) {
        event.preventDefault(); //retire le comportement par défaut du navigateur
        $("#tab").hide();
        $("#hide_tab").hide();
    });

    //supprimer les lignes ajoutées
    $("#remove_lines").submit(function (event) {
        event.preventDefault(); //retire le comportement par défaut du navigateur
        $(".added_line").remove();
        var line = $(".line");
        line.addClass("last_line");
        $("#remove_lines").hide();
    });

})
