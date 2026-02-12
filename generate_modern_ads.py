import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math

# Configuration
OUTPUT_DIR = "ad_creatives"
FEED_SIZE = (1080, 1080)
STORY_SIZE = (1080, 1920)

# Colors (2026 Dark Mode Palette)
BG_DARK = (10, 10, 12)
ACCENT_PURPLE = (124, 58, 237)
ACCENT_BLUE = (37, 99, 235)
ACCENT_CYAN = (6, 182, 212)
TEXT_WHITE = (255, 255, 255)
TEXT_GRAY = (161, 161, 170)
GLASS_BG = (30, 30, 35, 180)
GLASS_BORDER = (255, 255, 255, 30)

# Ad Data from AD_IMAGE_COPY.md
AD_DATA = [
    {"id": "01", "title": "The Copy-Paster", "hook": "You prompt.\nYou paste.\nYou pray.", "cta": "See how builders do it differently"},
    {"id": "02", "title": "Consumer vs Builder", "hook": "AI won't replace you.\nA builder will.", "cta": "Learn what separates them"},
    {"id": "03", "title": "The Senior Freeze", "hook": "Your junior ships\nfaster than you.", "cta": "See what changed"},
    {"id": "04", "title": "Tutorial Hell Exit", "hook": "40 videos.\nZero deployed.", "cta": "Watch something actually get built"},
    {"id": "05", "title": "The Anti-Pitch", "hook": "Not slides.\nNot theory.\nLive code.", "cta": "See the format"},
    {"id": "06", "title": "The 120-Minute Ship", "hook": "Idea to deployed.\n120 minutes.", "cta": "See how it works"},
    {"id": "07", "title": "The Salary Bleed", "hook": "56% more.\nEvery month you wait.", "cta": "Get the details"},
    {"id": "08", "title": "The 3 AM Question", "hook": "49% of devs fear\nreplacement. You?", "cta": "See what 5,000 engineers are doing"},
    {"id": "09", "title": "The Migration", "hook": "5,000 engineers\nalready registered.", "cta": "See why"},
    {"id": "10", "title": "The Monday Standup", "hook": "Walk in Monday knowing\nmore than your team.", "cta": "See how"}
]

STORY_IDS = ["01", "02", "05"]

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def get_font(size, bold=False):
    # Try to load system fonts or fallback
    try:
        # macOS paths
        if bold:
            return ImageFont.truetype("/System/Library/Fonts/Supplemental/Inter-Bold.ttf", size)
        else:
            return ImageFont.truetype("/System/Library/Fonts/Supplemental/Inter-Regular.ttf", size)
    except IOError:
        try:
            if bold:
                return ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", size, index=1)
            else:
                return ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", size, index=0)
        except IOError:
            return ImageFont.load_default()

def draw_gradient_bg(size):
    img = Image.new("RGB", size, BG_DARK)
    draw = ImageDraw.Draw(img)
    
    # Draw subtle gradient orbs
    width, height = size
    
    # Orb 1: Purple (Top Left)
    orb1_bounds = (-width//2, -height//2, width, height//2)
    draw.ellipse(orb1_bounds, fill=ACCENT_PURPLE)
    
    # Orb 2: Blue (Bottom Right)
    orb2_bounds = (0, height//2, width + width//2, height + height//2)
    draw.ellipse(orb2_bounds, fill=ACCENT_BLUE)
    
    # Heavy blur to create gradient mesh effect
    img = img.filter(ImageFilter.GaussianBlur(radius=width//3))
    
    # Overlay dark noise/texture (simulated with just dark overlay for now)
    overlay = Image.new("RGBA", size, (10, 10, 12, 200))
    img.paste(overlay, (0, 0), overlay)
    
    return img

def create_glass_card(size, corner_radius=40):
    # Create a semi-transparent rounded rectangle
    card = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)
    
    # Fill
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=corner_radius, fill=GLASS_BG)
    
    # Border
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=corner_radius, outline=GLASS_BORDER, width=2)
    
    return card

def draw_text_centered(draw, text, position, font, fill, align="center", spacing=10):
    # Calculate text size manually since multiline_textbbox has issues in some PIL versions
    lines = text.split("\n")
    total_height = 0
    max_width = 0
    
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        width = bbox[2] - bbox[0]
        height = bbox[3] - bbox[1]
        max_width = max(max_width, width)
        total_height += height
    
    total_height += (len(lines) - 1) * spacing
    
    x, y = position
    current_y = y - total_height // 2
    
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        line_width = bbox[2] - bbox[0]
        line_height = bbox[3] - bbox[1]
        
        line_x = x - line_width // 2
        draw.text((line_x, current_y), line, font=font, fill=fill)
        current_y += line_height + spacing

def create_feed_ad(ad_data):
    print(f"Generating Feed Ad {ad_data['id']}...")
    img = draw_gradient_bg(FEED_SIZE)
    draw = ImageDraw.Draw(img)
    
    # Title Badge (Top Center)
    title_font = get_font(30, bold=True)
    title_bbox = draw.textbbox((0, 0), ad_data["title"].upper(), font=title_font)
    title_w = title_bbox[2] - title_bbox[0]
    title_h = title_bbox[3] - title_bbox[1]
    
    # Badge bg
    badge_pad_x, badge_pad_y = 40, 20
    badge_x = (FEED_SIZE[0] - title_w) // 2
    badge_y = 100
    
    draw.rounded_rectangle(
        (badge_x - badge_pad_x, badge_y - badge_pad_y, badge_x + title_w + badge_pad_x, badge_y + title_h + badge_pad_y),
        radius=30,
        fill=(255, 255, 255, 20),
        outline=GLASS_BORDER,
        width=1
    )
    draw.text((badge_x, badge_y), ad_data["title"].upper(), font=title_font, fill=ACCENT_CYAN)
    
    # Main Hook (Center)
    # Dynamic font size based on text length
    hook_len = len(ad_data["hook"])
    if hook_len < 20:
        hook_size = 120
    elif hook_len < 40:
        hook_size = 100
    else:
        hook_size = 80
        
    hook_font = get_font(hook_size, bold=True)
    draw_text_centered(draw, ad_data["hook"], (FEED_SIZE[0]//2, FEED_SIZE[1]//2), hook_font, TEXT_WHITE, spacing=30)
    
    # Bottom Section (CTA + Price Anchor)
    cta_font = get_font(40, bold=True)
    price_font = get_font(30, bold=False)
    
    # Pricing Anchor
    price_text = "Rs 4,999 Workshop -> FREE"
    draw_text_centered(draw, price_text, (FEED_SIZE[0]//2, FEED_SIZE[1] - 250), price_font, TEXT_GRAY)
    
    # CTA Button style
    cta_text = ad_data["cta"].upper() + " >"
    cta_bbox = draw.textbbox((0, 0), cta_text, font=cta_font)
    cta_w = cta_bbox[2] - cta_bbox[0]
    cta_h = cta_bbox[3] - cta_bbox[1]
    
    btn_pad_x, btn_pad_y = 60, 30
    btn_x = (FEED_SIZE[0] - cta_w) // 2
    btn_y = FEED_SIZE[1] - 150
    
    draw.rounded_rectangle(
        (btn_x - btn_pad_x, btn_y - btn_pad_y, btn_x + cta_w + btn_pad_x, btn_y + cta_h + btn_pad_y),
        radius=40,
        fill=ACCENT_BLUE
    )
    draw.text((btn_x, btn_y), cta_text, font=cta_font, fill=TEXT_WHITE)
    
    # Save
    output_path = os.path.join(OUTPUT_DIR, f"feed_{ad_data['id']}.png")
    img.save(output_path)

def create_story_ad(ad_data):
    print(f"Generating Story Ad {ad_data['id']}...")
    img = draw_gradient_bg(STORY_SIZE)
    draw = ImageDraw.Draw(img)
    
    # Glass Card Container for content
    card_w = STORY_SIZE[0] - 160
    card_h = 1000
    card_x = 80
    card_y = (STORY_SIZE[1] - card_h) // 2
    
    card = create_glass_card((card_w, card_h))
    img.paste(card, (card_x, card_y), card)
    
    # Re-initialize draw on the main image
    draw = ImageDraw.Draw(img)
    
    # Title (Inside Card Top)
    title_font = get_font(40, bold=True)
    draw_text_centered(draw, ad_data["title"].upper(), (STORY_SIZE[0]//2, card_y + 100), title_font, ACCENT_CYAN)
    
    # Hook (Inside Card Center)
    hook_len = len(ad_data["hook"])
    hook_size = 100 if hook_len < 40 else 80
    hook_font = get_font(hook_size, bold=True)
    
    draw_text_centered(draw, ad_data["hook"], (STORY_SIZE[0]//2, card_y + card_h // 2), hook_font, TEXT_WHITE, spacing=40)
    
    # CTA (Bottom of screen)
    cta_font = get_font(50, bold=True)
    cta_text = ad_data["cta"].upper()
    
    # Arrow animation hint
    draw_text_centered(draw, "^ swipe up to " + cta_text, (STORY_SIZE[0]//2, STORY_SIZE[1] - 250), cta_font, TEXT_WHITE)
    
    # Pricing
    price_font = get_font(35)
    draw_text_centered(draw, "LIMITED TIME: FREE ENTRY", (STORY_SIZE[0]//2, STORY_SIZE[1] - 150), price_font, ACCENT_PURPLE)

    # Save
    output_path = os.path.join(OUTPUT_DIR, f"story_{ad_data['id']}.png")
    img.save(output_path)

def main():
    ensure_dir(OUTPUT_DIR)
    
    # Generate Feeds
    for ad in AD_DATA:
        create_feed_ad(ad)
        
    # Generate Stories
    for ad in AD_DATA:
        if ad["id"] in STORY_IDS:
            create_story_ad(ad)
            
    print("Done! All creatives generated.")

if __name__ == "__main__":
    main()
