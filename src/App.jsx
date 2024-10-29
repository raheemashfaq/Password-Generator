import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")  
  //useRef hook
  const copyToClipBoard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
  },[password])
const passwordRef = useRef()

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str+= '123456789'
    if(charAllowed) str+= '!@#$%^&*(){}'
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length,charAllowed,numberAllowed,setPassword])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-3xl text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input 
    type="text"
    value={password}
    className='outline-none w-full py-1 px-3'
    readOnly
    placeholder='Password'
    ref={passwordRef}
    />
    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipBoard}>copy</button>
    </div>
    <div className="flex text-sm gap-x-2">
      <input
      type="range"
      min={8}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>setLength(e.target.value)}
      />
      <label >Length:{length}</label>
      <div className="flex text-sm gap-x-2">
      <input
      type="checkbox"
      defaultChecked="numberAllowed"
      id='numberInput'
      onChange={()=>{setNumberAllowed(prev=>!prev)}}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>
    <div className="flex text-sm gap-x-2">
      <input
      type="checkbox"
      defaultChecked="charAllowed"
      onChange={() => {
        setNumberAllowed((prev) => !prev);
    }}
      id='charInput'
      />
      <label htmlFor='charInput'>Character</label>
    </div>
    </div>

    </div>
    </>
  )
}

export default App
