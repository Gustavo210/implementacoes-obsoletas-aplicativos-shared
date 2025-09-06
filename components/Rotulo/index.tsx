import constants from 'expo-constants'
import { usePathname } from 'expo-router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

import { useAuth } from '@/hooks/(legacy)/useAuth'

export function Rotulo() {
  const Auth = useAuth()
  const pathName = usePathname()
  const [idUsuario, setIdUsuario] = useState<string | number | null>(null)

  useEffect(() => {
    if (Auth?.user?.idUsuario) {
      setIdUsuario(Auth?.user?.idUsuario)
    } else {
      setIdUsuario(null)
    }
  }, [Auth?.user?.idUsuario])

  const ehDev = process.env.NODE_ENV === 'development'

  return (
    <ContainerVersaoDoApp ehDev={ehDev}>
      {ehDev && <TextoVersaoDoApp ehDev={ehDev}>{`${constants.expoConfig?.scheme}:/${pathName}`}</TextoVersaoDoApp>}
      <TextoVersaoDoApp ehDev={ehDev}>
        {constants.expoConfig?.version} {idUsuario ? `u${idUsuario} ` : ''}
      </TextoVersaoDoApp>
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
