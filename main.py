import asyncio
import os
from pathlib import Path

from dotenv import load_dotenv
from rodiumai import RodiumAI
import base64


SCRIPT_DIR = Path(__file__).resolve().parent
load_dotenv(SCRIPT_DIR / ".env", override=True)

OUTPUT_DIR = SCRIPT_DIR / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

API_KEY = os.getenv("RODIUMAI_API_KEY")

if not API_KEY:
    raise ValueError("RODIUMAI_API_KEY est absent du fichier .env")

client = RodiumAI(
    timeout=60,
    stream_timeout=600,
    max_retries=2,
)

async def chat_step():
    question = input("Your question: ").strip()

    if not question:
        print("The question cannot be empty.")
        return

    try:
        response = await client.chat(
            question,
            model="anthropic/claude-opus-4-6",
            max_tokens=512,
        )

        print("\nAnswer:")
        print(response.choices[0].message.content)
        print(f"Usage: {response.usage}")

    except Exception as exc:
        print(f"Erreur pendant le chat : {exc}")


async def image_step():
    prompt = input("Describe image: ").strip()

    if not prompt:
        print("The description cannot be empty.")
        return

    try:
        response = await client.images(
            model="google/gemini-3.1-flash-image",
            prompt=prompt,
            n=1,
            size="1024x1024",
        )

        encoded = response.data[0].b64_json

        if not encoded:
            print("La réponse ne contient pas d'image.")
            return

        image_bytes = base64.b64decode(encoded, validate=True)
        path = OUTPUT_DIR / "image.png"
        path.write_bytes(image_bytes)

        print(f"Image enregistrée : {path}")

    except Exception as exc:
        print(f"Erreur pendant la génération d'image : {exc}")


async def video_step():
    prompt = input("Describe a short video: ").strip()

    if not prompt:
        print("The description cannot be empty.")
        return

    try:
        response = await client.videos(
            model="google/veo-3.1-fast",
            prompt=prompt,
            duration_seconds=0.5,
            timeout=600,
        )

        item = response.data[0]
        encoded = getattr(item, "b64_json", None)

        if encoded:
            path = OUTPUT_DIR / "video.mp4"
            path.write_bytes(base64.b64decode(encoded, validate=True))
            print(f"Vidéo enregistrée : {path}")
        else:
            url = getattr(item, "url", None)
            if url:
                print(f"Vidéo disponible à cette adresse : {url}")
            else:
                print("La réponse ne contient ni vidéo encodée ni URL.")

    except Exception as exc:
        print(f"Erreur pendant la génération vidéo : {exc}")

async def run_step(step):
    steps = {
        1: ("Étape 1 : Chat", chat_step),
        2: ("Étape 2 : Image", image_step),
        3: ("Étape 3 : Vidéo", video_step),
    }
    title, action = steps[step]
    print(f"\n=== {title} ===")
    await action()

async def main():
    step = 1

    while True:
        await run_step(step)

        if step == 1:
            allowed = {"r", "s", "q"}
            prompt = "Rester (r), étape suivante (s), quitter (q) ? "
        elif step == 2:
            allowed = {"b", "r", "s", "q"}
            prompt = "Retour (b), rester (r), suivante (s), quitter (q) ? "
        else:
            allowed = {"b", "r", "q"}
            prompt = "Retour (b), rester (r), quitter (q) ? "

        while True:
            choice = input(prompt).strip().lower()
            if choice in allowed:
                break
            print("Choix invalide.")

        if choice == "q":
            print("Programme terminé.")
            return
        if choice == "r":
            continue
        if choice == "b":
            step -= 1
        elif choice == "s":
            step += 1


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, EOFError):
        print("\nProgramme interrompu.")
    except ValueError as exc:
        print(f"Configuration invalide : {exc}")
