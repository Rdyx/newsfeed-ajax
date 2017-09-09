var counter = 0;

$('#meteo').click(function () {
    $.ajax({
        url: 'http://rawgit.com/Rdyx/Ajax-first-try/master/index.html',
        type: 'GET',
        success: function (data) {
            $('#content').html(data);
        }
    })
})

$('#morpion').click(function () {

    $.ajax({
        url: 'http://rawgit.com/Rdyx/morpion/master/index.html',
        type: 'GET',
        success: function (data) {
            $('#content').html(data);

        },
        
})
$('#myModal').modal('show');
})

$('.news').click(function () {
    //Set du tableau à 0 pour éviter les bugs doublons si plusieurs clicks
    var array = [];
    //Requête ajax des données googlesheet
    $.ajax({
        url: "https://spreadsheets.google.com/feeds/list/1vOJ4-chLBEDQF7TzzgbVeuLpyrVT1ZqPVB5omiI75b0/od6/public/values?alt=json",
        success: function (data) {
            console.log(data);
            $('#content').html('');
            //Boucle set tableau initial
            for (var i = 0; i < (data.feed.entry).length; i++) {
                console.log(i);
                array.push([data.feed.entry[i].gsx$img.$t, data.feed.entry[i].gsx$titre.$t, data.feed.entry[i].gsx$content.$t]);
                $('#content').append('<div class="contour"><div class="row">\
                <img class="topImage" src="' + array[i][0]+ '"></div><div class="titre">\
                ' + array[i][1] + '</div><div class="contenu text-justify">\
                ' + array[i][2] + '</div></div>');
                
            }
        }
    });
});

$('.swapTheme').click(function (){
if(counter % 2 == 0){
        $('#theme[rel=stylesheet]').attr('href', 'styleLight.css');
        $('#swapTheme').html("Dark Theme");
        counter++;
    } else {
        $('#theme[rel=stylesheet]').attr('href', 'styleDark.css')
        $('#swapTheme').html("Light Theme");
        counter--;
    }
})