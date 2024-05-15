// For the Authentication
const formDOM = document.getElementById('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessageElement = document.getElementById('error-message');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const response = await axios.post('/users/signin', {username, password});

        if (response.data.redirectUrl) {
            // Rediriger l'utilisateur vers l'URL spécifiée
            window.location.href = response.data.redirectUrl;
        } else {
            // Aucune redirection, traitement normal en cas de succès
            console.log('Connexion réussie:', response.data);
            errorMessageElement.textContent = '';
        }

    }catch (error) {
        if (error.code === 11000) {
            console.error('Erreur E11000 : La clé est en double. L\'utilisateur existe déjà.');
            errorMessageElement.textContent = 'Nom d\'utilisateur déjà utilisé. Veuillez choisir un autre.';
        } else {
            errorMessageElement.textContent = "Mot de passe ou Username incorrect";
            console.error('Une erreur s\'est produite lors de la connexion :', error);
        }
    }
})