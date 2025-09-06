import { FlashList, FlashListProps } from '@shopify/flash-list'
import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

import { ListaVazia } from '../listas/utils/ListaVazia'

type ChaveUnica<T> = keyof T

interface Props<T> extends FlashListProps<T> {
  chaveUnica: ChaveUnica<T>
}

export function AppFlashList<T>(props: Props<T>) {
  const [carregando, setCarregando] = useState<boolean>(true)
  return (
    <Container>
      {carregando && <Loading size={40} />}
      <FlashList
        estimatedItemSize={50}
        keyExtractor={chave => String(chave[props.chaveUnica])}
        {...props}
        onLoad={evento => {
          setCarregando(false)
          props.onLoad?.(evento)
        }}
        ListFooterComponent={() => <ListaVazia />}
        ListEmptyComponent={() => (
          <ContainerListaVazia>
            <TextoListaVazia>Não há itens para exibir</TextoListaVazia>
          </ContainerListaVazia>
        )}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`
const Loading = styled(ActivityIndicator)`
  color: ${({ theme }) => theme.cores.corSecundaria};
  position: absolute;
  top: 45%;
  left: 45%;
`
const ContainerListaVazia = styled.View``
const TextoListaVazia = styled.Text`
  text-align: center;
`
