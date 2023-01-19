import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import './styles/global.css'
// import { HabitDay } from "./components/Habit";

export function App() {
  return (
    <div 
    className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}