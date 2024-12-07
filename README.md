# Projet Web - Ajout des pages Audit Log et Rapport

## Description

Ce projet a pour but de gérer les absences et les retards des employés d'une entreprise. Dans cette branche `Olivier-Frontend`, nous avons ajouté deux sections importantes au site web : **Audit Log** et **Rapport**. Ces pages permettent de suivre et de gérer les événements liés aux employés, comme les connexions, les absences, les demandes de congé, et plus encore.

## Fonctionnalités

### 1. **Audit Log**
La page **Audit Log** permet de suivre toutes les actions effectuées sur le site, telles que les connexions des utilisateurs, la création de rapports, les mises à jour de rôles, et bien plus encore. Chaque action est enregistrée avec les informations suivantes :
- **Action** : Le type d'action effectuée (connexion, création, modification, etc.).
- **Utilisateur** : L'utilisateur ayant effectué l'action.
- **Date** : La date et l'heure de l'action.
- **Description** : Une description détaillée de l'action.

Les utilisateurs peuvent ajouter de nouvelles entrées d'audit via un formulaire et les supprimer si nécessaire.

#### Fonctionnalités supplémentaires :
- **Pagination** : Permet de naviguer entre les différentes pages du journal d'audit.
- **Filtrage** : Permet de filtrer les actions par utilisateur et date.
- **Tri** : Les colonnes peuvent être triées pour faciliter la recherche des actions spécifiques.

### 2. **Rapport**
La page **Rapport** permet de créer, gérer et afficher des rapports concernant les absences, les retards et les demandes de congé des employés. Ces rapports contiennent des informations essentielles telles que :
- **Titre** : Le titre du rapport (par exemple, "Rapport d'absence").
- **Contenu** : La description détaillée du rapport (dates d'absence, raisons, etc.).
- **Date de création** et **date de mise à jour** : Les dates associées à chaque rapport.
- **Tags** : Des étiquettes permettant de catégoriser les rapports (par exemple : Absence, Retard, Congé Maladie).

Les utilisateurs peuvent ajouter, modifier ou supprimer des rapports selon leurs besoins. Ils peuvent également rechercher des rapports par titre et filtrer les rapports en fonction de la date.

### Pages ajoutées :
- **Audit Log** : Pour suivre les actions des utilisateurs.
- **Rapport** : Pour gérer les rapports liés aux absences et aux retards des employés.

## Installation

1. Clonez le dépôt dans votre répertoire local :
   ```bash
   git clone https://github.com/laurm200/Projet-Web-deuxieme-partie.git
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez l'application en local :
   ```bash
   npm run dev
   ```

## Technologies utilisées

- **Vue.js** : Framework JavaScript pour le développement de l'interface utilisateur.
- **Vue Router** : Pour la gestion de la navigation entre les pages.
- **Vite** : Outil de développement pour construire et exécuter le projet.

## Auteurs

- **Olivier Roberge** : Développement de la partie frontend et ajout des fonctionnalités pour les pages **Audit Log** et **Rapport**.


