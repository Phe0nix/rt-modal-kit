import React, { useState } from 'react'
import { Modal } from '../src/Modal'

export default function DemoApp(){
  const [openLight, setOpenLight] = useState(false)
  const [openDark, setOpenDark] = useState(false)
  return (
    <div style={{padding: 20}}>
      <h1>rt-modal-kit Demo</h1>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={()=>setOpenLight(true)}>Open Modal (light)</button>
        <button onClick={()=>setOpenDark(true)}>Open Modal (dark)</button>
      </div>

      <Modal open={openLight} close={()=>setOpenLight(false)} theme="light" showTopClose={true} showFooterCloseButton={true}>
        <p>This is a demo modal (light). Try closing with escape, backdrop click, or the buttons.</p>
      </Modal>

      <Modal open={openDark} close={()=>setOpenDark(false)} theme="dark" showTopClose={true} showFooterCloseButton={true}>
        <p>This is a demo modal (dark). Try closing with escape, backdrop click, or the buttons.</p>
      </Modal>
    </div>
  )
}
