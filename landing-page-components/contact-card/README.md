# Compass24 Kontaktkarte Komponente

## Übersicht

Die `contact-card-secretary.html` ist eine responsive Kontaktkarte zur Anzeige von Kontaktinformationen für die Sekretärin. Sie zeigt E-Mail, Telefon und Unternehmensadresse in einem ansprechenden, benutzerfreundlichen Format an.

![Compass24 Contact Card](contact-card-secretary.png)

## Funktionen

- **Responsive Design**: Passt sich automatisch an Mobile und Desktop an
- **Moderne Animationen**: Fade-In-Up Animation beim Laden
- **Accessibility**: WCAG 2.1 AA konform mit semantischem HTML und ARIA-Labels
- **Design Tokens**: Verwendet Bootstrap-Variablen und Fallback-Werte für Konsistenz
- **Interaktive Links**: Anklickbare E-Mail-Links (mailto) und Telefon-Links (tel)
- **Hover-Effekte**: Subtile Animations-Effekte bei Interaktion
- **Reduzierte Bewegungen**: Respektiert User Preferences für Barrierefreiheit
- **Dark Mode Support**: Automatische Anpassung für Dunkelmodell-Einstellungen

## Inhalte

Die Komponente zeigt folgende Kontaktinformationen an:

- **E-Mail**: sekretariat@compass24.de
- **Telefon**: 02593 - 915 0
- **Ansprechpartner**: Frau Richter-Weiß
- **Unternehmen**: Compass Yachtzubehör Handels-GmbH & Co. KG
- **Adresse**: Lüdinghauser Str. 34, 59387 Ascheberg

## Einbindung in Shopware CMS

### Schritt 1: Datei öffnen
Öffnen Sie `contact-card-secretary.html` in einem Text-Editor

### Schritt 2: CSS kopieren
Kopieren Sie den kompletten `<style>` Block aus dem `<head>`

### Schritt 3: HTML kopieren
Kopieren Sie nur das Inhalts-Markup (nicht `<html>`, `<body>` Tags):
```html
<div class="compass24-contact-card-component">
  <section class="contact-card" aria-labelledby="contact-card-title">
    <!-- kompletter Inhalt zwischen diesen Tags -->
  </section>
</div>
```

### Schritt 4: In Shopware einfügen
1. Navigieren Sie in der Shopware Verwaltung zu einer Seite oder einem CMS-Block
2. Wählen Sie einen HTML/Code-Editor Block
3. Fügen Sie zuerst den **CSS-Code** in den `<style>` Block ein
4. Fügen Sie dann das **HTML-Markup** in den Body-Bereich ein
5. **Speichern** Sie die Änderungen

### Alternative: Zentrale CSS-Integration
Falls Ihre Shopware-Installation zentrale CSS-Dateien nutzt:

1. Fügen Sie die Styles in Ihre zentrale `styles.css` hinzu
2. Behalten Sie den `.compass24-contact-card-component` Präfix für Scope-Isolation
3. Fügen Sie nur noch das HTML-Markup in den CMS-Block ein

## Anpassung der Inhalte

Die Kontaktinformationen können einfach bearbeitet werden:

### E-Mail ändern
Suchen Sie diese Zeile:
```html
<a href="mailto:sekretariat@compass24.de">sekretariat@compass24.de</a>
```
Ersetzen Sie `sekretariat@compass24.de` durch die neue E-Mail-Adresse (in beide Stellen!)

### Telefonnummer ändern
Suchen Sie diese Zeile:
```html
<a href="tel:+4925939150">02593 - 915 0</a>
```
- Im `href`: Ersetzen Sie `+4925939150` durch die neue Nummer ohne Leerzeichen (z.B. `+49123456789`)
- Im sichtbaren Text: Ersetzen Sie `02593 - 915 0` durch die formatierte Version (z.B. `0123 - 456789`)

### Ansprechpartner ändern
Suchen Sie diese Zeile:
```html
<div class="company-info__contact-person">z.H. Frau Richter-Weiß</div>
```
Ersetzen Sie `z.H. Frau Richter-Weiß` durch den/die neue/n Ansprechpartner/in

### Unternehmensname ändern
Suchen Sie diese Zeile:
```html
<div class="company-info__name">Compass Yachtzubehör Handels-GmbH & Co. KG</div>
```
Ersetzen Sie`Compass Yachtzubehör Handels-GmbH & Co. KG` durch den neuen Firmennamen

### Adresse ändern
Suchen Sie diesen Block:
```html
<address class="company-info__address">
  Compass Yachtzubehör Handels-GmbH & Co. KG<br>
  Lüdinghauser Str. 34, 59387 Ascheberg
</address>
```
Passen Sie die Zeilen nach dem `<br>` Tag an. Verwenden Sie `<br>` für Zeilenumbrüche.

## Anpassung des Einleitungstextes

Der Einleitungstext "Oder kontaktiere uns direkt:" kann angepasst werden:
```html
<p id="contact-card-title" class="contact-card__header-intro">Oder kontaktiere uns direkt:</p>
```

## Anpassung der Farben

Die Komponente nutzt CSS-Variablen für flexible Farbänderung:

```css
--c24-color-primary: #003366;           /* Hauptfarbe (Überschriften) */
--c24-color-primary-light: #0066b3;     /* Hellere Variante (Hover) */
--c24-color-secondary-dark: #007399;    /* Link-Farbe */
--c24-color-info-bg: #e3f2fd;           /* Hintergrund-Farbe */
--c24-color-white: #ffffff;             /* Textfarbe hell */
--c24-color-gray-600: #4b5563;          /* Textfarbe dunkel */
--c24-color-gray-900: #111827;          /* Textfarbe sehr dunkel */
```

Passen Sie diese im `.compass24-contact-card-component` Block an.

## Responsive Breakpoints

- **Mobile**: 0 - 767px (reduziertes Padding und Font-Größe)
- **Desktop**: 768px+ (Standard-Größe)

## Design-Details

### Hintergrund-Farbe
Die Kartenbasis nutzt `--c24-color-info-bg: #e3f2fd;` – ein helles Blau, das zu Compass24s Markenfarbe passt.

### Icons
Die Komponente nutzt Unicode-Emojis (📧 und 📞) für visuelle Klarheit. Diese können durch SVG-Icons oder andere Symbole ersetzt werden.

### Animationen
- **Fade-In-Up**: Sanfte Einblendung mit vertikaler Bewegung
- **Hover**: Schattenvertiefung bei Hover über die Karte
- **Link-Hover**: Farbe ändert sich und Text wird unterstrichen
- **Accessibility**: Alle Animationen werden bei `prefers-reduced-motion` deaktiviert

### Fokus-Zustände
Links haben einen sichtbaren Fokusring für Keyboard-Navigation:
```css
outline: 2px solid var(--c24-color-primary);
outline-offset: 2px;
```

## Browser-Unterstützung

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Android)

## Performance-Tipps

- Die Komponente ist eigenständig und benötigt keine externen Abhängigkeiten
- Keine JavaScript erforderlich – reine HTML/CSS-Lösung
- Schnelle Ladezeiten und hohe Lighthouse Scores
- CSS ist vollständig inline – für mehrfache Nutzung sollte es in zentrale Dateien ausgelagert werden

## Accessibility Features

- ✅ Semantisches HTML (`<section>`, `<header>`, `<address>`)
- ✅ ARIA-Labels für Struktur und Kontextualisierung
- ✅ Vollständige Keyboard-Navigation
- ✅ Sichtbare Fokus-Zustände
- ✅ Farbkontrast WCAG AA konform
- ✅ Unterstützung für "prefers-reduced-motion"
- ✅ Unterstützung für "prefers-color-scheme: dark"
- ✅ Korrekte Link-Semantik mit `mailto:` und `tel:` Protokollen

## Versionsinformation

- **Version**: 0.0.3
- **Datum**: 2026-02-11
- **Verwendung**: Jobs-Seite von Compass24

## Notizen

- Diese Komponente ist als eigenständige HTML-Datei für Preview-Zwecke strukturiert
- Für die finale Integration in Shopware sollten gemeinsame Styles mit anderen Komponenten konsolidiert werden
- Die Komponente ist sehr mobil-freundlich und zeigt gut auf allen Bildschirmgrößen
- Die Telefon- und E-Mail-Links sind voll funktionsfähig und öffnen nativen Apps (E-Mail-Client, Telefon-App auf Mobilgeräten)

## Häufig gestellte Fragen

**F: Kann ich mehrere Kontaktkarten anzeigen (z. B. für verschiedene Abteilungen)?**  
A: Ja! Duplizieren Sie den kompletten `.compass24-contact-card-component` Block im HTML mehrfach und passen Sie die Inhalte an. Der CSS wird automatisch auf alle angewendet.

**F: Wie ändere ich die Schrift-Größe?**  
A: Passen Sie die CSS-Variablen an, z. B. `--c24-font-size-base: 1.1rem;` für größere Schrift.

**F: Die Karte sieht zu breit aus. Wie mache ich sie schmäler?**  
A: Ändern Sie in der CSS `max-width: 600px;` auf einen kleineren Wert, z. B. `max-width: 500px;`

**F: Kann ich andere Icons verwenden?**  
A: Ja! Ersetzen Sie `📧` und `📞` durch beliebige Unicode-Symbole oder inline SVG-Icons. Achten Sie darauf, `aria-hidden="true"` zu setzen, damit Screen Reader diese nicht vorlesen.

## Technischer Support

Bei Fragen zu CSS-Anpassungen oder Anpassungen für spezifische Anforderungen konsultieren Sie die [Copilot-Richtlinien dieses Projekts](./.github/copilot-instructions.md).
