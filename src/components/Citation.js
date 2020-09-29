import React from 'react'
import '../App.css'

const Citation = ({ auteur, citation }) => {
  return (
    <div>
      <p className='citation'>"{citation}"</p>
      <p className='auteur'>{auteur}</p>
    </div>
  )
}

export default Citation
