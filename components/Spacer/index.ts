import styled from 'styled-components/native'

export const Spacer = styled.View<{ x?: number }>`
  height: ${({ theme, x }) => theme.layout.height(x || 1)}px;
`
