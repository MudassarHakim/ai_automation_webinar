import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Configuration
OUTPUT_DIR = "ad_creatives"
SIZE = (1080, 1080)

# Cinematic Dark Palette
BG_BLACK = (5, 5, 8)  # Deep charcoal black
GLOW_BLUE = (37, 99, 235)  # Monitor glow blue
GLOW_CYAN = (6, 182, 212)  # Cyan highlights
TEXT_WHITE = (255, 255, 255)
TEXT_SUBTLE = (148, 163, 184)

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def get_font(size, bold=False):
    try:
        if bold:
            return ImageFont.truetype("/System/Library/Fonts/Supplemental/Inter-Bold.ttf", size)
        else:
            return ImageFont.truetype("/System/Library/Fonts/Supplemental/Inter-Regular.ttf", size)
    except IOError:
        return ImageFont.load_default()

def create_cinematic_ad():
    print("Generating Cinematic Ad (Feed 11)...")
    img = Image.new("RGB", SIZE, BG_BLACK)
    draw = ImageDraw.Draw(img)
    
    # 1. Background Atmosphere (Simulating dark room + monitor glow)
    # Create a radial gradient for the monitor glow effect from bottom-center
    glow_layer = Image.new("RGBA", SIZE, (0,0,0,0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Blue monitor glow hitting the "face" area (simulated by bottom-up glow)
    glow_draw.ellipse((-200, 600, 1280, 1400), fill=(37, 99, 235, 60))
    glow_draw.ellipse((200, 700, 880, 1200), fill=(6, 182, 212, 40))
    
    # Blur the glow heavily
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=100))
    img.paste(glow_layer, (0,0), glow_layer)
    
    # 2. "Negative Space" at top for Headline
    # Headline: "AI won’t replace you. A builder will."
    
    headline_font_size = 90
    headline_font = get_font(headline_font_size, bold=True)
    
    text_y = 150
    draw.text((100, text_y), "AI won't", font=headline_font, fill=TEXT_WHITE)
    draw.text((100, text_y + 110), "replace you.", font=headline_font, fill=TEXT_WHITE)
    
    # Emphasis line
    draw.text((100, text_y + 240), "A builder will.", font=headline_font, fill=GLOW_CYAN)
    
    # 3. Visual Context (Abstract Code/Error Elements)
    # Since we can't draw a person, we draw abstract "code blocks" floating
    # to represent the "screen filled with prompts and errors"
    
    code_font = get_font(20)
    code_lines = [
        "> Error: Model timeout at 3:07 AM",
        "> Retrying prompt...",
        "import tensorflow as tf",
        "tensor_shape mismatch",
        "> Deploying agent... Failed."
    ]
    
    code_y_start = 600
    for i, line in enumerate(code_lines):
        opacity = 255 - (i * 40)
        draw.text((100, code_y_start + (i*35)), line, font=code_font, fill=(100, 116, 139, opacity))

    # 4. Cinematic Elements
    # 3:07 AM Clock subtle detail
    clock_font = get_font(24)
    draw.text((950, 50), "03:07 AM", font=clock_font, fill=(50, 50, 70))

    # 5. CTA at bottom
    cta_text = "BECOME THE BUILDER >"
    cta_font = get_font(40, bold=True)
    
    # Button container
    btn_w, btn_h = 600, 100
    btn_x = (SIZE[0] - btn_w) // 2
    btn_y = 900
    
    draw.rounded_rectangle((btn_x, btn_y, btn_x+btn_w, btn_y+btn_h), radius=50, outline=GLOW_BLUE, width=2)
    
    # Center text in button
    bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((btn_x + (btn_w-w)//2, btn_y + (btn_h-h)//2 - 5), cta_text, font=cta_font, fill=TEXT_WHITE)

    output_path = os.path.join(OUTPUT_DIR, "feed_11_cinematic.png")
    img.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    ensure_dir(OUTPUT_DIR)
    create_cinematic_ad()
