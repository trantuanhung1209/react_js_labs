import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import StudentInfo from './components/StudentInfo'
import Footer from './components/Footer'

function App() {
  const student = {
    name: 'Hune',
    age: 20,
    major: 'Software Engineering'
  }

  const logStudent = () => {
    console.log(student);
    console.log("hihi");
    
  }

  return (
    <>
      <Header />
      <StudentInfo student={student} fn={logStudent} /> 
      <Footer />
    </>
  )
}

export default App
