import './App.css'
import NavBar from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <Footer />
      </div>
    )
  }
}

