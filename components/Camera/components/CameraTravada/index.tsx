import FeatherIcon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

import { legacyTheme } from '@/utils/(legacy-global)/legacyTheme'

export function CameraTravada() {
  return (
    <Container>
      <FeatherIcon name="camera-off" size={100} style={{ color: legacyTheme.cores.backgroundGray }} />
      <TextoFooterCamera>Pressione para a tela ativar a câmera</TextoFooterCamera>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.cores.branco};
  padding: 30px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  opacity: 0.8;
`
const TextoFooterCamera = styled.Text`
  color: ${({ theme }) => theme.cores.texto};
`
