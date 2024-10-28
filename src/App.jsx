import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import CustomRoutes from './routes'

function App() {
  return (
    <div>
      <Header/>
      <div className='flex'>
        <Navbar/>
        <div className='w-[78%]'>
          <CustomRoutes/>
        </div>
      </div>
    </div>
  )
}

export default App
