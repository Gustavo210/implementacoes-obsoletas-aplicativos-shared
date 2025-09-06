import React, { PropsWithChildren } from 'react'
import { Modal } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

import { Botao } from '../../botoes/Botao'

export interface PropsDialog {
  fecharModal?(): void
  mostraFecharModal?: boolean
  estaVisivel?: boolean
  titulo?: string
}
export function Dialog(props: PropsWithChildren<PropsDialog>) {
  return (
    <Modal animationType="slide" transparent statusBarTranslucent visible={props.estaVisivel}>
      <ContainerCenter>
        <ContainerBorda {...props}>
          <Container bounces={false} alwaysBounceHorizontal={false} alwaysBounceVertical={false} {...props}>
            <>
              {props.mostraFecharModal && (
                <BotaoFechar onPress={props.fecharModal}>
                  <Icon name="x" />
                </BotaoFechar>
              )}
              {props?.titulo?.length && <Titulo>{props.titulo}</Titulo>}
              {props.children}
            </>
          </Container>
        </ContainerBorda>
      </ContainerCenter>
    </Modal>
  )
}

const BotaoFechar = styled(Botao)`
  position: absolute;

  right: 0px;
  top: 0px;

  background-color: transparent;
`

const ContainerCenter = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`
const ContainerBorda = styled.View`
  background-color: ${({ theme }) => theme.cores.branco};
  padding: 15px;

  position: relative;

  min-height: ${({ theme }) => theme.layout.height(15)}px;
  max-height: ${({ theme }) => theme.layout.height(80)}px;
  width: ${({ theme }) => theme.layout.width(98)}px;

  border-radius: 5px;
`
const Titulo = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(20)}px;
  font-weight: 600;
  text-align: left;

  padding-bottom: 10px;

  width: 90%;
`

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.cores.branco};

  min-height: ${({ theme }) => theme.layout.height(15)}px;
  width: ${({ theme }) => theme.layout.width(90)}px;

  overflow: hidden;
`
const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.fonts.size(20)}px;
`
