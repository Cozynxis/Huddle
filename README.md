# Huddle

Huddle is een nieuw community- en chatplatform, geïnspireerd door de gebruikservaring van Discord maar met een eigen identiteit.

## Versie 0.1 — lokale interactieve basis

Open `index.html` in je browser, of activeer GitHub Pages op de root van de main-branch.

### Werkt al
- Responsive donkere interface
- Servers aanmaken en wisselen
- Tekst- en spraakkanalen aanmaken
- Berichten schrijven en lokaal verwijderen
- Berichten zoeken in lokale data
- Gebruikersnaam aanpassen
- Automatisch bewaren in localStorage
- Overgangen en animaties

### Belangrijk
Deze versie is een **lokale browserprototype**. Data wordt alleen in de eigen browser opgeslagen. Voice, echte accounts, gebruikers onderling, uitnodigingen, beveiligde rollen en realtime synchronisatie zijn **nog niet geïmplementeerd**. Gebruik dit niet als publieke productiechat.

### Volgende ontwikkelfase
Supabase Auth + PostgreSQL + Row Level Security, realtime channels, profiel- en serverbeheer, leden en uitnodigingen, bestanduploads en WebRTC voor voice/video. De permissies moeten server-side worden afgedwongen.

### Branding
Het gekozen Huddle-logo wordt als apart afbeeldingsbestand toegevoegd zodra het als repository-asset is geplaatst; de huidige interface gebruikt tijdelijk een H-monogram.

## Versie 0.2 — uitgebreidere browserinterface

Nieuw: lokale DM-gesprekken, emoji-reacties, berichten bewerken, vastpinnen, doorzoeken, licht/donker-thema, kanalen hernoemen/verwijderen, status wijzigen, JSON-back-up en Ctrl+K om te zoeken.

**Grenzen:** DM's zijn lokale simulaties, niet bezorgd aan andere personen. Voice/video, veilige login, server-side moderatie, bestanden en realtime synchronisatie zijn nog niet gebouwd. Voor productie is een backend met authenticatie en database-permissies nodig.
