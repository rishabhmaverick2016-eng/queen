import math
from PIL import Image, ImageDraw

def create_queen_icon(size, filename):
    img = Image.new('RGBA', (size, size), (24, 11, 22, 255))
    draw = ImageDraw.Draw(img)
    
    center = size / 2
    radius = size * 0.44
    
    # Radial wine to rose background
    for r in range(int(radius), 0, -2):
        factor = r / radius
        red = int(234 * (1 - factor) + 116 * factor)
        green = int(105 * (1 - factor) + 27 * factor)
        blue = int(139 * (1 - factor) + 71 * factor)
        draw.ellipse([center - r, center - r, center + r, center + r], fill=(red, green, blue, 255))
    
    # Outer champagne gold rim
    border_w = max(2, int(size * 0.025))
    draw.ellipse([center - radius, center - radius, center + radius, center + radius], outline=(226, 186, 109, 255), width=border_w)
    
    # Crown Silhouette
    # Base width & height
    crown_w = size * 0.50
    crown_h = size * 0.32
    c_left = center - crown_w / 2
    c_right = center + crown_w / 2
    c_top = center - crown_h / 2
    c_bot = center + crown_h / 2
    
    # 5-point crown polygon
    pts = [
        (c_left, c_bot),
        (c_left, c_top + crown_h * 0.35),
        (c_left + crown_w * 0.25, c_top + crown_h * 0.6),
        (center, c_top),
        (c_right - crown_w * 0.25, c_top + crown_h * 0.6),
        (c_right, c_top + crown_h * 0.35),
        (c_right, c_bot)
    ]
    draw.polygon(pts, fill=(253, 232, 188, 255))
    
    # Jewels on crown tips
    jewel_r = size * 0.03
    for x, y in [(c_left, c_top + crown_h * 0.35), (center, c_top), (c_right, c_top + crown_h * 0.35)]:
        draw.ellipse([x - jewel_r, y - jewel_r, x + jewel_r, y + jewel_r], fill=(234, 105, 139, 255))
        
    # Small sparkling flower / gem at center base
    gem_r = size * 0.045
    draw.ellipse([center - gem_r, c_bot - crown_h * 0.25 - gem_r, center + gem_r, c_bot - crown_h * 0.25 + gem_r], fill=(116, 27, 71, 255), outline=(226, 186, 109, 255), width=max(1, int(size*0.015)))

    img.save(filename, 'PNG')
    print(f"Generated {filename}")

if __name__ == '__main__':
    create_queen_icon(192, 'icon-192.png')
    create_queen_icon(512, 'icon-512.png')
