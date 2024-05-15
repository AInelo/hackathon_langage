const User = require('../models/User');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
const bcrypt = require('bcrypt');
const session = require('express-session');

const signUp = asyncWrapper(async (req, res) => {
    try {
        const { username, password, email } = req.body;

        console.log('Contenu de req.body :', req.body);

        if (!password) {
            return res.status(400).json({ error: 'Veuillez fournir un mot de passe.' });
        }
        // Hash du mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur avec le mot de passe haché
        const user = await User.create({ username, password: hashedPassword, email });

        console.log('Utilisateur créé :', user);

        //res.status(201).json({ user });
        res.redirect('/auth.html');
        // return;
    } catch (error) {
        if (error.code === 11000) {
            console.error('Erreur E11000 : La clé est en double. L\'utilisateur existe déjà.');
            res.status(409).json({ error: 'L\'utilisateur avec cet email existe déjà.' });
        } else {
            console.error('Une erreur s\'est produite lors de la création de l\'utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
        }
    }

    
});



const signIn = asyncWrapper(async (req, res) => {
    
        const { username, password } = req.body;

        // Recherche de l'utilisateur dans la base de données
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({ msg: 'Aucun compte ne correspond à ce nom d\'utilisateur.' });
        }

        // Utilisation de bcrypt pour vérifier le mot de passe
        const isValidPassword = await existingUser.comparePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({ msg: 'Mot de passe incorrect.' });
        }
        // Authentification réussie
        req.session.authenticated = true;
        console.log('Authentification réussie. Authenticated:', req.session.authenticated);

        res.status(200).json({ redirectUrl: '/updatemember.html' });
        
        
});















const signInn = asyncWrapper(async (req, res) => {
    try {
        const { username, password } = req.body;

        // Recherche de l'utilisateur dans la base de données
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({ msg: 'Aucun compte ne correspond à ce nom d\'utilisateur.' });
        }

        // Utilisation de bcrypt pour vérifier le mot de passe
        const isValidPassword = await existingUser.comparePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({ msg: 'Mot de passe incorrect.' });
        }
        // Authentification réussie
        req.session.authenticated = true;
        console.log('Authentification réussie. Authenticated:', req.session.authenticated);

        //res.status(200).json({ username: existingUser.username });

        //res.redirect('/updatemember.html');

        // Redirection renvoyé en format JSON
        res.status(200).json({ redirectUrl: '/updatemember.html' });
        
        // Vous pouvez également envisager de générer un token JWT ici pour l'authentification
    } catch (error) {
        if (error.code === 11000) {
            console.error('Erreur E11000 : La clé est en double. L\'utilisateur existe déjà.');
            res.status(401).json({ msg: 'Nom d\'utilisateur déjà utilisé. Veuillez choisir un autre.' });
        } else {
            console.error('Une erreur s\'est produite lors de la connexion :', error);
            res.status(500).json({ error: 'Erreur lors de la connexion' });
        }
    }
        // Cette partie du code sera exécutée après l'envoi de la réponse JSON
        //res.redirect('updatemember.html');
});


module.exports = { signUp, signIn };
