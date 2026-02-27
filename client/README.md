# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Visual Enhancements & Utilities

The project now includes a set of CSS variables, animations and helper hooks to create a more dynamic, attractive UI. It is configured for a **single light theme** (no dark mode):

- **Gradient page backgrounds** – light theme palette uses colourful radial shapes.
- **`shimmer-border`** – add this class to any container to see a moving rainbow line around its edges.
- **`card-glow`** – a container with this class will show a mouse‑tracking glow on hover; the coordinates are updated via inline CSS variables.
- **`animate-gradient`** – applies a slow shifting gradient animation to backgrounds.
- **`fade-in` / `visible`** – use on static elements to fade and scale them into view; the `useScrollFade` hook (see below) will attach an intersection observer and toggle the `visible` class automatically.

### Example (product cards)

The `ProductCard` component demonstrates all of the above: it uses `framer-motion` for scroll‑aware entry, `shimmer-border` + `card-glow` for interactivity, and `animate-gradient` on the thumbnail wrapper.

### Hook: `useScrollFade`

Import and call this hook from a top‑level component (e.g. `main.jsx`) to activate scroll‑aware fade behaviour. It observes every element with the `.fade-in` class and adds `.visible` when it enters the viewport.

```jsx
import useScrollFade from "./utils/useScrollFade.jsx";

function AppRoot() {
  useScrollFade();
  return <App />;
}
```

Feel free to apply the utilities to other cards or surfaces as needed – the framework is lightweight and purely CSS/React.
