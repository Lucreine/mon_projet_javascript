Ce projet Python propose une interface en ligne de commande permettant d'interagir avec des modèles d'intelligence artificielle via le SDK Python **RodiumAI**.

Il propose trois fonctionnalités :

* **Chat :** obtenir une réponse textuelle à partir d'une question.
* **Génération d'images :** créer une image à partir d'une description.
* **Génération de vidéos :** demander la création d'une courte vidéo à partir d'une description.

## Prérequis

* Python 3.14
* Une clé API RodiumAI valide
* Un terminal Bash
* Git

Vérifier la version de Python :

```bash
python3 --version
```

## Installation

Cloner le dépôt GitHub :

```bash
git clone URL_DU_DEPOT
cd mon-projet-python
```

Créer et activer un environnement virtuel :

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Installer les dépendances :

```bash
python -m pip install -r requirements.txt
```

## Configuration

Créer le fichier `.env` à partir du fichier d'exemple :

```bash
cp .env.example .env
```

Ouvrir le fichier `.env` et ajouter une clé API RodiumAI valide :

```dotenv
RODIUMAI_API_KEY=votre_cle_api
```

Remplacer `votre_cle_api` par sa propre clé API.

**Important :** le fichier `.env` contient une information confidentielle. Il ne doit jamais être publié sur GitHub. Le fichier `.env.example` doit uniquement contenir un exemple sans clé réelle.

## Exécution

Depuis la racine du projet, avec l'environnement virtuel activé, exécuter :

```bash
python main.py
```

Le programme guide l'utilisateur à travers trois étapes :

1. **Chat :** saisir une question et consulter la réponse du modèle.
2. **Image :** saisir une description pour demander la génération d'une image.
3. **Vidéo :** saisir une description pour demander la génération d'une courte vidéo.

À la fin de chaque étape, suivre les instructions affichées pour rester sur l'étape, passer à la suivante, revenir à la précédente ou quitter le programme.

Les images et les vidéos sont enregistrées dans le dossier `outputs/` lorsque l'API renvoie les données nécessaires à leur enregistrement.

## Dépendances

Les dépendances sont déclarées dans `requirements.txt` :

* `rodiumai` : communiquer avec les modèles d'IA via le SDK Python RodiumAI.
* `python-dotenv` : charger les variables d'environnement définies dans le fichier `.env`.

## Gestion des erreurs

Le programme affiche un message lorsqu'une opération échoue, notamment en cas de problème de configuration ou d'erreur renvoyée par l'API.

La génération de contenu dépend de la disponibilité du service, des autorisations associées à la clé API, des modèles accessibles et des limites de requêtes ou de crédits du compte.
