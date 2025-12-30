# ✨ rt-modal-kit
A flexible, accessible modal for React with multiple configuration options and sensible defaults. Easy to use for your daily work.

---

## 📦 Installation
```bash
npm install rt-modal-kit
```

---

## 🚀 Basic Usage
```tsx
import React, { useState } from "react";
import Modal from "your-modal-package";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} close={() => setOpen(false)}>
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
}
```

---

## 🛠️ Props Overview

| 🔑 Prop | 🧩 Type | 🎯 Default | 📝 Description |
|---------|---------|-----------|---------------|
| **open** | `boolean` | `false` | Controls modal visibility. |
| **close** | `() => void` | **Required** | Function to close the modal. |
| **size** | `"xs"/"sm"/"md"/"lg"/"xl"` | `"xs"` | Modal size. |
| **header** | `boolean` | `true` | Show header section. |
| **footer** | `boolean` | `true` | Show footer section. |
| **headerContent** | `ReactNode` | `"Modal Header"` | Custom header text or element. |
| **footerContent** | `ReactNode` | `"Modal Footer"` | Custom footer text or element. |
| **showCloseButton** | `boolean` | `true` | Show footer close button. |
| **closeButtonAlignment** | `"left"/"center"/"right"` | `"right"` | Align footer close button. |
| **closeButtonFullWidth** | `boolean` | `false` | Make footer close button full width. |
| **fullScreen** | `boolean` | `false` | Make modal full screen. |
| **closeOnBackdropClick** | `boolean` | `true` | Close modal when clicking backdrop. |
| **closeOnEsc** | `boolean` | `true` | Close modal on `Escape` key press. |
| **portal** | `HTMLElement` | `document.body` | DOM node to render modal via portal. |
| **role** | `"dialog"/"alertdialog"` | `"dialog"` | Accessibility role. |
| **className** | `"string"` | `""` | Custom class for modal container. |
| **contentClassName** | `"string"` | `""` | Custom class for modal body. |
| **backdropClassName** | `"string"` | `""` | Custom class for backdrop. |
| **modalStyle** | `"CSSProperties"` | `""` | Inline styles for modal container. |
| **contentStyle** | `"CSSProperties"` | `""` | Inline styles for modal body. |
| **backdropStyle** | `"CSSProperties"` | `""` | Inline styles for modal backdrop. |
| **id** | `"string"` | `""` | Custom id for modal container. |
| **contentId** | `"string"` | `""` | Custom id for modal body. |
| **backdropId** | `"string"` | `""` | Custom id for backdrop. |

---

## 🎨 Styling Overrides
- The modal uses **CSS Modules + SCSS** internally.✅
- You can override styles in 3 ways:
  
  1. **Custom id names**:
     ```tsx
     <Modal
       open={open}
       close={() => setOpen(false)}
       id="my-modal"
       contentId="modal-body-id"
       backdropId="backdrop-id"
     >
       Custom styled modal
     </Modal>
     ```
  2. **Custom class names**:
     ```tsx
     <Modal
       open={open}
       close={() => setOpen(false)}
       className="my-modal"
       contentClassName="my-modal-body"
       backdropClassName="my-backdrop"
     >
       Custom styled modal
     </Modal>
     ```
  3. **Inline styles**:
     ```tsx
     <Modal
       open={open}
       close={() => setOpen(false)}
       modalStyle={{ backgroundColor: "#fff" }}
       contentStyle={{ padding: "2rem" }}
       backdropStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }}
     >
       Inline styled modal
     </Modal>
     ```

---

## ♿ Accessibility Features
- ✅ `aria-modal="true"` for screen readers.
- ✅ `aria-labelledby` and `aria-describedby` link header and content.
- ✅ Keyboard support: Press `Escape` to close.
- ✅ Locks body scroll when modal is open.
- ✅ Semantic roles: `dialog` or `alertdialog`.

---

## ⚡ Performance Considerations
- ✅ Uses **React Portal** for isolation.
- ✅ Conditional rendering: mounts only when `open` is true.
- ✅ Minimal re-renders: effects run only on relevant prop changes.
- ✅ Scoped styles via CSS Modules.
- ✅ Keep modal content lightweight for best performance.

---

## ✅ Quick Summary
- 🔹 **Easy to use**: Just pass `open` and `close`.
- 🔹 **Highly configurable**: Sizes, header/footer, close behavior.
- 🔹 **Accessible by default**: ARIA roles, ESC key support.
- 🔹 **Customizable styles**: CSS Modules, class and id overrides, inline styles.
- 🔹 **Optimized for performance**: Portals, conditional rendering.



---

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
  headerContent={<h3>Custom Header</h3>}
  footerContent={<span>Custom Footer</span>}
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