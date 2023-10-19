/**
* @author      Djovensky Zetrenne
* @version     1.0
* @since       2023-10-09
*
* http://usejsdoc.org/
*/

"use strict";

let hotelChoisi = document.getElementsByName("lis_hotel");
let nbrChambre = document.getElementById("nbrChambre");
let chambre = document.getElementsByName("typeChambre");
let forms = document.getElementsByName("form");
let options = document.getElementsByName("optionsChambre");
let erreur = document.getElementById("message");
let reservation = document.getElementById("reservation");

/**
 * Retourne le nom de l'hotel sélectionné par le visiteur
 * @returns {String} Nom de l'hotêl ou "0" si pas de sélection
 */
function getHotel() {
    if (hotelChoisi.value === "0") {
        return "0";
    }
    return hotelChoisi.value;
}

/**
 * Retourne le nombre de chambres saisi par le visiteur
 * @returns {Number} Nombre de chambres ou NaN (Not A Number)
 */
function getNbChambre() {
    parseInt(nbrChambre.value);
    if (nbrChambre.value < 1 || nbrChambre.value > 12) {
        return NaN;
    }
    return nbrChambre.value;
}

/**
 * Retourne le type de chambre sélectionné ou ""
 * @returns {String} Type de chambre ou ""
 */

function getChambre() {
    for (let i= 0; i < chambre.length - 1; i++) {
        switch (chambre.item(i).value) {
            case "0":
                return "Standard simple";
            case "1":
                return "Standard double";
            case "2":
                return "Supérieur simple";
            case "3":
                return "Supérieur double";
            default:
                return "";
        }
    }
}

/**
 * Retourne les options choisies par le visiteur
 * @returns {Array} tableau des éléments checkbox cochés
 */

function getOptions() {
    let optChoisi = [];
    for (let j = 0; j < options.length - 1; j++) {
        switch (options.item(j).value) {
            case "0":
                optChoisi.push("Petit déjeuner");
                break;
            case "1":
                optChoisi.push("TV");
                break;
            case "2":
                optChoisi.push("Journaux");
                break;
            case "3":
                optChoisi.push("Ordinateur");
                break;
            case "4":
                optChoisi.push("Wifi");
                break;
            case "5":
                optChoisi.push("Animaux");
                break;
        }
    }
    return optChoisi;
}

/**
 * Valide la saisie utilisateur
 * Retourne un message d'erreur au format HTML "<ul><li>erreur 1</li>...</ul>"
 * ou chaine vide si tout est OK.
 *
 * @returns {String}    Chaine vide si pas d'erreur ou <ul> d'erreurs
 */
function valideSaisie() {
    erreur.innerHTML = "<ul>";
    if (getHotel() === "0") {
        erreur.innerHTML += "<li>Choisissez un hotel</li>";
    } else if (isNaN(getNbChambre())) {
        erreur.innerHTML += "<li>Saisissez un nombre de chambre entre 1 et 12 !</li>";
    } else if (getChambre() === "0") {
        erreur.innerHTML += "<li>Sélectionnez un type de chambre !</li>";
    }
    erreur.innerHTML += "</ul>";

    if (erreur.innerHTML === "<ul></ul>") {
        return "";
    }
}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {
    //id des éléments
    let image = document.getElementById("photo");
    let nbrChambre = document.getElementById("chambre_nombre");
    let typeChambre = document.getElementById("chambre_type");
    let nomHotel = document.querySelector("h2");
    //let options = document.getElementById("options");

    //nom de l'hotel
    nomHotel.innerText = getHotel();

    //mets l'image de l'hotel
    switch (getHotel()) {
        case "City":
            image.src = "images/city.jpg";
            break;
        case "Midi":
            image.src = "images/midi.jpg";
            break;
        case "National":
            image.src = "images/national.jpg";
            break;
        case "Victoria":
            image.src = "images/victoria.jpg";
            break;
    }

    //mets le nombre et le type de chambre
    nbrChambre.innerText = getNbChambre().toString();
    typeChambre.innerText = getChambre();

    //liste d'options


    reservation.display = "block";
}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation ou le message d'erreur
 * @param event Objet représentant l'événement
 */
function reserver(event) {
   event.preventDefault();

    //cache le message d'erreur
    erreur.display = "none";

    if (valideSaisie() !== "") {
        erreur.display = "block";
        reservation.display = "none";
    } else {
        afficheConfirmation();
    }
}

//se lance à chaque fois que le form est envoyé
forms.addEventListener("submit", reserver);
forms.addEventListener("reset", function reset (event) {
    event.preventDefault();

    hotelChoisi.value = "0";
    nbrChambre.innerText =  "";
});