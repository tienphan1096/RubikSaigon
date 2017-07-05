$(function(){
    var request = $.ajax({
        url: "/api/products/name",
    }).done(function(data){
        $("#search-input").autocomplete({
            source: data,
            appendTo: "#search-div",
            minLength: 2,
            open: function(event, ui){
                $(".ui-autocomplete").css('width', $("#search-input").outerWidth());
            }
        });
    });
});