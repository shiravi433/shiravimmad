import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, ChevronDownIcon, ChevronUpIcon } from '@pancakeswap-libs/uikit'

const Wrapper = styled(Flex)`
  cursor: pointer;
`

const StyledExpandButton = styled(Flex)`
  svg {
    margin-top: 2px;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const StyledChildrenFlex = styled(Flex)<{ isExpanded?: boolean }>`
  overflow: hidden;
  height: ${({ isExpanded }) => (isExpanded ? '100%' : '0px')};
  padding-bottom: ${({ isExpanded }) => (isExpanded ? '16px' : '0px')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
`

const FAQItem: React.FC<{ question?: string }> = ({ question, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Wrapper flexDirection="column" onClick={() => setIsExpanded(!isExpanded)} mt="24px">
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" mb="16px">
          {question}
        </Text>
        <StyledExpandButton justifyContent="flex-start" alignItems="flex-start">
          <Text fontWeight="bold" color="primary">
            {isExpanded ? 'Hide' : 'Details'}
          </Text>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </StyledExpandButton>
      </Flex>
      <StyledChildrenFlex isExpanded={isExpanded}>{children}</StyledChildrenFlex>
    </Wrapper>
  )
}

export default FAQItem
