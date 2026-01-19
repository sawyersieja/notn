import { useState } from 'react'
import './App.css'

import { HexGrid } from "./HexGrid";

function App() {

  return (
    <>
      <HexGrid rows={12} cols={12} size={26} />;
    </>
  )
}

export default App
