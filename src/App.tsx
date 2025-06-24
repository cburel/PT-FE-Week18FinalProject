import { useState } from 'react'
import './App.css'
import Headerbar from './Components/Headerbar'
import Sidebar from './Components/Sidebar'
import Counter from './Components/Counter'

export default function App() {

  return (
    <>
      <Headerbar />
      <div>Hello, world!</div>
      <Sidebar />
      <Counter />
    </>
  )
}