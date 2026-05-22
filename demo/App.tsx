import React, { useState } from 'react'
import Modal from '../src/Modal'

export default function DemoApp(){
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)

  return (
    <div style={{padding: 20}}>
      <h1>rt-modal-kit Demo</h1>

      <section style={{marginBottom: 20}}>
        <h3>Basic examples</h3>
        <div style={{display: 'flex', gap: 8}}>
          <button onClick={()=>setOpen1(true)}>Open Light (default)</button>
          <button onClick={()=>setOpen2(true)}>Open Dark (themed)</button>
          <button onClick={()=>setOpen3(true)}>Bottom Sheet (mobile)</button>
          <button onClick={()=>setOpen4(true)}>Prevent Close (confirm)</button>
        </div>
      </section>

      <Modal open={open1} close={()=>setOpen1(false)} theme="light">
        <p>This is a basic modal (light).</p>
        <p>Try Escape and backdrop click.</p>
      </Modal>

      <Modal open={open2} close={()=>setOpen2(false)} theme="dark">
        <p>This is a dark themed modal.</p>
      </Modal>

      <Modal open={open3} close={()=>setOpen3(false)} theme="light" variant="bottom-sheet">
        <p>Bottom sheet variant (useful on small screens).</p>
      </Modal>

      <Modal open={open4} close={()=>setOpen4(false)} theme="light" preventClose={true}>
        <p>Prevent close example — requires confirmation.</p>
      </Modal>
    </div>
  )
}
