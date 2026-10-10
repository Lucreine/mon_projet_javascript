
import "dotenv/config";
import { RodiumAI } from "rodiumai";
import { mkdir, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

const client = new RodiumAI();
const OUTPUT_DIR = path.resolve("outputs");

const rl = createInterface({ input, output });

async function ask(question) {
  return (await rl.question(question)).trim();
}

async function chatStep() {
  const question = await ask("Your question: ");

  if (!question) {
    console.log("The question cannot be empty.");
    return;
  }

  try {
    const response = await client.chat(question, {
      model: "openai/gpt-4o",
      max_tokens: 512,
    });

    console.log("\nAnswer:");
    console.log(response.choices[0].message.content);
    console.log("Usage:", response.usage);
  } catch (error) {
    showError(error);
  }
}

async function imageStep() {
  const prompt = await ask("Describe image: ");

  if (!prompt) {
    console.log("The description cannot be empty.");
    return;
  }

  try {
    const response = await client.images({
      model: "google/gemini-3.1-flash-image",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const encoded = response.data?.[0]?.b64_json;

    if (encoded) {
      await mkdir(OUTPUT_DIR, { recursive: true });

      const filePath = path.join(OUTPUT_DIR, "image.png");
      await writeFile(filePath, Buffer.from(encoded, "base64"));

      console.log(`Image enregistrée : ${filePath}`);
    } else {
      console.log("La réponse ne contient pas d'image encodée.");
    }
  } catch (error) {
    showError(error);
  }
}

async function videoStep() {
  const prompt = await ask("Describe a short video: ");

  if (!prompt) {
    console.log("The description cannot be empty.");
    return;
  }

  try {
    const response = await client.videos({
      model: "google/veo-3.1-fast",
      prompt,
      duration_seconds: 0.5,
      timeout: 600_000,
    });

    const video = response.data?.[0];

    if (!video) {
      console.log("La réponse ne contient pas de vidéo.");
      return;
    }

    if (video.b64_json) {
      await mkdir(OUTPUT_DIR, { recursive: true });

      const filePath = path.join(OUTPUT_DIR, "video.mp4");
      await writeFile(
        filePath,
        Buffer.from(video.b64_json, "base64")
      );

      console.log(`Vidéo enregistrée : ${filePath}`);
    } else if (video.url) {
      console.log("Vidéo disponible à cette adresse :", video.url);
    } else {
      console.log("Aucun fichier vidéo ni URL dans la réponse.");
    }
  } catch (error) {
    showError(error);
  }
}

function showError(error) {
  if (error?.errorCode === "rate_limit_exceeded" ||
      error?.name === "RateLimitError") {
    console.error(
      "Limite de requêtes atteinte. Attends avant de réessayer."
    );
  } else {
    console.error("Erreur :", error?.message ?? error);
  }
}

const steps = [
  { title: "Chat", action: chatStep },
  { title: "Image", action: imageStep },
  { title: "Vidéo", action: videoStep },
];

async function main() {
  if (!process.env.RODIUMAI_API_KEY) {
    throw new Error(
      "RODIUMAI_API_KEY est absente du fichier .env."
    );
  }

  let step = 2;

  while (true) {
    console.log(`\n=== Étape ${step + 1} : ${steps[step].title} ===`);

    await steps[step].action();

    const prompt = step === 0
      ? "Rester (r), suivante (s), quitter (q) ? "
      : step === 1
        ? "Retour (b), rester (r), suivante (s), quitter (q) ? "
        : "Retour (b), rester (r), quitter (q) ? ";

    const allowed = step === 0
      ? ["r", "s", "q"]
      : step === 1
        ? ["b", "r", "s", "q"]
        : ["b", "r", "q"];

    let choice;

    while (true) {
      choice = (await ask(prompt)).toLowerCase();

      if (allowed.includes(choice)) break;
      console.log("Choix invalide.");
    }

    if (choice === "q") {
      console.log("Programme terminé.");
      break;
    }

    if (choice === "b") step--;
    if (choice === "s") step++;
  }
}

try {
  await main();
} catch (error) {
  console.error(error.message);
} finally {
  rl.close();
}