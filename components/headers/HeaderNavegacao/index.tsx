import constants from 'expo-constants'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather'
import styled, { NativeTarget } from 'styled-components/native'

import LogoTitulo from '../../../assets/image/logoTitulo.png'

type TypesEsquerda = 'botao-voltar'
interface PropsNovoHeader {
  esquerda?: TypesEsquerda
}
export function HeaderNavegacao({ esquerda }: PropsNovoHeader) {
  const Router = useRouter()
  return (
    <>
      <Container>
        <HeaderEsquerda>
          {esquerda === 'botao-voltar' && (
            <BotaoVoltar onPress={Router.back}>
              <Icon name="arrow-left" />
            </BotaoVoltar>
          )}
        </HeaderEsquerda>
        <HeaderCentro>
          <Image source={LogoTitulo} />
          <TituloHeader>{constants.expoConfig?.name}</TituloHeader>
        </HeaderCentro>
        <HeaderDireita />
      </Container>
    </>
  )
}

const Container = styled.View`
  padding-top: 5px;
  padding-bottom: 10px;
  flex-direction: row;
  min-height: ${({ theme }) => theme.layout.size(23)}px;
  align-items: center;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.cores.branco};
  justify-content: space-between;
`
const HeaderEsquerda = styled.View`
  flex: 1;
`
const HeaderCentro = styled.View`
  flex: 1.5;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`
const HeaderDireita = styled.View`
  flex: 1;
`
const TituloHeader = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(16)}px;
  align-items: center;
`
const Icon = styled(FeatherIcon as NativeTarget)`
  font-size: ${({ theme }) => theme.fonts.size(30)}px;
  margin: 2px;
`
const BotaoVoltar = styled(TouchableOpacity)`
  justify-content: center;
  align-items: flex-start;
  padding-left: 10px;
`
const Image = styled.Image`
  width: 30px;
  height: 30px;
`
