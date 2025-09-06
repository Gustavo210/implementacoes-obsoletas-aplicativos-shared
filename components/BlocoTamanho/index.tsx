import { ViewProps } from 'react-native'
import styled from 'styled-components/native'

interface BlocoTamanhoType extends ViewProps {
  tamanho: string
}

export function BlocoTamanho(props: BlocoTamanhoType) {
  return (
    <ContainerAreaTamanho {...props}>
      <ContainerTamanho>
        <TextoTamanho quantidadeLetras={props.tamanho?.length}>{props.tamanho}</TextoTamanho>
      </ContainerTamanho>
      <Small>Tamanho</Small>
    </ContainerAreaTamanho>
  )
}

const ContainerAreaTamanho = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`
const ContainerTamanho = styled.View`
  background-color: ${({ theme }) => theme.cores.preto};
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.layout.size(2)}px;
`
const Small = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(10)}px;
`
const TextoTamanho = styled.Text<{ quantidadeLetras: number }>`
  font-weight: 700;
  font-size: ${({ theme, quantidadeLetras }) => theme.fonts.size(17) - (quantidadeLetras / 2 || 0)}px;
  color: ${({ theme }) => theme.cores.branco};
  padding: 2px;
  text-align: center;
`
