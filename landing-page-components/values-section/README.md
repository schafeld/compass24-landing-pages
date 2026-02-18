# Compass24 Unternehmens-Werte Komponente

## Übersicht

Die `values-section.html` ist eine responsive Grid-Komponente zur Anzeige der Compass24 Unternehmenswerte. Sie zeigt sechs zentrale Wertprinzipien in einem modernen, kompakten Kartenformat mit ansprechender visueller Struktur.

![Compass24 Values Section](values-section.png)

## Funktionen

- **Responsive Design**: 1 Spalte (Mobile), 2 Spalten (Tablet), 3 Spalten (Desktop)
- **Kompaktes Grid-Layout**: Quadratische Karten mit minimalen Abständen und effizienter Platzverdeutlichung
- **Moderne Animationen**: Fade-In-Up Effekte mit gestaffelten Verzögerungen
- **Accessibility**: WCAG 2.1 AA konform mit semantischem HTML und ARIA-Labels
- **Design Tokens**: Verwendet Bootstrap-Variablen und Fallback-Werte
- **Hover-Effekte**: Subtile Schattenvertiefung und Anhebung beim Hover
- **Reduzierte Bewegungen**: Respektiert User Preferences für Barrierefreiheit
- **Sauberes Design**: Kantige Panels (kein Border-Radius) für modernen Look

## Inhalte

Die Komponente zeigt folgende sechs Unternehmens-Werte:

1. **Qualität & Expertise** (🎯)
   - Jahrzehntelange Erfahrung und Fachwissen
   - Viele Mitarbeiter sind aktive Wassersportler

2. **Kundenorientierung** (💙)
   - Persönliche Beratung und schneller Service
   - Individuelle Lösungen und Kundennutzen

3. **Innovation** (🚀)
   - Ständige Suche nach neuen Produkten
   - Einsatz moderner Technologien

4. **Familienunternehmen** (👨‍👩‍👧‍👦)
   - Seit über 45 Jahren in Familienhand
   - Kurze Entscheidungswege und persönliche Atmosphäre

5. **Leidenschaft** (🌊)
   - Wassersport als Passion, nicht nur Business
   - Begeisterung in allem, was wir tun

6. **Nachhaltigkeit** (🤝)
   - Soziales Engagement und verantwortungsvolles Handeln
   - Förderung von Kindern und Jugendlichen, Meeres-Schutz

## Einbindung in Shopware CMS

### Schritt 1: Datei öffnen
Öffnen Sie `values-section.html` in einem Text-Editor

### Schritt 2: CSS kopieren
Kopieren Sie den kompletten `<style>` Block aus dem `<head>`

### Schritt 3: HTML kopieren
Kopieren Sie nur das Markup (nicht `<html>`, `<body>` Tags):
```html
<div class="compass24-key-values-component">
  <section class="values-section" aria-labelledby="compass24-values-title">
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
2. Behalten Sie den `.compass24-key-values-component` Präfix für Scope-Isolation
3. Fügen Sie nur noch das HTML-Markup in den CMS-Block ein

## Anpassung der Inhalte

### Neue Wert-Karte hinzufügen

Kopieren Sie diesen Block und passen Sie die Werte an:

```html
<article class="values-grid__item" role="listitem">
  <div class="value-card">
    <div class="value-card__icon" aria-hidden="true">EMOJI</div>
    <h3 class="value-card__title">Wert-Name</h3>
    <p class="value-card__description">
      Beschreibung des Wertes in 2–3 Sätzen. Diese sollte prägnant und aussagekräftig sein.
    </p>
  </div>
</article>
```

### Existierende Werte bearbeiten

**Titel (Wert-Name) ändern:**
```html
<h3 class="value-card__title">NEUER_WERT_NAME</h3>
```

**Beschreibung ändern:**
```html
<p class="value-card__description">
  NEUE_BESCHREIBUNG
</p>
```

**Icon/Emoji ändern:**
```html
<div class="value-card__icon" aria-hidden="true">NEUES_EMOJI</div>
```

### Überschrift und Intro-Text ändern

**Hauptüberschrift:**
```html
<h2 id="compass24-values-title" class="values-header__title">
  NEUE_ÜBERSCHRIFT
</h2>
```

**Intro-Text:**
```html
<p class="values-header__intro">
  NEUER_INTRO_TEXT - Was uns antreibt und auszeichnet...
</p>
```

### Animation-Verzögerungen anpassen

Jede Karte hat eine animierte Verzögerung. Um diese zu ändern, passen Sie die `animation-delay` Werte an:

```css
.values-grid__item:nth-child(1) { animation-delay: 0.05s; }
.values-grid__item:nth-child(2) { animation-delay: 0.1s; }
/* usw. */
```

## Responsive Breakpoints

- **Mobile**: 0 - 639px (1 Spalte, reduziertes Padding)
- **Tablet**: 640px - 1023px (2 Spalten)
- **Desktop**: 1024px+ (3 Spalten)

**Padding-Anpassungen:**
- Mobile: `var(--c24-space-6) var(--c24-space-3)` (reduziert)
- Tablet/Desktop: `var(--c24-space-8) var(--c24-space-4)` (standard)

## Design-Details

### Grid-Layout
- CSS Grid für flexible, responsive Anordnung
- Automatische Spalten-Anpassung je nach Viewport
- Gleichmäßige Abstände zwischen Karten

### Karten-Design
- Quadratisches Layout mit `flex-direction: column`
- Zentrierte Inhalte (text-align: center)
- Weiße Hintergrund mit subtiler Grenze
- Kantige Ecken (border-radius: 0) für modernen Look

### Icons und Symbole
- Unicode-Emojis für visuelle Klarheit
- 2.5rem Größe für gute Sichtbarkeit
- `aria-hidden="true"` um Redundanz für Screen Reader zu vermeiden

### Animationen
- **Fade-In-Up**: 0.5s Einblendung mit 30px vertikalem Offset
- **Staggered Delays**: Verzögerte Einblendung (0.05s bis 0.3s pro Karte)
- **Hover**: 2px Anhebung (`translateY(-2px)`) mit Schattenvertiefung
- **Accessibility**: Alle Animationen bei `prefers-reduced-motion` deaktiviert

### Typografie
- **Titel**: 1rem, 700 Gewicht, UPPERCASE, 0.025em letter-spacing
- **Beschreibung**: 0.875rem, 600 Grau, 1.6 line-height
- **Intro-Text**: Basis 0.9375rem, 600 Grau

## Farben und CSS-Variablen

```css
--c24-color-primary: #003366;           /* Hauptfarbe (Titel) */
--c24-color-gray-600: #4b5563;          /* Text-Farbe */
--c24-color-gray-50: #f9fafb;           /* Sektion Hintergrund */
--c24-color-white: #ffffff;             /* Karten Hintergrund */
--c24-color-gray-200: #e5e7eb;          /* Karten Rand */
```

Passen Sie diese Werte im `.compass24-key-values-component` Block an.

## Hover-Effekte

- **Shadow-Erhöhung**: Von `var(--c24-shadow-md)` zu `var(--c24-shadow-lg)`
- **Vertical Lift**: `-2px` translateY
- **Smooth Transition**: 250ms ease-in-out

## Browser-Unterstützung

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Android)

## Performance-Tipps

- Komponente ist eigenständig und benötigt keine externen Abhängigkeiten
- Reine HTML/CSS-Lösung – kein JavaScript erforderlich
- CSS ist vollständig inline – für mehrfache Nutzung in zentrale Datei auslagern
- Schnelle Ladezeiten und hohe Lighthouse Scores

## Accessibility Features

- ✅ Semantisches HTML (`<section>`, `<article>`, `<header>`)
- ✅ ARIA-Labels für Struktur (`role="list"`, `role="listitem"`)
- ✅ Aussagekräftige IDs und aria-labelledby Attribute
- ✅ Emoji mit `aria-hidden="true"` um Redundanz zu vermeiden
- ✅ Vollständige Keyboard-Navigation
- ✅ Sichtbare Fokus-Indikatoren
- ✅ Farbkontrast WCAG AA konform
- ✅ Unterstützung für "prefers-reduced-motion"
- ✅ Korrekte Überschriften-Hierarchie

## Versionsinformation

- **Version**: 1.0.0
- **Datum**: Februar 2026
- **Verwendung**: About-Seiten, Culture-Pages, PR-Seiten von Compass24

## Notizen

- Diese Komponente ist als eigenständige HTML-Datei für Preview-Zwecke strukturiert
- Für die finale Integration in Shopware sollten gemeinsame Styles mit anderen Komponenten konsolidiert werden
- Das kompakte, kantige Design unterscheidet sich vorsätzlich von anderen, runder gestalteten Komponenten
- Alle Text-Inhalte können ohne Auswirkung auf die Funktionalität geändert werden

## Häufig gestellte Fragen

**F: Kann ich mehr oder weniger als 6 Werte anzeigen?**  
A: Ja! Sie können beliebig viele `<article class="values-grid__item">` Blöcke hinzufügen oder entfernen. Die Animation-Verzögerungen sollten entsprechend angepasst werden.

**F: Wie ändere ich die Anzahl der Spalten?**  
A: Passen Sie die `grid-template-columns` in den Media Queries an:
```css
@media (min-width: 640px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 Spalten */
  }
}
@media (min-width: 1024px) {
  .values-grid {
    grid-template-columns: repeat(4, 1fr);  /* 4 Spalten statt 3 */
  }
}
```

**F: Kann ich die Karten runder machen?**  
A: Ja! Ändern Sie `--c24-border-radius: 0;` zu einem höheren Wert:
```css
--c24-border-radius: 12px;  /* oder 8px, 16px, etc. */
```

**F: Wie mache ich die Karten größer?**  
A: Erhöhen Sie das Padding in der `.value-card` Klasse:
```css
.value-card {
  padding: var(--c24-space-6);  /* statt var(--c24-space-5) */
}
```

**F: Können die Icons durch SVGs ersetzt werden?**  
A: Ja! Ersetzen Sie die Emoji einfach durch `<svg>`-Code oder `<img>`-Tags. Behalten Sie die `aria-hidden="true"` bei.

**F: Wie kann ich die Animation deaktivieren?**  
A: Entfernen Sie die `animation` Eigenschaft aus `.values-grid__item`:
```css
.values-grid__item {
  /* animation: compass24FadeInUp 0.5s ease-out both; <- entfernen */
}
```

**F: Kann ich verschiedene Icons pro Breakpoint zeigen?**  
A: Ja! Nutzen Sie `display: none` in Media Queries um Icons zu verstecken/anzeigen:
```css
@media (max-width: 639px) {
  .value-card__icon {
    display: none;  /* Icons auf Mobile verstecken */
  }
}
```

## Besonderheiten dieser Komponente

- **Kompaktes Design**: Im Gegensatz zu anderen, großzügigeren Komponenten nutzt diese Werte-Sektion ein dichtes, effizientes Layout
- **Kantiges Design**: Keine abgerundeten Ecken – für modernen, minimalistischen Look
- **Mittlere Icons**: 2.5rem Größe – größer als häufig verwendete Icons, aber nicht dominant
- **Uppercase Titel**: Alle Wert-Namen sind in Großbuchstaben für visuelle Prominenz

## Technischer Support

Bei Fragen zu CSS-Anpassungen oder Anpassungen für spezifische Anforderungen konsultieren Sie die [Copilot-Richtlinien dieses Projekts](../../.github/copilot-instructions.md).
