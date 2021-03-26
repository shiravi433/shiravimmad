import styled from 'styled-components'
import { Intersect } from '../../svgs'

const sharedStyles = `
svg {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`

export const TopIntersectSvg = styled(Intersect)`
  ${sharedStyles}
  transform: rotate(180deg);
  margin-bottom: -2px;
`

export const BottomIntersectSvg = styled(Intersect)`
  ${sharedStyles}
`
