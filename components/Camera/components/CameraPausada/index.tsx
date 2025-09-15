import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import styled, { NativeTarget } from 'styled-components/native'

import { Spacer } from '../../../Spacer'

interface CameraPausadaProps {
  reativarCameraInativa(): void
}

export function CameraPausada(props: CameraPausadaProps) {
  return (
    <Container>
      <CameraInativa onPress={props.reativarCameraInativa}>
        <ContainerCameraInativa>
          <Icone name="camera-off" />
          <ContainerCentralizado>
            <TextoCentralizado>Câmera pausada para poupar bateria.</TextoCentralizado>
            <Spacer />
            <TextoCentralizado>Toque na tela para reativar a câmera.</TextoCentralizado>
          </ContainerCentralizado>
        </ContainerCameraInativa>
      </CameraInativa>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
`
const CameraInativa = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 10px;
`
const ContainerCameraInativa = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.5;
`
const Icone = styled(FeatherIcon as NativeTarget)`
  font-size: ${({ theme }) => theme.fonts.size(50)}px;
  color: ${({ theme }) => theme.cores.backgroundGray};
`
const TextoCentralizado = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(16)}px;
  text-transform: uppercase;
  text-align: center;
`
const ContainerCentralizado = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
