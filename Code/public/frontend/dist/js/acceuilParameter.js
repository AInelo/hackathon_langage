document.addEventListener('DOMContentLoaded', async () => {
    const containertButtonDashboard = document.getElementById('containertButtonDashboard');


    try {
        const userResponse = await axios.post("/user");

        const user = userResponse.data.user;

        if (userResponse.data.user) {
            const user = userResponse.data.user;
            
            // Récupérer le nom de famille en minuscules depuis les informations de l'utilisateur
            const firstNameLowercase = user.firstname.toLowerCase();
            const UserFirstName = user.firstname;
            const UserLastname = user.lastname;
            console.log("Bienvenue: " + UserLastname + UserFirstName);
        
            ButtonDashboard = `<div class="gradient-button">
                                    <a id="" href="/dashboard/${firstNameLowercase}">
                                    <i class="fa fa-user"></i> Mon Compte
                                    </a>
                                </div>`;
            
            containertButtonDashboard.innerHTML = ButtonDashboard;
        } else {
            // Si l'utilisateur est vide, ne rien faire ou afficher un message d'erreur
            console.log("L'utilisateur est vide.");
        }

    } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", userResponse.data.message);
        alert("Erreur lors de la récupération des informations de l'utilisateur. Veuillez réessayer.");
    }
});
