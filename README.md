# ✨ rt-modal-kit


[![npm version](https://img.shields.io/npm/v/rt-modal-kit?style=flat-square)](https://www.npmjs.com/package/rt-modal-kit)
[![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square)](LICENSE)

A flexible, accessible modal for React with built-in light/dark themes, customizable layouts, and sensible accessibility defaults.

Install

```bash
npm install rt-modal-kit
# or
yarn add rt-modal-kit
```

Note: `react` and `react-dom` are peer dependencies — ensure they are installed in your project.

Import

```tsx
import { Modal } from 'rt-modal-kit'
import 'rt-modal-kit/dist/index.css'
```

You can also import the component source directly if you copied the files into your project.

## 🚀 Basic Usage

1. Import the component: `import Modal from './Modal'`.
2. Control visibility via state and pass a `close` callback.

Example:

```tsx
import { useState } from 'react'
import Modal from './Modal'

function Page() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} close={() => setOpen(false)} size="md" theme="light">
        <h2>Content</h2>
        <p>Put any JSX here.</p>
      </Modal>
    </>
  )
}
```

## Props

Below is a concise props reference. See the source for types and examples: [src/Modal.tsx](src/Modal.tsx).

| 🔑 Prop | 🧩 Type | 🎯 Default | 📝 Description |
|---|---|---|---|
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme of the modal container. |
| `size` | `ModalSize` (`"xs"`..`"xl"`) | `"md"` | Controls width (max-width) of the modal. |
| `open` | `boolean` | `false` | Whether modal is open. |
| `close` | `() => void` | *required* | Callback to close the modal. |
| `variant` | `ModalVariant` | `"default"` | Layout variant, e.g. `"bottom-sheet"`. |
| `preventClose` | `boolean` | `false` | If true, prompts before closing. |
| `onCloseReason` | `(reason: CloseReason) => void` | `undefined` | Called with close reason (`backdrop`, `escape`, etc.). |
| `header` | `HFType` | `{ active: true, title: 'Modal Header', id: '', className: '', alignment: 'left' }` | Header content/props. |
| `footer` | `HFType` | `{ active: true, title: 'Modal Footer', id: '', className: '', alignment: 'left' }` | Footer content/props. |
| `showTopClose` | `boolean` | `true` | Show top-right close button. |
| `showFooterCloseButton` | `boolean` | `true` | Show footer close action button. |
| `closeButtonAlignment` | `"right" \| "center" \| "left"` | `"right"` | Alignment for footer close button. |
| `closeButtonFullWidth` | `boolean` | `false` | Make footer close button full width. |
| `fullScreen` | `boolean` | `false` | Render modal fullscreen. |
| `closeOnBackdropClick` | `boolean` | `true` | Close when clicking backdrop. |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key. |
| `modalId` | `string` | `""` | `id` for modal container. |
| `contentId` | `string` | `""` | `id` for content region. |
| `backdropId` | `string` | `""` | `id` for backdrop element. |
| `modalClassName` | `string` | `""` | Additional class for modal container. |
| `contentClassName` | `string` | `""` | Additional class for content area. |
| `backdropClassName` | `string` | `""` | Additional class for backdrop. |
| `modalStyle` | `React.CSSProperties` | `{}` | Inline styles for modal container. |
| `contentStyle` | `React.CSSProperties` | `{}` | Inline styles for content area. |
| `backdropStyle` | `React.CSSProperties` | `{}` | Inline styles for backdrop. |
| `initialFocusRef` | `RefObject<HTMLElement>` | `undefined` | Element to focus when modal opens. |
| `restoreFocus` | `boolean` | `true` | Restore focus to previously focused element on close. |
| `inertBackground` | `boolean` | `true` | Make background inert/aria-hidden while open. |
| `ariaLabel` | `string` | `undefined` | Accessible label when no header/title provided. |
| `role` | `ModalRole` | `"dialog"` | ARIA role for modal. |
| `portal` | `HTMLElement \| null` | `null` | Host element for portal (defaults to `document.body`). |
| `children` | `React.ReactNode` | `undefined` | Modal body content. |

If you want a live example, open `src/App.tsx` or run the dev server.

## 📦 Using in your project
- Copy `src/Modal.tsx` and `src/Modal.module.scss` into your app.
- Ensure your build supports CSS Modules. If not, convert the styles to plain CSS and import the class names accordingly.
- The modal uses a React portal by default, so you do not need an extra wrapper element.
- Required props are `open` and `close`.

## ♿ Accessibility Features
- ✅ `aria-modal="true"` for screen readers.
- ✅ `aria-labelledby` and `aria-describedby` link header and content.
- ✅ Keyboard support: Press `Escape` to close.
- ✅ Locks body scroll when modal is open.
- ✅ Semantic roles: `dialog` or `alertdialog`.

## ⚡ Performance Considerations
- ✅ Uses **React Portal** for isolation.
- ✅ Conditional rendering: mounts only when `open` is true.
- ✅ Minimal re-renders: effects run only on relevant prop changes.
- ✅ Scoped styles via CSS Modules.
- ✅ Keep modal content lightweight for best performance.

## ✅ Quick Summary
- 🔹 **Easy to use**: Just pass `open` and `close`.
- 🔹 **Highly configurable**: Sizes, header/footer, close behavior.
- 🔹 **Accessible by default**: ARIA roles, ESC key support.
- 🔹 **Customizable styles**: CSS Modules, class and id overrides, inline styles.
- 🔹 **Optimized for performance**: Portals, conditional rendering.

## 🔍 Advanced Usage Examples

### 🖥️ Full-Screen Modal
```tsx
<Modal open={open} close={() => setOpen(false)} fullScreen>
  <p>This modal takes up the entire screen.</p>
</Modal>
```

### 🚫 Disable Backdrop & ESC Close
```tsx
<Modal
  open={open}
  close={() => setOpen(false)}
  closeOnBackdropClick={false}
  closeOnEsc={false}
>
  <p>Modal won't close on backdrop click or ESC key.</p>
</Modal>
```

### 🏷️ Custom Header & Footer
```tsx
<Modal
  open={open}
  close={() => setOpen(false)}
  header={{ active: true, title: 'Custom Header', alignment: 'center' }}
  footer={{ active: true, title: 'Custom Footer', alignment: 'center' }}
>
  <p>Custom content inside modal.</p>
</Modal>
```

### 🎛️ Close Button Alignment
```tsx
<Modal
  open={open}
  close={() => setOpen(false)}
  closeButtonAlignment="center"
>
  <p>Footer close button is centered.</p>
</Modal>
```