import Square from "./components/square"

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div 
        id="container"
        className='flex flex-col p-5 justify-center w-[75vw] h-[75vh] bg-[#FFF]'>
        <Square color='red' />
        <Square color='green' />
        <Square color='blue' />

      </div>
    </div>

  )
}

export default App
