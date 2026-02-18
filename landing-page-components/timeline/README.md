# Timeline – Unternehmensgeschichte

![Compass24 Timeline](./timeline-vertical-fun-facts-text-and-images-in-one-bubbles.png)

**Version:** 1.2.0 (12. Februar 2026)  
**Datei:** `timeline-vertical-fun-facts-text-and-images-in-one-bubbles.html`

Die Timeline-Komponente stellt die Unternehmensgeschichte von Compass24 in einer visuellen, engagierenden Darstellung vor. Sie zeigt Meilensteine von 1979 bis heute mit alternierenden Text- und Bild-Bubbles.

---

## 📋 Übersicht

### Verwendungszweck

- **About-Seite**: Zentrale Komponente zur Unternehmenshistorie
- **HR / Recruiting**: Zeigt die Stabilität und Geschichte des Unternehmens
- **Firmen-Präsentation**: Professionelle Darstellung der Entwicklung

### Kernfeatures

✅ **Vertikales Layout** – Zeitstrahl mit alternierenden Text und Bildern  
✅ **Responsive Design** – Mobile (1 Spalte) → Tablet/Desktop (2 Spalten)  
✅ **Milestone-Markierung** – Besondere Jahre hervorgehoben  
✅ **Interaktive Bubbles** – Hover-Effekte und Animations  
✅ **Barrierefreiheit** – WCAG 2.1 AA konform  
✅ **Animationen** – FadeInUp mit Staggered Delays  
✅ **Keine Dependencies** – Reines CSS und HTML  

---

## 🎯 Design & Layout

### Responsive Breakpoints

```
Mobile (< 768px)
├─ 1-spaltig (vertikale Linie auf der linken Seite)
├─ Text- und Bild-Bubbles übereinander
└─ Dots und Pfeile angepasst

Tablet/Desktop (≥ 768px)
├─ 2-spaltig (Timeline-Linie in der Mitte)
├─ Alternierend Links/Rechts
├─ Überlapptendes Bubble-Layout
└─ Hover-Effekte aktiviert
```

### Timeline-Dots und Interaktion

- **Standard Dot**: 20px (primäre Farbe)
- **Milestone Dot**: 28px (sekundäre Farbe) – bei Hover wechselt zu Akzent
- **Hover-Effekt**: Dot wird größer (28px) und wechselt Farbe zu Rot

---

## 📝 Inhalte

Die Timeline enthält **8 Meilensteine** mit jeweils:
- **Jahr(e)**: Zeitangabe (z. B. "1979", "1980...")
- **Titel**: Thema des Meilensteins
- **Beschreibung**: Haupttext zu den Ereignissen
- **Fun Facts**: Zusätzliche Interessantes (emoji-basiert)
- **Bild**: Foto/Visualisierung aus dem Archiv

### Aktuelle Timeline-Artikel

| Jahr | Titel | Hervorhebung |
|------|-------|--------------|
| 1979 | Firmengründung | ⭐ Milestone |
| 1980... | Innovation & Entwicklung | — |
| 1990... | Generationen-Wechsel | — |
| 1999... | 20 Jahre Compass® | ⭐ Milestone |
| 2000... | Compass® Goes Online | ⭐ Milestone |
| 2004... | 25 Jahre Compass® | ⭐ Milestone |
| 2010... | Expansion & Kundennähe | — |
| 2019... | 40 Jahre & In Zukunft | ⭐ Milestone |

### Beispiel-Struktur eines Timeline-Items

```html
<article class="timeline__item timeline__item--milestone" role="listitem">
  <div class="timeline__dot" aria-hidden="true"></div>
  
  <div class="timeline__content">
    <span class="timeline__year">1979</span>
    <h3 class="timeline__title">Firmengründung</h3>
    <p class="timeline__description">
      Heinz Dehler gründet die Firma Compass® mit zwei Mitarbeitern...
    </p>
  </div>
  
  <div class="timeline__image-bubble">
    <div class="timeline__facts">
      <span class="timeline__facts-label">🎯 Fun Facts</span>
      <p class="timeline__facts-text">
        Erstes Jahr: 1.100 Aufträge, 12-seitiger Katalog...
      </p>
    </div>
    <div class="timeline__image-wrapper">
      <img src="..." alt="..." loading="lazy">
    </div>
  </div>
</article>
```

**Hinweise:**
- **Milestone-Jahre** bekommen die Klasse `timeline__item--milestone` für besondere Styling
- **Bilder** sollten responsive sein (mit `loading="lazy"`)
- **Fun Facts** sind optional und können angepasst werden

---

## 🛠️ Shopware CMS Integration

### Schritt 1: CSS in Block 1 einfügen

1. Öffne den Texteditor in Shopware
2. Kopiere den gesamten `<style>` Block aus der HTML-Datei
3. Erstelle einen **CSS Block** und füge ihn ein

**Wichtig:** Das `<style>` Tag selbst ist hier nicht nötig, nur der Inhalt zwischen `<style>` und `</style>`.

### Schritt 2: HTML in Block 2 einfügen

1. Erstelle einen **HTML Block**
2. Kopiere den HTML-Content unterhalb des `<style>` Tags:
   ```html
   <div class="compass24-timeline-component">
     <section class="timeline-section" aria-labelledby="compass24-timeline-title">
       ...
     </section>
   </div>
   ```

### Schritt 3: Daten anpassen (Optional)

Bearbeite direkt in Shopware:

**Titel ändern:**
```html
<h2 id="compass24-timeline-title" class="timeline-header__title">Neue Überschrift</h2>
```

**Timeline-Items hinzufügen/löschen:** Dupliziere oder lösche `<article class="timeline__item">` Blöcke.

### Schritt 4: Speichern und Testen

- Speichern Sie den Block
- Testen Sie auf Mobile (F12 → Responsive Mode)
- Überprüfen Sie die Bilder-URLs (müssen erreichbar sein)

---

## 🎨 Anpassung & Customization

### Neue Timeline-Items hinzufügen

Duplizieren Sie diesen Code innerhalb des `.timeline` Divs:

```html
<article class="timeline__item" role="listitem">
  <div class="timeline__dot" aria-hidden="true"></div>
  
  <div class="timeline__content">
    <span class="timeline__year">2025</span>
    <h3 class="timeline__title">Neuer Meilenstein</h3>
    <p class="timeline__description">
      Hier kommt Ihre Beschreibung des Ereignisses hin...
    </p>
  </div>
  
  <div class="timeline__image-bubble">
    <div class="timeline__facts">
      <span class="timeline__facts-label">🎉 Fun Facts</span>
      <p class="timeline__facts-text">Zusätzliche Info oder Link...</p>
    </div>
    <div class="timeline__image-wrapper">
      <img src="BILDURL" alt="Beschreibung" loading="lazy">
    </div>
  </div>
</article>
```

### Als Milestone markieren

Um ein Jahr als besonders hervorzuheben (größeres Dot, andere Farbe):

```html
<article class="timeline__item timeline__item--milestone" role="listitem">
  <!-- Rest wie oben -->
</article>
```

### Farben anpassen

Die Komponente nutzt CSS Custom Properties. Überschreiben Sie diese im Style-Block:

```css
.compass24-timeline-component {
  --c24-color-primary: #003366;           /* Hauptfarbe der Timeline */
  --c24-color-secondary: #0099cc;         /* Farbe der Milestone-Dots */
  --c24-color-accent: #cc0000;            /* Hover-Farbe der Dots */
  --c24-color-gray-50: #f9fafb;           /* Hintergrund */
  --c24-color-gray-600: #4b5563;          /* Text-Farbe */
}
```

### Bilder ersetzen

Ersetzen Sie die `src` URLs in den `<img>` Tags. Empfohlene Größen:

- **Optimal**: 600×400px (4:3 Verhältnis)
- **Große Bildschirme**: Höher auflösend (1200×800px)
- **CDN**: Nutzen Sie Compass24 CDN für Performance

Beispiel:
```html
<img src="https://compass24.b-cdn.net/media/46/4a/0d/1770735480/Firmengebaeude.jpg?width=1920"
     alt="Beschreibung des Bildes"
     loading="lazy">
```

### Fun Facts anpassen

Ersetzen Sie Emoji und Text in den Fact-Bubbles:

```html
<div class="timeline__facts">
  <span class="timeline__facts-label">🎯 Interessant</span>
  <p class="timeline__facts-text">
    Ihre eigene Interessante Tatsache...
  </p>
</div>
```

---

## 🎬 Design-Details

### Responsive Verhalten

**Mobile (< 768px):**
- Timeline-Linie: 4px breit, links positioniert
- Bubbles: Volle Breite minus Abstände
- Arrows: Nur an der rechten Seite der Bubbles
- Keine Hover-Effekte (Touch-optimiert)

**Tablet/Desktop (≥ 768px):**
- Timeline-Linie: 4px, zentriert
- Bubbles: 50% Breite mit Überlappung
- Alternierend Links/Rechts
- Volle Hover-Interaktionen

### Animationen

```css
@keyframes compass24FadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- **Dauer**: 0.6s
- **Timing**: ease-out
- **Staggered Delays**: 0.1s bis 0.8s (für sequenzielle Effekte)

**Für Benutzer mit `prefers-reduced-motion`:** Animationen werden deaktiviert

### Spacing & Größen

```css
--c24-timeline-line-width: 4px;
--c24-timeline-dot-size: 20px;
--c24-timeline-dot-size-large: 28px;  /* Milestone/Hover */
--c24-timeline-overlap: 2rem;          /* Vertikale Überlappung */
```

### Scroll-Trigger (Optional)

Die Komponente nutzt aktuell einfache Load-Animationen. Für Scroll-in-Effekte können Sie Intersection Observer hinzufügen:

```javascript
const items = document.querySelectorAll('.timeline__item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'compass24FadeInUp 0.6s ease-out forwards';
    }
  });
}, { threshold: 0.1 });

items.forEach(item => observer.observe(item));
```

---

## ❓ FAQ

### F: Wie füge ich eine neue Timeline-Phase zwischen zwei existierenden ein?

**A:** Öffne die HTML und positioniere eine neue `<article class="timeline__item">` zwischen den beiden bestehenden Items. Die Animations-Delays (`animation-delay`) werden automatisch via `nth-child()` berechnet.

---

### F: Die Bilder laden nicht. Was tun?

**A:** 
1. Überprüfe die URL in der `src` (muss erreichbar sein, HTTPS)
2. Nutze die Compass24 CDN falls Bilder dort gehostet sind
3. Überprüfe im Browser (F12 → Network) ob die URL antwortet

---

### F: Kann ich die Timeline horizontal machen?

**A:** Die aktuelle Komponente ist vertikal optimiert. Eine horizontale Variante würde eine andere CSS-Struktur benötigen. Kontaktiere das Entwicklungs-Team für eine Horizontal-Variante.

---

### F: Wie viele Items sollte die Timeline haben?

**A:** Empfohlen sind 5–10 Items. Mehr als 15 Items machen die Seite sehr lang. Ziehe in Betracht, ältere Meilensteine zu gruppieren (z. B. "1980–1990").

---

### F: Kann ich die Milestone-Jahre ändern?

**A:** Ja! Entferne einfach die Klasse `timeline__item--milestone` von Items, die nicht hervorgehoben sein sollen, oder füge sie Items hinzu, die prominent sein sollen.

```html
<!-- Änder von: -->
<article class="timeline__item">

<!-- Zu: -->
<article class="timeline__item timeline__item--milestone">
```

---

### F: Die Fun Facts beschreiben sich überlappend auf Mobile. Was tun?

**A:** Verkürzen Sie den Text in den `.timeline__facts-text` Elementen oder nutzen Sie nur das Emoji in älteren Items.

```html
<!-- Kurz halten -->
<p class="timeline__facts-text">
  Erstes Jahr: 1.100 Aufträge
</p>
```

---

### F: Kann ich Links in die Fun Facts einfügen?

**A:** Ja, die Komponente unterstützt `<a>` Tags mit automatischem Styling:

```html
<p class="timeline__facts-text">
  Lesen Sie mehr <a href="/about">in unserem Blog</a>
</p>
```

---

### F: Wie ändere ich die Farben der Timeline?

**A:** Ändere diese CSS-Variablen im `.compass24-timeline-component`:

```css
/* Timeline-Linie */
background: linear-gradient(
  to bottom,
  #0066b3,    /* Start-Farbe */
  #003366,    /* Mitte */
  #002244     /* End-Farbe */
);

/* Dots */
--c24-color-primary: #003366;      /* Standard Dot */
--c24-color-secondary: #0099cc;    /* Milestone Dot */
--c24-color-accent: #cc0000;       /* Hover Dot */
```

---

### F: Funktioniert die Timeline auch auf Handys?

**A:** Vollständig! Sie ist mobile-first optimiert:
- Responsive Layout auf allen Größen
- Touch-freundliche Zielgruppen (min 44×44px)
- Optimierte Animationen (reduziert auf Mobile)

Teste mit F12 → Responsive Device Mode.

---

### F: Kann ich die Timeline ohne Bilder darstellen?

**A:** Ja, setzen Sie die Bilder einfach leer oder entfernt das `.timeline__image-bubble` Div vollständig:

```html
<!-- Entfernen Sie diesen Block: -->
<div class="timeline__image-bubble">
  ...
</div>

<!-- Und die Komponente nutzt dann nur Text-Bubbles -->
```

---

### F: Wie deaktiviere ich die Hover-Effekte?

**A:** Entfernt diese CSS aus dem Style-Block:

```css
.timeline__item:has(.timeline__content:hover) .timeline__dot,
.timeline__item:has(.timeline__image-bubble:hover) .timeline__dot {
  /* Hover-Effekt-Styles */
}
```

---

### F: Kann ich andere Layoutvariationen nutzen?

**A:** Ja! Im Archiv-Ordner findest du andere Varianten:
- `timeline-vertical-layout-text-bubbles-only.html` – Nur Text
- `timeline-vertical-layout-text-and-image-bubbles.html` – Andere Arrangement
- `timeline-masonry-layout.html` – Masonry-Stil (experimentell)

---

## 🔗 Verwandte Komponenten

- **[Über-uns Seite](../ueber-uns.html)** – Nutzt diese Timeline
- **[Company Benefits](../company-benefits/README.md)** – Andere Story-Komponente
- **[Values Section](../values-section/README.md)** – Weitere Unternehmens-Info

---

## 📖 Technische Details

| Eigenschaft | Wert |
|-------------|------|
| **HTML-Elemente** | `<article>`, `<section>`, `<div>`, `<img>` |
| **CSS-Scoping** | `.compass24-timeline-component` |
| **JavaScript** | Keine (reines CSS + HTML) |
| **Dependencies** | Keine |
| **File Size** | ~20KB (mit Inline CSS) |
| **Browser-Support** | Chrome, Firefox, Safari, Edge (letzte 2 Versionen) |
| **Accessibility** | WCAG 2.1 AA konform |
| **Mobile-First** | ✅ Ja |

---

## 📧 Support & Feedback

Fragen oder Verbesserungen?
- **Email**: info@compass24.de
- **GitHub**: github.com/schafeld/compass24-landing-pages

---

**Version History:**
- **v1.2.0** (12.02.2026) – Finale Version mit 8 Items
- v1.1.0 (10.02.2026) – Responsive Fixes
- v1.0.0 (01.02.2026) – Initiale Version

Stand: **18. Februar 2026**
