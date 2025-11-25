import { Request, Response } from "express";

const PROJECT_ID = "keysystem-d0b86-8df89";
const API_KEY = "AIzaSyD7KlxN05OoSCGHwjXhiiYyKF5bOXianLY";

export async function handleActivateLicense(req: Request, res: Response) {
  const { licenseKey } = req.body;

  if (!licenseKey || typeof licenseKey !== "string") {
    return res.status(400).json({
      message: "License key is required",
    });
  }

  try {
    const trimmedKey = licenseKey.trim();

    // Query Firestore REST API for licenses with matching key
    const query = {
      structuredQuery: {
        from: [{ collectionId: "licenses" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "key" },
            op: "EQUAL",
            value: { stringValue: trimmedKey },
          },
        },
      },
    };

    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      }
    );

    if (!response.ok) {
      console.error("Firestore API error:", await response.text());
      return res.status(500).json({
        message: "Erreur serveur lors de l'activation",
      });
    }

    const results = await response.json();

    // Check if any documents were found
    const documents = results
      .filter((result: any) => result.document)
      .map((result: any) => result.document);

    if (documents.length === 0) {
      return res.status(400).json({
        message: "Clé de licence invalide",
      });
    }

    const licenseDoc = documents[0];
    const licenseData = licenseDoc.fields;

    // Check if license is active
    const isActive = licenseData.isActive?.booleanValue !== false;
    if (!isActive) {
      return res.status(400).json({
        message: "Clé de licence désactivée",
      });
    }

    return res.status(200).json({
      message: "Licence activée avec succès",
      licenseId: licenseDoc.name.split("/").pop(),
    });
  } catch (error) {
    console.error("Error activating license:", error);
    return res.status(500).json({
      message: "Erreur serveur lors de l'activation",
    });
  }
}
