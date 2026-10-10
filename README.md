Ce projet propose une interface en ligne de commande permettant d'interagir avec des modèles d'intelligence artificielle via le SDK JavaScript RodiumAI.

Il propose trois fonctionnalités :

* **Chat :** obtenir une réponse textuelle à partir d'une question.
* **Génération d'images :** demander la création d'une image à partir d'une description.
* **Génération de vidéos :** demander la création d'une courte vidéo à partir d'une description.

## Prérequis

* Node.js 18 ou une version supérieure
* npm
* Une clé API RodiumAI valide
* Un terminal Bash
* Git

Vérifier les versions installées :

```bash
node --version
npm --version
```

## Installation

Cloner le dépôt GitHub :

```bash
git clone URL_DU_DEPOT
cd mon-projet-javascript
```

Installer les dépendances :

```bash
npm install
```

Les dépendances du projet sont déclarées dans `package.json` et leurs versions installées sont enregistrées dans `package-lock.json`.

## Configuration

Créer le fichier `.env` à partir du fichier d'exemple :

```bash
cp .env.example .env
```

Ouvrir `.env` et renseigner une clé API RodiumAI valide :

```dotenv
RODIUMAI_API_KEY=votre_cle_api
```

Remplacer `votre_cle_api` par sa véritable clé API.

**Important :** le fichier `.env` contient une information confidentielle. Il ne doit jamais être publié sur GitHub. Le fichier `.env.example` doit rester sans clé réelle :

```dotenv
RODIUMAI_API_KEY=
```

Le programme charge cette variable d'environnement au démarrage grâce à `dotenv`.

## Exécution

Depuis la racine du projet, lancer :

```bash
npm start
```

Le programme propose trois étapes :

1. **Chat :** saisir une question et consulter la réponse du modèle.
2. **Image :** saisir une description pour demander la génération d'une image.
3. **Vidéo :** saisir une description pour demander la génération d'une courte vidéo.

À la fin de chaque étape, suivre les instructions affichées pour rester sur l'étape, revenir en arrière, passer à la suivante ou quitter le programme.

Les images et les vidéos sont enregistrées dans le dossier `outputs/` lorsque le service renvoie les données nécessaires à leur enregistrement. Selon la réponse du service, une vidéo peut aussi être fournie sous forme d'URL.

## Dépendances

Les dépendances JavaScript sont gérées par npm :

* `rodiumai` : SDK JavaScript permettant de communiquer avec les modèles d'IA via RodiumAI.
* `dotenv` : chargement des variables d'environnement depuis le fichier `.env`.

## Gestion des erreurs

Le programme affiche un message lorsqu'une opération échoue, notamment en cas de problème de configuration ou d'erreur renvoyée par l'API.

La génération de contenu dépend de la disponibilité du service, de la validité de la clé API, des modèles accessibles et des limites de requêtes ou de crédits du compte.

Une erreur `rate_limit_exceeded` indique que la requête est limitée par le service. Il convient alors d'attendre le délai indiqué, puis de réessayer.

## Sécurité

Ne jamais publier sa clé API ni le fichier `.env` sur GitHub.
