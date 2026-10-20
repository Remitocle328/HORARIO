import zlib
import struct
import os

def create_png(width, height, color_bg, draw_schedule=True):
    # Generates a PNG byte buffer
    raw_data = bytearray()
    
    # Precompute pixel colors
    # RGBA
    # color_bg: (r, g, b, a)
    for y in range(height):
        raw_data.append(0) # filter type none
        for x in range(width):
            # Border / rounded card
            # Normalize to 512-based coordinates
            nx = x * 512 // width
            ny = y * 512 // height

            # Background circle or rounded rect
            # Base color
            r, g, b, a = color_bg

            # If inside card (x: 70..442, y: 80..432)
            if draw_schedule and 70 <= nx <= 442 and 80 <= ny <= 432:
                # Top header bar (y: 80..150)
                if ny <= 150:
                    r, g, b, a = (32, 91, 155, 255) # Uniguajira Blue #205b9b
                else:
                    # White card body
                    r, g, b, a = (255, 255, 255, 255)

                    # timetable slots:
                    # slot 1: x: 100..200, y: 180..230 -> Green active slot #16a34a
                    if 100 <= nx <= 220 and 180 <= ny <= 235:
                        if nx in (100, 101, 102, 218, 219, 220) or ny in (180, 181, 182, 233, 234, 235):
                            r, g, b, a = (22, 163, 74, 255) # Border #16a34a
                        else:
                            r, g, b, a = (199, 251, 251, 255) # Light cyan
                    # slot 2: x: 240..360, y: 180..235
                    elif 240 <= nx <= 410 and 180 <= ny <= 235:
                        if nx in (240, 241, 409, 410) or ny in (180, 181, 234, 235):
                            r, g, b, a = (179, 27, 59, 255) # Crimson border
                        else:
                            r, g, b, a = (199, 251, 251, 255)

                    # slot 3: x: 100..220, y: 260..315
                    elif 100 <= nx <= 220 and 260 <= ny <= 315:
                        r, g, b, a = (224, 242, 254, 255)
                    # slot 4: x: 240..410, y: 260..315
                    elif 240 <= nx <= 410 and 260 <= ny <= 315:
                        if nx in (240, 241, 409, 410) or ny in (260, 261, 314, 315):
                            r, g, b, a = (22, 163, 74, 255)
                        else:
                            r, g, b, a = (199, 251, 251, 255)

                    # slot 5: x: 100..410, y: 340..395
                    elif 100 <= nx <= 410 and 340 <= ny <= 395:
                        if nx in (100, 101, 409, 410) or ny in (340, 341, 394, 395):
                            r, g, b, a = (2, 132, 199, 255)
                        else:
                            r, g, b, a = (240, 249, 255, 255)

            raw_data.extend((r, g, b, a))

    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(bytes(raw_data)))
    png += chunk(b'IEND', b'')
    return png

os.makedirs('public', exist_ok=True)

# 192x192
with open('public/pwa-192x192.png', 'wb') as f:
    f.write(create_png(192, 192, (32, 91, 155, 255)))

# 512x512
with open('public/pwa-512x512.png', 'wb') as f:
    f.write(create_png(512, 512, (32, 91, 155, 255)))

# 512x512 maskable (has extra safe-margin background)
with open('public/pwa-maskable-512x512.png', 'wb') as f:
    f.write(create_png(512, 512, (32, 91, 155, 255)))

# 180x180 Apple touch icon
with open('public/apple-touch-icon.png', 'wb') as f:
    f.write(create_png(180, 180, (32, 91, 155, 255)))

print("PWA PNG icons created successfully.")
