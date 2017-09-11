//Set initial du compteur et du tableau
var counter = 0;
var array = [];
var labelArray = [];

//Lancement du système de récup des news via ajax + du système de libellés
$('.news').click(function () {
    //Set des tableau à 0 quand click sur news pour éviter le double push
    array = [];
    labelArray = [];
    //Requête ajax des données googlesheet
    $.ajax({
        url: "https://spreadsheets.google.com/feeds/list/1vOJ4-chLBEDQF7TzzgbVeuLpyrVT1ZqPVB5omiI75b0/od6/public/values?alt=json",
        success: function (data) {
            console.log(data);
            //On remet le #content à 0
            $('#content').html('');
            //On set la liste des libellés à 0 avec un bouton "Toutes" (qui servira à enlever la classe hidden
            //sur toutes les news qui l'ont, cela évitera d'avoir à reload forcément la page)
            //De plus la liste sera vierge et on fait apparaître le bouton de thèmes
            $('.libelList').html('<li class="text-center"><a class="txtTheme allLibels bolded" href="#">Tous</a></li>');
            $('.libelDrop').removeClass('hidden');
            //Boucle qui va push les données dans le tableau tant que i sera inférieur au nombre de data.feed.entry
            for (var i = 0; i < (data.feed.entry).length; i++) {
                array.push([data.feed.entry[i].gsx$img.$t, data.feed.entry[i].gsx$titre.$t, data.feed.entry[i].gsx$content.$t, data.feed.entry[i].gsx$theme.$t, data.feed.entry[i].gsx$date.$t]);
                //tableau pour les libellés (dont on se servira pour la liste et éviter les doublons via fonction)
                labelArray.push(data.feed.entry[i].gsx$theme.$t);
            };
            //On affiche les news dans l'ordre décroissant de leur apparition (du - ancien au + ancien)
            //avec une boucle qui prend comme var j = nombres d'entrées -1 et qui bouclera tant que 
            //j sera supérieur à -1 et sera décrémentée à chaque tour (donc qui finit avec j = 0, premier index du tableau)
            for (var j = (data.feed.entry).length - 1; j > -1; j--) {
                //On push dans le #content avec les classes pour le style, flèche up pour remonter au top et nom du thème de l'article
                $('#content').append('<div class="contour news" id="news' + j + '"><div class="row">\
                <img class="topImage" src="' + array[j][0] + '"></div><div class="titre">\
                ' + array[j][1] + '</div><div class="contenu text-justify">\
                ' + array[j][2] + '</div><a href="#" alt="Back-To-The-Top !">\
                <ul class="list-inline text-right"><li><i class="fa fa-chevron-up" aria-hidden="true"></i></a></li>\
                <li><a class="txtTheme" href="#">'+ array[j][3] + '</a></li><li>#' + Number(j + 1) + ' - Publié le <strong>' + array[j][4] + '</strong></li></ul></div> ');
            }
            //Boucle qui utilise la fonction pour purger les libellés doublons (qui sont stockés sous forme de nouveau tableau dans la fonction)
            //Tri dans l'ordre alphabétique grâce à .sort()
            for (var k = 0; k < cleanArray(labelArray).length; k++) {
                $('.libelList').append('<li class="text-center"><a class="txtTheme" href="#">' + cleanArray(labelArray.sort())[k] + '</a></li>')
            };
            //Sélection du libellé via clique
            $('.txtTheme').click(function () {
                //Mise en valeur du libellé sélectionné
                $('.txtTheme').removeClass('bolded');
                $(this).addClass('bolded');
                //Boucle qui parcours tout le tableau de news pour récupérer 
                //les news via leur numéros et comparer leurs thèmes (array[i][3])
                //Avec la valeur du lien cliqué et qui ajout/retire la classe hidden en fonction du résultat
                for (var l = 0; l < array.length; l++) {
                    array[l][3] != $(this).html() ? $('#news' + l).addClass('hidden') : $('#news' + l).removeClass('hidden');
                }
            })
            //Pour réafficher toutes les news en cliquant sur le thème "Toutes"
            $('.allLibels').click(function () {
                //Boucle qui parcours tout le tableau de news pour récupérer 
                //les news via leur numéros et comparer leurs thèmes (array[i][3])
                //Avec la valeur du lien cliqué et qui ajout/retire la classe hidden en fonction du résultat
                for (var l = 0; l < array.length; l++) {
                    array[l][3] != 'Toutes' ? $('#news' + l).removeClass('hidden') : $('#news' + l).removeClass('hidden');
                }
            })
        },
        //En cas d'erreur
        error: function () {
            $('#content').html('<div class="contour"><div class="row"></div><div class="titre">Erreur, veuillez réessayer.</div></div>');
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

//fonction clean les doublons des libellés pour éviter de push plusieurs fois les mêmes thèmes dans la liste
//p.s : trouvée sur https://www.unicoda.com/?p=579
function cleanArray(array) {
    var i, out = [], obj = {};
    //Boucle qui va récup les libellés et les transformer en objet, du coup les doublons sont supprimés
    //automatiquement car ils représentent le même objet
    for (i = 0; i < array.length; i++) {
        obj[array[i]] = 0;
    }
    //Boucle qui parcours les objets dans obj et les push dans un nouveau tableau purgé des doublons
    for (var j in obj) {
        out.push(j);
    }
    return out;
}