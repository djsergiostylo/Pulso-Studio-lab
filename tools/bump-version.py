#!/usr/bin/env python3
"""Sube el numero de version en index.html (etiqueta .ver y ?v= de app.js y styles.css).
Uso:  python tools/bump-version.py 2.85      cambia las tres cosas
      python tools/bump-version.py --check   comprueba que index.html y el ultimo CHANGELOG coinciden"""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html_p, log_p = root / 'index.html', root / 'CHANGELOG.md'
def read(p): return p.read_text(encoding='utf-8')
def versions(h):
    ver = re.search(r'class="ver" aria-label="Versión v([\d.]+)">v([\d.]+)<', h)
    js = re.search(r'app\.js\?v=([\d.]+)', h)
    css = re.search(r'styles\.css\?v=([\d.]+)', h)
    return ver, js, css
def main():
    if len(sys.argv) != 2: sys.exit(__doc__)
    h = read(html_p)
    ver, js, css = versions(h)
    if not (ver and js and css): sys.exit('No encuentro la version, app.js?v= o styles.css?v= en index.html')
    if sys.argv[1] == '--check':
        logv = re.findall(r'^## v([\d.]+)', read(log_p), re.M)[-1]
        vals = {'etiqueta': ver.group(2), 'aria-label': ver.group(1), 'app.js': js.group(1), 'styles.css': css.group(1), 'CHANGELOG': logv}
        print(vals)
        if len(set(vals.values())) != 1: sys.exit('FALLA: las versiones no coinciden')
        print('OK: todo en v' + logv); return
    v = sys.argv[1].lstrip('v')
    if not re.fullmatch(r'\d+\.\d+(\.\d+)?', v): sys.exit('Version no valida: ' + v)
    h = re.sub(r'(class="ver" aria-label="Versión v)[\d.]+(">v)[\d.]+(<)', r'\g<1>' + v + r'\g<2>' + v + r'\g<3>', h)
    h = re.sub(r'(app\.js\?v=)[\d.]+', r'\g<1>' + v, h)
    h = re.sub(r'(styles\.css\?v=)[\d.]+', r'\g<1>' + v, h)
    with open(html_p, 'w', encoding='utf-8', newline='') as f: f.write(h)
    print('index.html -> v' + v)
main()
