import math
from PIL import Image, ImageDraw

def create_queen_icon(size, filename):
    # Pure airy alabaster linen background #faf9f6
    img = Image.new('RGBA', (size, size), (250, 249, 246, 255))
    draw = ImageDraw.Draw(img)
    
    center = size / 2
    radius = size * 0.44
    
    # Soft sage rounded circle badge
    # Outer circle in soft light mint mist #edf5f0
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        fill=(237, 245, 240, 255),
        outline=(82, 121, 104, 255), # soft calming sage border #527968
        width=max(2, int(size * 0.02))
    )
    
    # Inner subtle rim
    inner_r = radius * 0.88
    draw.ellipse(
        [center - inner_r, center - inner_r, center + inner_r, center + inner_r],
        outline=(220, 232, 225, 255),
        width=max(1, int(size * 0.01))
    )
    
    # Crown Silhouette in Soft Calming Sage #527968
    crown_w = size * 0.44
    crown_h = size * 0.28
    c_left = center - crown_w / 2
    c_right = center + crown_w / 2
    c_top = center - crown_h / 2
    c_bot = center + crown_h / 2
    
    pts = [
        (c_left, c_bot),
        (c_left, c_top + crown_h * 0.35),
        (c_left + crown_w * 0.25, c_top + crown_h * 0.62),
        (center, c_top),
        (c_right - crown_w * 0.25, c_top + crown_h * 0.62),
        (c_right, c_top + crown_h * 0.35),
        (c_right, c_bot)
    ]
    # Soft sage fill
    draw.polygon(pts, fill=(82, 121, 104, 255))
    
    # Warm sand accents on tips
    jewel_r = size * 0.024
    tips = [(c_left, c_top + crown_h * 0.35), (center, c_top), (c_right, c_top + crown_h * 0.35)]
    for x, y in tips:
        draw.ellipse([x - jewel_r, y - jewel_r, x + jewel_r, y + jewel_r], fill=(161, 133, 99, 255))
        
    # Crown headband accent line
    band_h = max(2, int(size * 0.02))
    draw.rectangle([c_left, c_bot - band_h, c_right, c_bot], fill=(161, 133, 99, 255))

    img.save(filename, 'PNG')
    print(f"Generated light aesthetic icon {filename}")

if __name__ == '__main__':
    create_queen_icon(192, 'icon-192.png')
    create_queen_icon(512, 'icon-512.png')
