import constants from 'expo-constants'
import { usePathname } from 'expo-router'
import React from 'react'
import styled from 'styled-components/native'

export function Rotulo() {
  const pathName = usePathname()

  const ehDev = process.env.NODE_ENV === 'development'

  return (
    <ContainerVersaoDoApp ehDev={ehDev}>
      {ehDev && <TextoVersaoDoApp ehDev={ehDev}>{`${constants.expoConfig?.scheme}:/${pathName}`}</TextoVersaoDoApp>}
      <TextoVersaoDoApp ehDev={ehDev}>{constants.expoConfig?.version}</TextoVersaoDoApp>
    </ContainerVersaoDoApp>
  )
}

const ContainerVersaoDoApp = styled.View<{ ehDev: boolean }>`
  padding: 0 5px;
  bottom: 0;
  background-color: ${({ theme, ehDev }) => (ehDev ? theme.cores.alerta80 : theme.cores.branco)};
  justify-content: ${({ ehDev }) => (ehDev ? 'space-between' : 'center')};
  flex-direction: row;
`
const TextoVersaoDoApp = styled.Text<{ ehDev: boolean }>`
  font-size: ${({ theme }) => theme.fonts.size(10)}px;
  color: ${({ theme, ehDev }) => (ehDev ? theme.cores.branco : theme.cores.texto)};
`
