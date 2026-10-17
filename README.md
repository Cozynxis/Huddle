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

## v0.3 — interface overhaul

- Nieuwe CSS-laag met verbeterde layout, hover-states, responsive aanpassingen en een vernieuwde composer.
- Emoji-picker, actie-/bijlagenmenu, opmaakvoorstellen en een poll-tekstsjabloon.
- Uitgebreid instellingenvenster voor displaynaam, status, thema, lokale export en reset.
- Community-menu, kanaalacties, zoektoegang, ledenpaneel-toggle en notificatie-toggle.

**Let op:** knoppen voor uploads, echte uitnodigingen, GIF-provider en stickers tonen voorlopig een melding of placeholder. Dit is nog een lokale demo zonder realtime backend. De wijzigingen zijn naar GitHub geschreven, maar nog niet end-to-end in een browser getest.

## Huddle v0.4 — volledige UI-herbouw

De homepage gebruikt nu `huddle.css` en `huddle.js`. De oudere CSS/JS-bestanden blijven voorlopig in de repo als geschiedenis maar worden niet meer ingeladen.

Nieuwe vierkoloms interface met serverrail, serverbanner, kanalen, DM-navigatie, chatheader, berichtacties, ledenpaneel, rollenweergave, emoji-menu, pollkaarten, zoekdialoog en responsive gedrag. Lokale berichten, servers, kanalen, reacties, polls en profielstatus worden opgeslagen in `localStorage`.

**Demo-beperkingen:** de voorbeeldleden en hun statussen zijn fictieve UI-data. Voice, uploads, uitnodigingen, echte accounts en berichtbezorging tussen gebruikers zijn nog niet geïmplementeerd. Dit is geen beveiligde productieapp. De code is geüpload maar niet automatisch end-to-end getest.
