$(document).ready(function() {

    $('#dateForm').parsley();
    // Fonction pour calculer la date d'il y a 18 ans à partir de la date actuelle
    function calculateEighteenYearsAgo() {
        var today = new Date();
        var eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return eighteenYearsAgo.toISOString().split('T')[0]; // Format AAAA-MM-JJ
    }

    // Appliquer la date calculée à l'attribut data-parsley-min du champ date de naissance
    $('#datenaiss').attr('data-parsley-max', calculateEighteenYearsAgo());

});


// Alignement dans un tabelau
