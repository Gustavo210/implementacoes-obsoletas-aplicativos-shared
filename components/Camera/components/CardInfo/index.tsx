import React from 'react'
import styled from 'styled-components/native'

interface PropsCardInfo {
  texto?: string
}

export function CardInfo({ texto }: PropsCardInfo) {
  return (
    <Container>
      <Texto>{texto}</Texto>
    </Container>
  )
}
const Container = styled.View`
  width: ${({ theme }) => theme.layout.width(97)}px;
  min-height: ${({ theme }) => theme.layout.width(5)}px;

  margin: ${({ theme }) => theme.layout.size(3)}px;
  padding: 4px 3px;

  flex-direction: column;

  border-radius: ${({ theme }) => theme.layout.size(2)}px;

  background-color: ${({ theme }) => theme.cores.backgroundGray};
`
const Texto = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(20)}px;

  color: ${({ theme }) => theme.cores.branco};
`
