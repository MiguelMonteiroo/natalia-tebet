# Design System — Dra. Natália Tebet

## Direction

"Cuidado especializado, sem constrangimento": coloproctologia apresentada com clareza, discrição e humanização. A interface transmite segurança e cuidado, evitando aparência genérica de clínica estética ou hospital frio.

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--sand` | `#F5F1EB` | Hero background gradient, alternate bands |
| `--paper` | `#FDFCFA` | Page background, cards |
| `--ink` | `#2D2D2D` | Headings, primary text |
| `--ink-muted` | `#5E5E5E` | Body text, captions |
| `--teal` | `#1F6B6A` | Primary CTA, links, section labels, card headings |
| `--teal-dark` | `#155352` | CTA hover |
| `--teal-light` | `#E6F2F1` | Portrait frame background |
| `--stone` | `#E5E0D8` | Borders, dividers |

## Typography

- **Display / headings:** Source Serif 4, 500 weight
- **Body / UI:** Inter, 400/500/600 weights
- Scale: hero `clamp(2.2rem, 5.5vw, 3.4rem)`, section titles `clamp(1.8rem, 4.2vw, 2.5rem)`

## Layout

- Max content width: `1200px`
- Section padding: `72px` vertical
- Card radius: `16px`
- Button radius: `999px` (pill)
- Grid: 1-col mobile, 2-col tablet, 3-col desktop for cards/locations

## Components

### Header
- Fixed top, frosted glass effect
- Hides on scroll down, reveals on scroll up or keyboard focus
- Full desktop navigation only at `1200px+`; mobile menu below

### Buttons
- Primary: teal background, white text, pill shape, WhatsApp icon
- Secondary: white background, ink text, stone border, pill shape

### Cards
- White background, stone border, `16px` radius
- Subtle lift on hover with soft shadow

## Motion

- Scroll reveals: `opacity` + `translateY(24px)` to `0`, duration `0.6s`, ease `[0.16, 1, 0.3, 1]`
- Header slide: `0.3s`
- Mobile menu: `0.18s` fade + slide
- Respect `prefers-reduced-motion`

## Imagery

- Official photo of Dra. Natália in hero
- Official logo in header
- No stock photos of patients
- Hero portrait uses `aspect-ratio: 3/4` and `object-position: top center` to preserve face crop

## Sections

Single-page with anchors: Início, Sobre, Atendimentos, Colonoscopia, Hemorróidas, Cirurgia a Laser, Toxina Botulínica, Estética Íntima, Contato, CTA final.
