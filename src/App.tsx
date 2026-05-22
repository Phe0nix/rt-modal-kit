import { useState } from "react";
import Modal from "./Modal";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} close={() => setOpen(!open)} size="lg">
        <h1>Modal Content</h1>
        <h3>Subheading</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum officia officiis, placeat facilis ut sequi libero explicabo, quasi, qui quod odit consequuntur excepturi magnam vel repellat. Sit optio reprehenderit dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptates reiciendis, iste vero eveniet beatae voluptatem quisquam iusto consectetur libero dolor placeat hic enim quidem animi. Unde doloremque quae voluptate? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum in adipisci amet eius, distinctio recusandae asperiores dolorem. Temporibus iure molestiae numquam error, voluptatem labore esse incidunt velit repudiandae consequatur. Consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim nobis quas, commodi deleniti officiis id earum vel eius corrupti perferendis nisi tempora soluta voluptates iusto repellendus ullam facilis dolorum quasi.</p>
      </Modal>
    </>
  )
}

export default App
