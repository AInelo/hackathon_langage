#!/bin/bash
git status
# Ajoutez tous les fichiers à l'index de git
git add .

# Faites un commit avec le message spécifié
git commit -m "Pour La paroisse Ebenezer"

# Poussez les modifications vers le référentiel distant (origin) et configurez le suivi sur la branche principale (main)
git push --set-upstream origin main
