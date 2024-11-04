# Utilisation d'une image Node.js version 20.5.0
FROM node:20.5.0-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de dépendances (package.json et package-lock.json)
COPY package.json package-lock.json /app/

# Copier le fichier d'environnement
COPY .env /app/.env

# Installer les dépendances
RUN npm install

# Copier les fichiers source de l'application
COPY . /app/

# Exposer le port 3000 pour le serveur de développement React
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]