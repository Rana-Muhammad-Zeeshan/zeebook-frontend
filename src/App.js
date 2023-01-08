function App() {
  const test = async () => {
    const res = await fetch('http://localhost:8000')

    console.log(res)
  }

  ;(async () => {
    await test()
  })()
  return <div>welcome to frontend</div>
}

export default App
