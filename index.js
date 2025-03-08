// side barre

    // Fonction pour gérer l'affichage de la barre de navigation
function toggleNav() {
        document.getElementById("sidebar").classList.toggle("active"); // Ajouter ou supprimer la classe active
    }

document.querySelectorAll(".site-mzl").forEach(button => {
    button.addEventListener("click", () => {
        alert("cette page n'est pas accessible pour le moment!");
    });
});