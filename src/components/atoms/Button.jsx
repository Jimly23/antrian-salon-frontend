import React from 'react'

const Button = ({text, style, type}) => {
  return (
    <button type={type} className={`px-5 ${style && style} pt-1 pb-2 rounded-full text-white bg-green-600  font-medium cursor-pointer text-center`}>
      {text}
    </button>
  )
}

export default Button