# Compass24 Schlüsselzahlen Komponenten

## Übersicht

Die Komponenten in diesem Verzeichnis sind Vollbild-Banner zur Darstellung von Compass24 Schlüsselzahlen für Werbe- und Informationszwecke. Es gibt zwei Datensätze mit unterschiedlichen Metriken, die flexibel einsetzbar sind.

## Zwei Datensätze verfügbar

### 1. Key Metrics - Datensatz 1
**File:** `key-metrics-section-data-1.html`

![Compass24 Key Metrics - Datensatz 1](key-metrics-section-data-1.png)

**Metriken:**
- **1979** - Gründungsjahr
- **42.000+** - Artikel im Sortiment
- **400+** - Seiten Katalog
- **3.000+** - Pakete täglich
- **11** - Online Shops weltweit

Version: 1.0.3 | Datum: 2026-02-16

### 2. Key Metrics - Datensatz 2
**File:** `key-metrics-section-data-2.html`

![Compass24 Key Metrics - Datensatz 2](key-metrics-section-data-2.png)

**Metriken:**
- **100+** - Mitarbeiter
- **15.000 m²** - Lagerfläche
- **800.000+** - Kunden
- **150+** - Marken
- **2.000+** - Eigenprodukte

Version: 1.0.2 | Datum: 2026-02-16

## Funktionen

- **Responsive Design**: Passt sich an Mobile/Tablet (3 in erster, 2 in zweiter Zeile) und Desktop (5 Spalten) an
- **Moderne Animationen**: Fade-In Animationen mit Versatzeffekt für atraktive Wirkung
- **Gradient Hintergrund**: Ansprechendes Blau-Gradient im Compass24 Brand
- **Accessibility**: Vollständige WCAG 2.1 AA Konformität mit semantichem HTML und ARIA-Labels
- **Design Tokens**: Verwendet Bootstrap-Variablen mit Fallback-Werten
- **Hover-Effekte**: Interaktive Kartenerweiterung mit subtiler Anhebung
- **Reduzierte Bewegungen**: Respektiert User Preferences für Barrierefreiheit

## Responsive Breakpoints

- **Mobile**: 0 - 479px (3 in erster, 2 in zweiter Zeile)
- **Tablet**: 480px - 767px (3 in erster, 2 in zweiter Zeile)
- **Desktop**: 768px - 1199px (5 Spalten, mittlerer Abstand)
- **Large Desktop**: 1200px+ (5 Spalten, großer Abstand)

## Einbindung in Shopware CMS

### Schritt 1: Datei öffnen
Öffnen Sie `key-metrics-section-data-1.html` oder `key-metrics-section-data-2.html` in einem Text-Editor

### Schritt 2: CSS kopieren
Kopieren Sie den kompletten `<style>` Block:
```html
<style>
  /* kompletter CSS-Code */
</style>
```

### Schritt 3: HTML kopieren
Kopieren Sie nur den Inhaltsbereich (nicht `<html>`, `<body>` Tags):
```html
<div class="compass24-key-metrics-component">
  <section class="metrics-section" aria-label="Compass24 Schlüsselzahlen">
    <!-- kompletter Inhalt -->
  </section>
</div>
```

### Schritt 4: In Shopware einfügen
1. Navigieren Sie zu einer CMS-Seite in der Shopware Verwaltung
2. Wählen Sie einen HTML/Code-Editor Block
3. Fügen Sie die **CSS** in den `<style>` Bereich ein
4. Fügen Sie das **HTML-Markup** in den Body-Bereich ein
5. **Speichern** Sie die Änderungen

### Alternative: Zentrale CSS-Integration
Falls Ihre Installation zentrale CSS-Dateien nutzt:

1. Fügen Sie die Styles aus dem `<style>` Block in `styles.css` ein
2. Behalten Sie den `.compass24-key-metrics-component` Präfix für Scope-Isolation
3. Fügen Sie nur das HTML-Markup in den CMS-Block ein

## Anpassung der Metriken

Um die Werte und Labels zu ändern:

**Metriken-Wert ändern:**
```html
<span class="metric-item__value">HIER_WERT_ÄNDERN</span>
```

**Label/Beschreibung ändern:**
```html
<span class="metric-item__label">HIER_LABEL_ÄNDERN</span>
```

**Beispiel:**
```html
<div class="metric-item" role="listitem">
  <span class="metric-item__value">25.000+</span>
  <span class="metric-item__label">Aktive Kunden</span>
</div>
```

### Metriken hinzufügen oder entfernen
Sie können `.metric-item` Blöcke hinzufügen oder entfernen. Beachten Sie jedoch:
- Die Grid-Layout ist auf 5 Spalten optimiert
- Bei mehr/weniger Spalten sollten Sie die `grid-template-columns` in den Media Queries anpassen

## Anpassung der Farben

Die Komponente nutzt CSS-Variablen für flexible Farbänderungen:

```css
--c24-color-primary: #003366;           /* Hauptfarbe */
--c24-color-primary-light: #0066b3;     /* Hellere Variante */
--c24-color-primary-dark: #002244;      /* Dunklere Variante */
--c24-color-white: #ffffff;             /* Textfarbe */
```

Passen Sie diese im `.compass24-key-metrics-component` Block an, um das Gradient-Layout zu verändern.

## Design-Details

### Farbverlauf
Der Hintergrund verwendet einen diagonalen Gradient über die drei Blautöne:
```css
background: linear-gradient(135deg, 
  var(--c24-color-primary-dark) 0%, 
  var(--c24-color-primary) 50%, 
  var(--c24-color-primary-light) 100%);
```

### Subtile Pattern-Overlay
Ein dezentes Radial-Gradient Pattern sorgt für visuelle Tiefe ohne Ablenkung.

### Animationen
- Fade-In Effekt beim Load
- Staggered Animation Delays (0.1s bis 0.5s)
- Hover: Subtile Anhebung (-4px translateY)
- Accessibility: Alle Animationen werden bei `prefers-reduced-motion` deaktiviert

## Unterschiede zwischen den Datensätzen

| Feature | Datensatz 1 | Datensatz 2 |
|---------|------------|------------|
| Fokus | Unternehmensgeschichte | Operationale Kennzahlen |
| Zeitraum | Historisch (1979-heute) | Aktuell |
| Best For | About-Seiten | HR/Recruiting |
| Superschrift | Nein | Ja (m² bei Lagerfläche) |

Beide Datensätze sind identisch im Layout und Design - unterscheiden sich nur im Inhalt.

## Synchronisierung
⚠️ **Wichtig:** Wenn Sie Layout- oder Style-Änderungen vornehmen, achten Sie darauf, beide Dateien (`data-1.html` und `data-2.html`) zu synchronisieren, um konsistentes Design zu bewahren.

## Browser-Unterstützung

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Android)

## Performance-Tipps

- Die Komponente ist eigenständig und benötigt keine JavaScript-Abhängigkeiten
- CSS ist vollständig inline - für mehrfache Nutzung sollte es in zentrale Dateien ausgelagert werden
- Keine Bilder nötig - reine HTML/CSS Lösung
- Schnelle Ladezeiten und hohe Lighthouse Scores

## Accessibility Features

- ✅ Semantisches HTML (`<section>`, `<div>` mit korrekten Rollen)
- ✅ ARIA-Labels für Screen Reader
- ✅ Vollständige Keyboard-Navigation
- ✅ Farbkontrast WCAG AA konform
- ✅ Unterstützung für "prefers-reduced-motion"
- ✅ Keine Abhängigkeit von Farbe allein für Information

## Quellen & Daten

Metrik-Werte basieren auf Informationen von: https://www.compass24.de/ueber-uns

Für aktuelle Daten prüfen Sie bitte regelmäßig die Website und aktualisieren Sie die Komponente entsprechend.

## Notizen

- Diese Komponenten sind als eigenständige HTML-Dateien für Preview strukturiert
- Zum finalen Rollout sollten gemeinsame Styles konsolidiert werden
- Beide Datensätze können auf der gleichen Seite verwendet werden (jeweils ein Datensatz pro Seite empfohlen)
- Alle numerischen Werte können ohne Funktionalitätsverlust geändert werden
