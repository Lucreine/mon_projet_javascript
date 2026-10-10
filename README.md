Ce projet Python propose une interface en ligne de commande permettant d'interagir avec des modèles d'IA via l'API RodiumAI.
Il permet de générer une réponse textuelle, une image et une courte vidéo à partir des instructions de l'utilisateur.

## Prérequis

* Python 3.14
* Une clé API RodiumAI valide
* Un terminal Bash

Vérifier la version de Python :

```bash
python3 --version
```

## Installation

Cloner le dépôt GitHub, puis accéder au dossier du projet :

```bash
git clone URL_DU_DEPOT
cd exercice-2
```

Créer un environnement virtuel :

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Installer les dépendances :

```bash
python -m pip install -r requirements.txt
```

## Configuration

Copier le fichier d'exemple `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Ouvrir le fichier `.env` et renseigner sa clé API RodiumAI :

```dotenv
RODIUMAI_API_KEY=votre_cle_api
```

Remplacer `votre_cle_api` par une clé API valide.

**Important :** le fichier `.env` contient des informations confidentielles. Il ne doit jamais être publié sur GitHub.

## Exécution

Depuis la racine du projet, avec l'environnement virtuel activé, lancer :

```bash
python main.py
```

Le programme propose trois étapes :

1. **Chat :** poser une question à un modèle de langage.
2. **Image :** décrire une image à générer.
3. **Vidéo :** décrire une courte vidéo à générer.

À la fin de chaque étape, suivre les instructions du programme pour rester sur l'étape, continuer, revenir en arrière ou quitter.

Les images et les vidéos reçues sont enregistrées dans le dossier `outputs/`, créé automatiquement.

## Dépendances

Les dépendances Python sont listées dans `requirements.txt` :

* `requests` : effectuer les requêtes HTTP vers l'API.
* `python-dotenv` : charger les variables d'environnement du fichier `.env`.

## Gestion des erreurs

Le programme affiche les erreurs HTTP et les messages renvoyés par l'API lorsqu'une requête échoue. L'utilisation des services dépend de la disponibilité de l'API, de la validité de la clé et de l'accès aux modèles demandés.
