# Solar Odyssey

Premium interactive 3D web experience — travel through the Solar System aboard a futuristic spacecraft.

## Commands

```bash
npm run dev          # Start dev server (Turbopack, port 3000)
npm run build        # Production build
npm run lint         # ESLint
```

## Stack

- **Next.js 15** (App Router, Turbopack)
- **React Three Fiber + drei** — 3D rendering
- **Three.js** — underlying 3D engine
- **GSAP** — cinematic camera animations
- **Framer Motion** — UI transitions
- **Tailwind CSS v4** — styling (theme in `app/globals.css` via `@theme`)
- **Zustand** — global state (`src/store/`)

## Architecture

### Single Persistent Canvas

One `<Canvas>` lives in `app/layout.tsx` via `CanvasWrapper`. It never unmounts. 3D scenes swap inside it based on Zustand state — **not** React routing. Next.js pages set Zustand state and render 2D overlays on top.

### Routing

```
/                  → Intro scene
/explore           → Solar System overview
/explore/[planet]  → Planet detail (e.g. /explore/mars)
/scale             → Scale mode
/compare           → Compare mode
```

### State

Zustand store in `src/store/index.ts` with slices:
- `scene` — current scene ID, active planet, transition state
- `camera` — position, lookAt target, animation flag
- `loading` — texture progress, ready flags

### Project Structure

```
app/                    → Next.js pages (set state + render 2D UI)
src/components/canvas/  → CanvasWrapper, SceneRouter
src/components/three/   → 3D components (StarField, Sun, Planet, etc.)
src/components/ui/      → 2D overlay components (IntroOverlay, dashboards)
src/scenes/             → Scene compositions (IntroScene, SolarSystemScene)
src/store/              → Zustand store and slices
src/data/               → Static planet data and types
src/hooks/              → Custom hooks (camera animation, texture loading)
src/lib/                → Constants, utilities
public/textures/        → Planet textures (NASA, WebP format)
public/gallery/         → Real mission photos per body (NASA/ESA via Wikimedia, WebP)
```

## Conventions

- 3D components go in `src/components/three/`, UI overlays in `src/components/ui/`
- All client components must have `"use client"` directive
- Camera animations use GSAP applied via `useFrame` — never React state for per-frame updates
- Textures: 256px placeholders → 2K default → 8K for planet detail. WebP format, stored in `public/textures/planets/{name}/`
- Texture source: Solar System Scope (CC BY 4.0) — attribution required in the site footer/credits before public launch
- Colors defined as CSS theme vars in `globals.css` (`--color-space-black`, `--color-accent-blue`, etc.)
- No cartoon aesthetics — realistic, minimal, cinematic. Think Interstellar + Apple

## Performance

- Canvas `dpr` clamped to `[1, 2]`
- Stars use instanced points with custom GLSL shaders
- Lazy load heavy textures, show placeholders first
- Disable postprocessing on mobile / low FPS
