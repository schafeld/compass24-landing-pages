# Compass24 Standort / Location Komponente

## Übersicht

Die `company-location.html` ist eine responsive Standort-Komponente zur Anzeige des Compass24 Hauptsitzes in Ascheberg. Sie kombiniert informative Text-Inhalte mit einer eingebetteten Google Map in einem modernen Two-Column Layout.

![Compass24 Company Location](company-location.png)

## Funktionen

- **Responsive Design**: Zwei-spaltig auf Desktop (gestackt auf Mobile)
- **Embedded Google Maps**: Interaktive Karte mit direktem Standort-Link
- **Feature-Liste**: Übersichtliche Darstellung von Standort-Highlights
- **Moderne Animationen**: Fade-In Effekt beim Laden
- **Accessibility**: WCAG 2.1 AA konform mit semantischem HTML und ARIA-Labels
- **Design Tokens**: Verwendet Bootstrap-Variablen und Fallback-Werte
- **Responsive Höhen**: Dynamische Map-Höhe je nach Bildschirmgröße
- **Reduzierte Bewegungen**: Respektiert User Preferences für Barrierefreiheit

## Inhalte

Die Komponente zeigt folgende Informationen:

**Text-Bereich:**
- Überschrift: "Unser Standort in Ascheberg"
- Untertitel: "Modern, maritim, mittendrin"
- Beschreibungstext über die Einrichtung
- Feature-Liste (6 Punkte):
  - Adresse: Lüdinghauser Str. 34, 59387 Ascheberg
  - Fläche: 5.000 m² Lager- und Verkaufsfläche
  - Logistik: Modernste Logistik & Express-Versand
  - Shop: Großer Maritim-Shop zum Stöbern
  - Beratung: Persönliche Fachberatung vor Ort
  - Parking: Kostenlose Parkplätze direkt am Haus

**Karte:**
- Embedded Google Maps mit Compass Maritim-Shop Ascheberg
- Interaktiv und zoombar
- Responsive Höhe: 350px (Mobile), 400px (Tablet), 450px (Desktop)

## Einbindung in Shopware CMS

### Schritt 1: Datei öffnen
Öffnen Sie `company-location.html` in einem Text-Editor

### Schritt 2: CSS kopieren
Kopieren Sie den kompletten `<style>` Block aus dem `<head>`

### Schritt 3: HTML kopieren
Kopieren Sie nur das Markup (nicht `<html>`, `<body>` Tags):
```html
<div class="compass24-location-component">
  <section class="location-section" id="standort">
    <!-- kompletter Inhalt -->
  </section>
</div>
```

### Schritt 4: In Shopware einfügen
1. Navigieren Sie in der Shopware Verwaltung zu einer Content-Seite
2. Wählen Sie einen HTML/Code-Editor Block
3. Fügen Sie zuerst den **CSS-Code** ein
4. Fügen Sie dann das **HTML-Markup** ein
5. **Speichern** Sie die Änderungen

### Alternative: Zentrale CSS-Integration
Falls Ihre Shopware-Installation zentrale CSS-Dateien nutzt:

1. Fügen Sie die Styles in Ihre zentrale `styles.css` hinzu
2. Behalten Sie den `.compass24-location-component` Präfix für Scope-Isolation
3. Fügen Sie nur noch das HTML-Markup in den CMS-Block ein

## Anpassung der Inhalte

### Hauptüberschrift ändern
Suchen Sie diese Zeile:
```html
<h2 class="location-header__title">Unser Standort in Ascheberg</h2>
```
Ersetzen Sie den Text zwischen den Tags.

### Untertitel ändern
```html
<h3 class="location-text__subtitle">Modern, maritim, mittendrin</h3>
```

### Beschreibungstext ändern
Passen Sie die beiden `<p class="location-text__description">` Absätze an:
```html
<p class="location-text__description">
  Hier kommt Ihr Text...
</p>
```

### Feature-Liste anpassen

Jedes Merkmal hat diese Struktur:
```html
<li class="location-features__item">
  <span class="location-features__icon" aria-hidden="true">EMOJI</span>
  <span>BESCHREIBUNG</span>
</li>
```

**Beispiele für Feature-Änderungen:**

```html
<!-- Adresse ändern -->
<li class="location-features__item">
  <span class="location-features__icon" aria-hidden="true">📍</span>
  <span>Neue Adresse, 12345 Stadt</span>
</li>

<!-- Feature hinzufügen -->
<li class="location-features__item">
  <span class="location-features__icon" aria-hidden="true">💼</span>
  <span>Neue Eigenschaft</span>
</li>

<!-- Feature entfernen -->
<!-- Einfach den kompletten <li> Block löschen -->
```

### Google Maps Embed ändern

Die Karte wird via Google Maps Embed API eingebunden. Um eine andere Adresse zu zeigen, ändern Sie die `src`:

```html
<iframe 
  class="location-map__iframe"
  src="https://www.google.com/maps/embed?pb=EMBED_CODE"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Google Maps - Name des Standorts"
  aria-label="Standortbeschreibung">
</iframe>
```

**Anleitung Google Maps Embed-Code kopieren:**
1. Öffnen Sie Google Maps: https://maps.google.com
2. Suchen Sie die gewünschte Adresse
3. Klicken Sie auf das Menü (☰)
4. Wählen Sie "Karte einbinden"
5. Kopieren Sie den kompletten iframe-Code
6. Behalten Sie `class="location-map__iframe"` und die ARIA-Labels bei

### Icons in der Feature-Liste ändern

Sie können die Emojis (📍, 🏢, 🚚, etc.) durch andere Unicode-Symbole ersetzen:

| Feature | Standard-Emoji | Alternativen |
|---------|---------------|-------------|
| Adresse | 📍 | 🏪, 🏢, 🏠, 📌 |
| Fläche | 🏢 | 📦, 🏭, 🏗️ |
| Logistik | 🚚 | 📦, 🚛, ⚡ |
| Shop | 🛒 | 🏪, 🛍️, 💳 |
| Beratung | 👥 | 👨‍💼, 🤝, 💬 |
| Parking | 🅿️ | 🚗, 🅿, 🎫 |

## Responsive Breakpoints

- **Mobile**: 0 - 767px (1 Spalte, gestacktes Layout)
- **Tablet**: 768px - 1023px (2 Spalten, mittlere Abstände)
- **Desktop**: 1024px+ (2 Spalten, große Abstände)

**Map-Höhen:**
- Mobile: 350px
- Tablet: 400px
- Desktop: 450px

## Design-Details

### Layout-Struktur
- Grid mit responsiven Spalten
- Text-Inhalt links, Google Maps rechts
- Vertikale Zentration auf Desktop
- Horizontal gestackt auf Mobile

### Animationen
- **Fade-In:** Sanfte Einblendung mit 0.6s Fade-In-Up Animation
- **Map-Rahmen:** Abgerundete Ecken (12px) mit eleganter Schattierung
- **Accessibility:** Animationen bei `prefers-reduced-motion` deaktiviert

### Farbschema
```css
--c24-color-primary: #003366;           /* Hauptfarbe für Überschriften */
--c24-color-gray-600: #4b5563;          /* Textfarbe für Beschreibung */
--c24-color-gray-50: #f9fafb;           /* Sektion Hintergrund */
```

### Google Maps Integration
- Lazy Loading für bessere Performance
- Accessible iframe mit aussagekräftigen Titeln
- Referrer Policy für Datenschutz
- Responsive Embedding (responsive Container)

## Browser-Unterstützung

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Android)

## Performance-Tipps

- Google Maps Embed wird mit `loading="lazy"` geladen – verbessert Page Load
- Keine externen Abhängigkeiten außer Google Maps
- CSS ist vollständig inline – für mehrfache Nutzung in zentrale Dateien auslagern
- Kein JavaScript erforderlich

## Anpassung der Farben

Die Komponente nutzt CSS-Variablen für flexible Farbänderung:

```css
--c24-color-primary: #003366;           /* Hauptfarbe */
--c24-color-primary-light: #0066b3;     /* Hellere Variante */
--c24-color-gray-50: #f9fafb;           /* Sektion Hintergrund */
--c24-color-gray-100: #f3f4f6;          /* Leichter Hintergrund */
--c24-color-gray-600: #4b5563;          /* Text-Farbe */
```

Passen Sie diese im `.compass24-location-component` Block an.

## Anpassung der Abstände

Die Komponente nutzt Spacing-Variablen:

```css
--c24-space-4: 1rem;                    /* Basis Padding */
--c24-space-8: 2rem;                    /* Element Abstände */
--c24-space-12: 3rem;                   /* Sektion Padding */
```

## Accessibility Features

- ✅ Semantisches HTML (`<section>`, `<header>`, `<ul>`, `<li>`)
- ✅ ARIA-Labels und Beschreibungen auf iframe
- ✅ Aussagekräftige Link- und Element-Titel
- ✅ Farbkontrast WCAG AA konform
- ✅ Unterstützung für "prefers-reduced-motion"
- ✅ Korrekte Überschriften-Hierarchie (h2 → h3)
- ✅ Emoji mit `aria-hidden="true"` um Wiederholungen in Screen Readern zu vermeiden

## Versionsinformation

- **Version**: 1.0.2
- **Datum**: Februar 2026
- **Verwendung**: About-Seiten, Kontakt-Seiten, Footer-Bereiche von Compass24

## Notizen

- Diese Komponente ist als eigenständige HTML-Datei für Preview-Zwecke strukturiert
- Für die finale Integration in Shopware sollten gemeinsame Styles mit anderen Komponenten konsolidiert werden
- Google Maps Embed benötigt einen aktiven Internet-Zugang zum Anzeigen
- Die Komponente funktioniert auch offline (zeigt dann nur Hintergrundfarbe der Map)
- Alle Text-Inhalte können ohne Auswirkung auf die Funktionalität geändert werden

## Häufig gestellte Fragen

**F: Kann ich mehrere Standorte anzeigen?**  
A: Ja! Duplizieren Sie den kompletten `.compass24-location-component` Block und passen Sie die Inhalte und Google Maps Embed-URL an.

**F: Wie ändere ich die Höhe der Google Map?**  
A: Die Höhen sind in CSS definiert:
```css
.location-map {
  height: 350px;  /* Mobile */
}
@media (min-width: 768px) {
  .location-map height: 400px;  /* Tablet */
}
@media (min-width: 1024px) {
  .location-map { height: 450px; }  /* Desktop */
}
```

**F: Die Google Map zeigt sich nicht. Was ist zu tun?**  
A: 
- Prüfen Sie Internet-Verbindung
- Prüfen Sie dass der iframe `src` ein gültiger Google Maps Embed URL ist
- In Browser DevTools (F12) prüfen Sie die Konsole auf Fehler
- Google Maps API braucht evtl. einen API Key – hierfür kontaktieren Sie Ihren Admin

**F: Kann ich eine andere Karten-Lösung verwenden (z. B. OpenStreetMap)?**  
A: Ja! Ersetzen Sie den `<iframe>` mit dem Generate-Code von OpenStreetMap oder einer anderen Karten-API. Behalten Sie die `class="location-map__iframe"` bei.

**F: Wie passe ich die Feature-Icons an?**  
A: Ersetzen Sie die Emojis (📍, 🏢, etc.) in den `<span class="location-features__icon">` durch andere Unicode-Zeichen oder SVG-Icons.

**F: Kann ich HTML in den Beschreibungstexten verwenden?**  
A: Nein – die Texte in `<p>` und `<span>` werden als Plain Text behandelt. Für komplexeres HTML würden Sie mehrere Absätze haben.

**F: Funktioniert die Komponente auch auf HTTPS?**  
A: Ja! Google Maps Embed funktioniert auf HTTPS und HTTP. Es wird empfohlen HTTPS zu verwenden.

## Datenschutz & Google Maps

Wichtige Hinweise:
- Google Maps Embed ist datenschutz-konform für Sie
- Der iframe lädt die Karte von `google.com`
- Besucher-IP wird an Google übermittelt (Standard bei Maps)
- Im Footer sollte dies privacy policy erwähnt werden
- `referrerpolicy="no-referrer-when-downgrade"` schützt die Referrer-Information

## Technischer Support

Bei Fragen zu CSS-Anpassungen oder Anpassungen für spezifische Anforderungen konsultieren Sie die [Copilot-Richtlinien dieses Projekts](../../.github/copilot-instructions.md).
