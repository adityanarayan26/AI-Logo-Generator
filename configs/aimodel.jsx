import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const AiDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a text prompt to create Logo for Logo Title/Brand name : spice,with description: s, with Color combination of Sunset Warmth, also include the Vintage Logo Designs With Text & Icon and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"prompt\": \"Create a vintage-inspired logo for the brand \\\"spice\\\". The logo should evoke warmth and a retro aesthetic. Use a color palette of Sunset Warmth (oranges, reds, yellows, maybe a touch of brown). Incorporate both text (the word \\\"spice\\\") and an icon related to the essence of spice (e.g., a stylized chili pepper, a collection of various spices, a spice grinder silhouette, or abstract swirl representing aroma). The design should have a hand-drawn, artistic style with bold typography and intricate details.  Think vintage food packaging or apothecary labels.  Refer to vintage logo designs with text and icon for inspiration, aiming for a versatile logo suitable for a variety of food-related brands or businesses using spices.  The \\\"s\\\" from \\\"spice\\\" should be creatively integrated into the design, perhaps as a subtle curve or element within the overall composition. The overall feeling should be inviting, warm, and high-quality.\"\n}\n```\n" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : spice with decription: ids and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"logo_ideas\": [\n    {\n      \"idea\": \"Spicy Chili Character Chef\"\n    },\n    {\n      \"idea\": \"Spice Jar Mascot Winking\"\n    },\n    {\n      \"idea\": \"Animated Pepper Grinder Friend\"\n    },\n    {\n      \"idea\": \"Smiling Spice Blend Personified\"\n    },\n       {\n      \"idea\": \"Playful Saffron Bud Mascot\"\n    }\n\n  ],\n  \"prompt\": \"Design a modern mascot logo for the brand \\\"spice\\\" (description: ids). The logo should feature a vibrant and friendly animated character with a playful expression. Referencing the example prompt, the character (select one from above ideas) should be dressed or accessorized in a way that represents spices (e.g., chili chef hat, spice jar clothing, pepper grinder belt, colorful blend apron, saffron bud hat). The character should hold a signature item related to spices or cooking with spices (e.g., a chili pepper, a measuring spoon with spice, a spice grinder, a spice blend scoop, saffron threads). Include decorative touches and natural accents (e.g., spice flowers, chili leaves, spice dust). The background should be a bold, circular design with subtle accents to highlight the character. The brand name \\\"spice\\\" should be displayed in bold, stylized lettering, potentially with a slight curve and complementary decorative lines. The overall style should be fun, welcoming, full of character, and suggest the vibrant flavors of spice.\"\n}\n```\n" },
      ],
    },
  ],
});

export const AiLogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a text prompt to create Logo for Logo Title/Brand name : indian spices,with description: indian  restaurant, with Color combination of Sunset Warmth, also include the Friendly Curry Powder Person and include Modern Mascot Logos design idea and Referring to this Logo Prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.  Give me result in JSON portal with prompt field only" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"prompt\": \"Create a modern mascot logo for 'Indian Spices,' an Indian restaurant. The logo should evoke a sense of 'Sunset Warmth' through its color palette (warm oranges, reds, yellows). Feature a friendly, animated 'Curry Powder Person' mascot. The mascot should have a playful expression and hold a spice shaker or a key ingredient prominently. Design elements should include subtle decorative touches reminiscent of Indian art and natural accents. The background should be a bold, circular design with subtle textures. The brand name 'Indian Spices' should be displayed below in bold, stylized lettering with a slight curve and complementary decorative lines. The overall style should be fun, welcoming, and full of character, similar to a classic mascot logo but with a modern twist.\"\n}\n```\n" },
      ],
    },
  ],
});

export const AiLogoDescription = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a short, engaging description/story (max 100 words) for a logo with Title: 'TechNova' and Description: 'A modern tech company specializing in AI'. The logo features a blue and silver circuit board design. JSON format with 'description' field." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"description\": \"TechNova's logo embodies the future of intelligence with its sleek circuit board motif in cool blue and silver tones. The design represents the seamless integration of artificial intelligence into everyday life, symbolizing connectivity, precision, and innovation. It evokes a sense of trust and cutting-edge technology, positioning TechNova as a leader in the digital revolution.\"\n}\n```\n" },
      ],
    },
  ],
});

export const AiColorSelector = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Given Brand Name: 'EcoFresh', Description: 'Organic fruit delivery', and Palettes: ['Sunset Warmth', 'Forest Greens', 'Ocean Blues']. Select the best palette. JSON format with 'palette' field." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"palette\": \"Forest Greens\"\n}\n```\n" },
      ],
    },
  ],
});

export const AiStyleSelector = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Given Brand Name: 'PixelPlay', Description: 'Indie game studio', and Styles: ['Cartoon Logo', 'App Logo', 'Modern Mascot Logos', 'Minimalists']. Select the best style. JSON format with 'style' field." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"style\": \"Modern Mascot Logos\"\n}\n```\n" },
      ],
    },
  ],
});

export const AiIdeaSelector = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Given Brand Name: 'PixelPlay', Description: 'Indie game studio', and Ideas: ['Retro controller icon', 'Pixel art character', 'Joystick monogram', 'Arcade cabinet silhouette']. Select the best idea. JSON format with 'idea' field." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"idea\": \"Pixel art character\"\n}\n```\n" },
      ],
    },
  ],
});








