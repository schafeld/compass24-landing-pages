# Compass24 Benefits Component

## Übersicht

Die `company-benefits.html` ist eine responsive Komponente zur Darstellung der Unternehmensvorteile von Compass24. Sie zeigt sechs Benefit-Karten in einem modernen Grid-Layout mit Symbolen, Titeln und aussagekräftigen Beschreibungstexten.

![Compass24 Benefits Component](company-benefits.png)

## Funktionen

- **Responsive Design**: Passt sich automatisch an Mobile (1 Spalte), Tablet (2 Spalten) und Desktop (3 Spalten) an
- **Moderne Animationen**: Fade-In-Up Animationen mit Versatzeffekt für visuelles Interesse
- **Accessibility**: Vollständige WCAG 2.1 AA Konformität mit semantischem HTML und ARIA-Labels
- **Design Tokens**: Verwendet Bootstrap-Variablen und Fallback-Werte für Konsistenz
- **Hover-Effekte**: Interaktive Kartenerweiterung mit Schatteneffekt
- **Reduzierte Bewegungen**: Respektiert User Preferences für barrierefreie Nutzung

## Inhalte

Die Komponente zeigt folgende sechs Benefits:

1. **Familienunternehmen** - Seit 1979 familiengeführt mit flachen Hierarchien
2. **Entwicklungschancen** - Weiterbildungen und individuelle Karrierepfade
3. **Wassersport-Passion** - Arbeite mit deiner Leidenschaft: Segeln
4. **Work-Life-Balance** - 30 Tage Urlaub und flexible Arbeitszeiten
5. **Attraktive Vergütung** - Faire Bezahlung und Mitarbeiterrabatte
6. **Moderner Arbeitsplatz** - Neueste Technik und inspirierendes Umfeld

## Einbindung in Shopware CMS

### Kopieren des Inhalts

Um diese Komponente in Shopware einzubinden, folgen Sie diesen Schritten:

1. **Öffnen Sie die Datei** `company-benefits.html` in einem Text-Editor
2. **Kopieren Sie nur den Inhaltsbereich** (nicht `<html>`, `<head>` oder `<body>` Tags):
   ```html
   <div class="compass24-benefits-component">
     <section class="benefits-section" aria-labelledby="benefits-title">
       <!-- kompletter Inhalt zwischen diesen Tags -->
     </section>
   </div>
   ```

3. **Kopieren Sie die `<style>` Block** aus dem `<head>` Bereich

### Einfügen in Shopware

1. Navigieren Sie in der Shopware Verwaltung zu einer Seite oder einem CMS-Block
2. Wählen Sie einen HTML/Code-Editor Block
3. Fügen Sie zuerst den **CSS-Code** in den `<style>` Block ein
4. Fügen Sie dann den **HTML-Inhalt** in den Body-Bereich ein
5. **Speichern** Sie die Änderungen

### Alternative: Als separater CSS-Block

Falls Ihre Shopware-Installation zentrale CSS-Dateien nutzt:

1. Fügen Sie die Styles aus dem `<style>` Block in Ihre zentrale `styles.css` hinzu
2. Benennen Sie die CSS-Variablen entsprechend um (z.B. `c24-` Präfix behalten)
3. Fügen Sie nur noch das HTML-Markup in den CMS-Block ein

## Anpassung des Inhalts

Um die Texte und Symbole anzupassen:

- **Symbole**: Ersetzen Sie die Emoji (👥, 🎯, ⚓, etc.) in den `.benefit-icon` Divs
- **Überschriften**: Passen Sie die `<h3>` Texte an
- **Beschreibungen**: Bearbeiten Sie die `<p>` Texte
- **Anzahl der Cards**: Duplizieren oder löschen Sie `<article class="benefit-card">` Blöcke

## Anpassung der Farben

Die Komponente nutzt CSS-Variablen für einfache Farbänderungen:

```css
--c24-color-primary: #003366;           /* Hauptfarbe */
--c24-color-primary-light: #0066b3;     /* Hellere Variante */
--c24-color-white: #ffffff;             /* Hintergrund */
--c24-color-gray-50: #f9fafb;           /* Sektion Hintergrund */
```

Passen Sie diese Werte im `.compass24-benefits-component` Block an.

## Responsive Breakpoints

- **Mobile**: 0 - 767px (1 Spalte)
- **Tablet**: 768px - 1023px (2 Spalten)
- **Desktop**: 1024px+ (3 Spalten)

## Browser-Unterstützung

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Android)

## Performance-Tipps

- Die Komponente ist eigenständig und benötigt keine externen Abhängigkeiten
- Bilder/SVGs können statt Emojis verwendet werden für bessere visuelle Kontrolle
- CSS ist vollständig inline - für mehrfache Nutzung sollte es in zentrale Dateien ausgelagert werden

## Accessibility Features

- ✅ Semantisches HTML (`<section>`, `<article>`, `<header>`)
- ✅ ARIA-Labels für Struktur und versteckte Inhalte
- ✅ Keyboard-Navigation unterstützt
- ✅ Farbkontrast WCAG AA konform
- ✅ Unterstützung für "prefers-reduced-motion"

## Versionsinformation

- **Version**: 0.0.1
- **Datum**: 2026-02-11
- **Verwendung**: Jobs-Seite von Compass24

## Notizen

- Diese Komponente ist als eigenständige HTML-Datei für Preview-Zwecke strukturiert
- Für die finale Integration in Shopware sollten gemeinsame Styles mit anderen Komponenten konsolidiert werden
- Alle Text-Inhalte können ohne Auswirkung auf die Funktionalität geändert werden
