import React, { useState } from 'react'
import { Modal } from '../src/Modal'

export default function DemoApp(){
  const [open, setOpen] = useState(false)
  return (
    <div style={{padding: 20}}>
      <h1>rt-modal-kit Demo</h1>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={()=>setOpen(true)}>Open Modal (light)</button>
        <button onClick={()=>setOpen(true)}>Open Modal (dark)</button>
      </div>

      <Modal open={open} close={()=>setOpen(false)} theme="light">
        <p>This is a demo modal. Try closing with escape, backdrop click, or the buttons.</p>
      </Modal>
    </div>
  )
}
