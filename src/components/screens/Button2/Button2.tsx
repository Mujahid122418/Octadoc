import React from 'react'
import './Button2.css'

interface Button2Props {
  name: string;
}

const Button2: React.FC<Button2Props> = ({ name }) => {
  return (
    <div>
       <button className='btn btn-template mx-2'>{name}</button>
    </div>
  )
}

export default Button2
