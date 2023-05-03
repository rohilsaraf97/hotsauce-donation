import React from 'react'

interface HeadingInterface {
  text: string
  headingStyle: string
}

function Heading({ text, headingStyle }: HeadingInterface) {
  return <h1 className={headingStyle}>{text}</h1>
}

export default Heading
