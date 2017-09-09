//Set initial du compteur et du tableau
var counter = 0;
var array = [];

//Lancement du système de récup des news via ajax + du système de libellés
$('.news').click(function () {
    //Set du tableau à 0 quand click sur news pour éviter le double push
    array = [];
    //Requête ajax des données googlesheet
    $.ajax({
        url: "https://spreadsheets.google.com/feeds/list/1vOJ4-chLBEDQF7TzzgbVeuLpyrVT1ZqPVB5omiI75b0/od6/public/values?alt=json",
        success: function (data) {
            console.log(data);
            //On remet le #content à 0
            $('#content').html('');
            //Boucle qui va push les données dans le tableau tant que i sera inférieur au nombre de data.feed.entry
            for (var i = 0; i < (data.feed.entry).length; i++) {
                array.push([data.feed.entry[i].gsx$img.$t, data.feed.entry[i].gsx$titre.$t, data.feed.entry[i].gsx$content.$t, data.feed.entry[i].gsx$theme.$t]);
                //On push dans le #content avec les classes pour le style, flèche up pour remonter au top et nom du thème de l'article
                $('#content').append('<div class="contour" id="news' + i + '"><div class="row">\
                <img class="topImage" src="' + array[i][0] + '"></div><div class="titre">\
                ' + array[i][1] + '</div><div class="contenu text-justify">\
                ' + array[i][2] + '</div><a href="#" alt="Back-To-The-Top !">\
                <ul class="list-inline text-right"><li><i class="fa fa-chevron-up" aria-hidden="true"></i></a></li>\
                <li><a class="txtTheme" href="#">'+ array[i][3] + '</a></li></ul></div> ');
            }
            //Sélection du libéllé via clique
            $('.txtTheme').click(function () {
                //Boucle qui parcours tout le tableau pour récupérer 
                //les news via leur numéros et comparer leurs thèmes (array[i][3])
                //Avec la valeur du lien cliqué et qui ajout/retire la classe hidden en fonction du résultat
                for (var i = 0; i < array.length; i++) {
                    console.log("kkek");
                    array[i][3] != $(this).html() ? $('#news' + i).addClass('hidden') : $('#news' + i).removeClass('hidden');
                }
            })
        },
        //En cas d'erreur
        error: function () {
            $('#content').html('Erreur, veuillez réessayer.');
        }
    });
});

//Swap team Dark et Light
$('.swapTheme').click(function () {
    //Détail du if/else dessous
    counter % 2 == 0 ? ($('#theme[rel=stylesheet]').attr('href', 'styleLight.css'), counter++) : ($('#theme[rel=stylesheet]').attr('href', 'styleDark.css'),
        counter--);
    // if(counter % 2 == 0){
    //         $('#theme[rel=stylesheet]').attr('href', 'styleLight.css');
    //         counter++;
    //     } else {
    //         $('#theme[rel=stylesheet]').attr('href', 'styleDark.css')
    //         counter--;
    //     }
})