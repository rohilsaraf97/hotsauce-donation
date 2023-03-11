import React from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

function Conf() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={200}
      gravity={0.5}
    />
  )
}

export default Conf
