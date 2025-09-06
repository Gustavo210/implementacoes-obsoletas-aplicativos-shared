import React from 'react'
import { ActivityIndicator, ViewProps } from 'react-native'
import styled from 'styled-components/native'

interface PropsTelaLoading extends ViewProps {
  titulo?: string
}
export function TelaLoading(props: PropsTelaLoading) {
  return (
    <Container {...props}>
      {props.children || (
        <>
          <Loading size="large" />
          <Texto>{props.titulo}</Texto>
        </>
      )}
    </Container>
  )
}
const Container = styled.View`
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.cores.branco};
`
const Texto = styled.Text``
const Loading = styled(ActivityIndicator)`
  color: ${({ theme }) => theme.cores.corSecundaria};
`
