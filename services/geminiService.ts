import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateImageVariation = async (
  base64Image: string,
  prompt: string,
  aspectRatio: string = "1:1"
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Clean base64 string if it contains data URI prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    const mimeType = base64Image.match(/^data:image\/(png|jpeg|jpg|webp);base64,/)?.[1] || 'jpeg';

    // For image variations based on an input image + prompt, we use gemini-2.5-flash-image
    // or gemini-3-pro-image-preview. 
    // The task is to take the input image and "fission" it (create similar variations) based on the text.
    
    const model = 'gemini-2.5-flash-image'; // Good balance of speed and quality for variations

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: `You are an expert fashion photographer and editor. 
            Task: Generate a new fashion image based on the provided reference image.
            Instructions:
            1. Analyze the reference image's model, clothing, and style.
            2. Create a NEW variation where the model performs this action/pose: "${prompt}".
            3. Keep the clothing appearance as consistent as possible with the reference.
            4. Maintain the same lighting mood and background style.
            5. Return a high-quality photorealistic image.`
          },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: `image/${mimeType}`
            }
          }
        ]
      }
    });

    // Extract image from response
    let imageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          // Default to png if not specified, though usually matched
          imageUrl = `data:image/png;base64,${base64Data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image generated from model.");
    }

    return imageUrl;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const generateCreativeImage = async (prompt: string): Promise<string> => {
    try {
        const ai = getClient();
        // Use Imagen for pure text-to-image if available/configured, 
        // but instructions say use gemini-2.5-flash-image by default or pro-image-preview
        // Since this is "Creative Generation" (Text to Image), we can use gemini-3-pro-image-preview for better quality
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    imageSize: '1K',
                    aspectRatio: '3:4'
                }
            }
        });

        let imageUrl = '';
        const parts = response.candidates?.[0]?.content?.parts;
        
        if (parts) {
          for (const part of parts) {
            if (part.inlineData) {
              imageUrl = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
        }
        
        if (!imageUrl) throw new Error("No image generated");
        return imageUrl;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const generateProductScene = async (
  base64Image: string,
  prompt: string,
  category?: string
): Promise<string> => {
    try {
        const ai = getClient();
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        const mimeType = base64Image.match(/^data:image\/(png|jpeg|jpg|webp);base64,/)?.[1] || 'jpeg';

        const categoryContext = category ? `The object is a ${category}.` : '';

        const fullPrompt = `You are an expert product photographer. 
        Task: Create a realistic product photo using the provided object.
        Context: ${categoryContext}
        Instructions:
        1. Place the object from the reference image into the following scene: "${prompt}".
        2. Ensure the object blends naturally with the background (shadows, reflections, lighting matching).
        3. Do NOT distort the product itself. Keep its details, logo, and shape exactly as is.
        4. If the background prompt implies a surface (table, floor), ensure the product sits on it correctly with contact shadows.
        5. Return a high-quality, photorealistic image.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image', 
            contents: {
                parts: [
                    { text: fullPrompt },
                    { inlineData: { data: cleanBase64, mimeType: `image/${mimeType}` } }
                ]
            }
        });

        let imageUrl = '';
        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData) {
                    imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
        if (!imageUrl) throw new Error("No image generated.");
        return imageUrl;
    } catch (error) {
        console.error("Product Scene Gen Error:", error);
        throw error;
    }
}

export const removeWatermark = async (base64Image: string): Promise<string> => {
    try {
        const ai = getClient();
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
        const mimeType = base64Image.match(/^data:image\/(png|jpeg|jpg|webp);base64,/)?.[1] || 'jpeg';

        const prompt = `Task: Remove all watermarks, text, logos, and overlaid graphics from this image.
        Instructions:
        1. Identify any text, logos, or semi-transparent watermarks overlaying the main content.
        2. Remove them completely.
        3. Inpaint the removed areas to match the surrounding texture, lighting, and background seamlessly.
        4. Do not alter the main subject or the overall composition aside from cleaning the overlay.
        5. Return the clean high-quality image.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: prompt },
                    { inlineData: { data: cleanBase64, mimeType: `image/${mimeType}` } }
                ]
            }
        });

        let imageUrl = '';
        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData) {
                    imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
        if (!imageUrl) throw new Error("No image generated.");
        return imageUrl;

    } catch (error) {
        console.error("Remove Watermark Error:", error);
        throw error;
    }
}