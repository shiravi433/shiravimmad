import styled, { css } from 'styled-components'
import { memo } from 'react'

function createCSS() {
  let styles = ''

  for (let i = 0; i < 200; i += 1) {
    const randomX = Math.floor(Math.random() * 1000000) * 0.0001 // vw
    const randomOffset = Math.ceil(Math.random() * 1000000) * (Math.round(Math.random()) ? 1 : -1) * 0.0001 // vw
    const randomXEnd = randomX + randomOffset // vw
    const randomXEndYoyo = randomX + randomOffset / 2
    const RandomYoyoTime = (Math.random() * 50000 + 30000) / 100000
    const randomYoyoY = RandomYoyoTime * 100 // vh
    const randomScale = Math.random() * 10000 * 0.0001
    const fallDuration = Math.random() * 20 + 20 // s
    const fallDelay = Math.random() * 30 * -1 // s
    const opacity = Math.random() * 10000 * 0.0001
    const percentage = RandomYoyoTime * 100
    styles += `
       > :nth-child(${i}) {
         opacity: ${opacity};
         transform: translate(${randomX}vw, -10px) scale(${randomScale});
         animation: fall${i} ${fallDuration}s ${fallDelay}s linear infinite;
       }
       @keyframes fall${i} {
         ${percentage}% {
           transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
         }
         to {
          transform: translate(${randomXEndYoyo}vw, 100vh) scale(${randomScale});
         }
       }
     `
  }

  return css`
    ${styles}
  `
}

const SnowItems = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  top: -10px;
  left: -10px;
  background: white;
  border-radius: 50%;
`
const SnowWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10000;
  pointer-events: none;
  ${createCSS()}
  overflow: hidden;
  filter: drop-shadow(0 0 10px white);
`
const snowNodes = Array.from(Array(200).keys())

const SnowEffect: React.FC = memo(() => {
  return (
    <SnowWrapper>
      {snowNodes.map((d) => (
        <SnowItems key={`snowEffectItems${d}`} />
      ))}
    </SnowWrapper>
  )
})

export default SnowEffect
