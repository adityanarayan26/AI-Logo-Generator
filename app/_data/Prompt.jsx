export default {
    DESIGN_IDEA_PROMPT: 'Based on Logo of type {logoType} Generate a text prompt to create Logo for Logo title/Brand name : {logoTitle} with decription: {logoDesc} and refering to prompt: {logoPrompt}. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format',

    LOGO_PROMPT: `You are a world-class logo designer with expertise in creating professional, memorable brand identities. Generate a detailed image generation prompt for a logo with these specifications:

Brand Name: {logoTitle}
Brand Description: {logoDesc}
Color Palette: {logoColor}
Design Style: {logoDesign}
Design Concept: {logoIdea}
Reference Style: {logoPrompt}

CRITICAL REQUIREMENTS FOR THE LOGO:
1. CLEAN & PROFESSIONAL: Design must be clean, minimal, and suitable for professional use
2. SCALABLE: Must work at any size (favicon to billboard)
3. WHITE/TRANSPARENT BACKGROUND: Generate on a clean white or transparent background - NO colored backgrounds
4. ICONIC: Create a distinctive, memorable symbol or wordmark
5. BALANCED: Perfect visual balance and proportional spacing
6. MODERN TYPOGRAPHY: If text included, use clean modern fonts with proper kerning
7. HIGH CONTRAST: Colors should have strong contrast for visibility
8. NO GRADIENTS ON EDGES: Keep edges crisp and clean
9. CENTERED COMPOSITION: Logo should be perfectly centered
10. PROFESSIONAL QUALITY: Output should look like it was designed by a premium design agency

Generate a detailed prompt that will create this logo. Return ONLY a JSON object with a "prompt" field containing the optimized image generation prompt.`,

    LOGO_SYSTEM_PROMPT: `You are an expert at creating prompts for AI image generation that produce stunning, professional logos. Your prompts should:
- Be specific and detailed about visual elements
- Include instructions for clean white backgrounds
- Specify professional, scalable design requirements
- Emphasize crisp edges and high contrast
- Request centered, balanced compositions
- Always aim for logo designs that could be used by Fortune 500 companies`
}