# QuickStream — Smarter Video Speed Control

QuickStream is a lightweight Chrome extension that provides fast, keyboard-based playback speed control for YouTube (or any sites you choose to enable). It is designed for users who prefer a clean interface and instant controls without UI clutter or complicated menus.

---

## Features

### Keyboard Speed Control
- F — Increase playback speed (fine step)  
- S — Decrease playback speed (fine step)  
- Shift + F — Increase speed using a large step  
- Shift + S — Decrease speed using a large step  
- R — Reset speed to 1.0×

Holding down a key continuously adjusts the speed instead of applying a single change.

### Visual Feedback
- Displays the current speed at the top-center of the screen.
- Overlay fades out automatically after a short delay.

### Auto-Reset Between Videos
- When navigating to a new page or a new video, QuickStream automatically resets the speed to 1.0×.

### Enforced Playback Rate
- Prevents websites (especially YouTube) from overriding your chosen speed.
- Re-applies speed if the video element changes or reloads.

### Lightweight and Clean
- No UI menus, no popups, no background scripts.
- Zero external dependencies.
- Minimal CPU overhead.

---

## Keyboard Shortcuts

| Shortcut      | Action              |
|---------------|---------------------|
| F             | +0.1× speed         |
| S             | −0.1× speed         |
| Shift + F     | +1.0× speed         |
| Shift + S     | −1.0× speed         |
| R             | Reset to 1.0×       |

---

## Installation (Developer Mode)

1. Clone or download this repository.  
2. Open Chrome Extensions:
```

chrome://extensions

```
3. Enable **Developer Mode** (top right).  
4. Click **Load unpacked**.  
5. Select the folder containing:
```

manifest.json
content.js
icons/

````

---

## Configuration

### 1. Customize Speed Steps

Open `content.js` and modify:

```js
const STEP = 0.1;      
const BIG_STEP = 1.0;
````

Examples:

* Change fine step to 0.05
* Change large step to 0.5
* Make fast scrubbing even faster by increasing `BIG_STEP`

---

### 2. Restrict the Extension to Specific Sites

The extension currently runs only on YouTube via:

```json
"matches": ["*://*.youtube.com/*"]
```

To add more sites, include multiple patterns:

```json
"matches": [
  "*://*.youtube.com/*",
  "*://*.netflix.com/*",
  "*://*.vimeo.com/*"
]
```

Common patterns:

| Site     | Pattern                  |
| -------- | ------------------------ |
| YouTube  | `*://*.youtube.com/*`    |
| Netflix  | `*://*.netflix.com/*`    |
| Prime    | `*://*.primevideo.com/*` |
| Vimeo    | `*://*.vimeo.com/*`      |
| Udemy    | `*://*.udemy.com/*`      |
| Coursera | `*://*.coursera.org/*`   |

To enable on all sites (not recommended):

```json
"matches": ["<all_urls>"]
```

---

## Icons

Place icons in:

```
icons/
  icon16.png
  icon32.png
  icon48.png
  icon128.png
```

These are referenced automatically via `manifest.json`.

---

## Technical Overview

* Uses Chrome Manifest V3.
* Injects `content.js` into matched pages.
* Finds and tracks all `<video>` elements.
* Enforces playback speed even when overridden by site scripts.
* Resets speed when navigating to a new page or new video.

---
