$(function(){
    var request = $.ajax({
        url: "/api/products/name",

    }).done(function(data){
        $("#search-input").autocomplete({
            source: data,
            minLength: 2
        });
    });
});