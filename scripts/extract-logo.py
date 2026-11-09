"""Extract brand SVGs from logo.pdf (vector). Run: python scripts/extract-logo.py
Needs PyMuPDF (pip install pymupdf). Outputs to src/assets/brand/ and public/."""
import re, pymupdf, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
page = pymupdf.open(ROOT / 'logo.pdf')[0]
svg = page.get_svg_image(text_as_path=True)
paths = re.findall(r'<path transform="[^"]*" d="[^"]*" fill="[^"]*"/>', svg)
paths = [p for p in paths if 'fill=' in p]
assert len(paths) == 55, len(paths)
GOLD, BROWN, ORANGE, NAVY = '#af7b2b', '#683919', '#dd6726', '#262261'
MARK = range(0, 10); INC = range(10, 23); RULES = (23, 24); PYR = range(25, 32); TAG = range(32, 55)

def g(idx, swap=None):
    out = []
    for i in idx:
        p = paths[i]
        if swap:
            for a, b in swap.items():
                p = p.replace(f'fill="{a}"', f'fill="{b}"')
        out.append(p)
    return '\n'.join(out)

DARK = {NAVY: '#F6F4EF', BROWN: '#E3B26A'}
DARK_TEXT = {NAVY: '#F6F4EF', BROWN: '#F6F4EF'}

def write(name, vb, body, title='Pyramid Incorporation'):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img">'
         f'<title>{title}</title>\n{body}\n</svg>\n')
    (ROOT / 'src/assets/brand' / name).write_text(s)

# 1. Stacked full logo
full_vb = '60 185 960 660'
write('logo-full.svg', full_vb, g(range(55)))
write('logo-full-dark.svg', full_vb, g(MARK, DARK) + g(range(10, 55), DARK_TEXT))
# 2. Mark only
mark_vb = '210 190 655 372'
write('logo-mark.svg', mark_vb, g(MARK))
write('logo-mark-dark.svg', mark_vb, g(MARK, DARK))
# 3. Horizontal lockup: mark left, wordmark right
#   mark bbox x219..853 y198..553 ; PYRAMID x74..1010 y559..716 ; INCORPORATION x240..832 y744..780
def lockup(dark):
    mk = g(MARK, DARK if dark else None)
    word = g(PYR, DARK_TEXT if dark else None)
    inc = g(INC, DARK_TEXT if dark else None)
    s = 355 / 221  # scale text block (PYRAMID 157 + gap + INC 36 ≈ 230) to mark height
    tx = 634 + 70
    return (f'<g transform="translate(-219,-198)">{mk}</g>'
            f'<g transform="translate({tx},0) scale({s:.4f}) translate(-74,-559)">{word}'
            f'{inc}</g>')
lw = 634 + 70 + 936 * 355 / 221
write('logo-horizontal.svg', f'0 0 {lw:.0f} 355', lockup(False))
write('logo-horizontal-dark.svg', f'0 0 {lw:.0f} 355', lockup(True))
print('ok', lw)
