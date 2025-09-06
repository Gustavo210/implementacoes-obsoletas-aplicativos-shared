import React from 'react'
import { Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components/native'

import { Rotulo } from '../../../Rotulo'
import { Botao } from '../../../botoes/Botao'

export type TypeTipoAlerta =
  | 'Erro fatal'
  | 'Sucesso'
  | 'Aviso erro'
  | 'Aviso sucesso'
  | 'ERRO_FATAL'
  | 'SUCESSO'
  | 'AVISO_ERRO'
  | 'AVISO_SUCESSO'
interface PropsModalApp {
  mensagem: string
  titulo: string
  estaVisivel: boolean
  tipoAlerta: TypeTipoAlerta
  alteraVisibilidade(estaVisivel: boolean): void
}
export function ModalApp(props: PropsModalApp) {
  function fechaModal() {
    props.alteraVisibilidade(!props.estaVisivel)
  }
  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={props.estaVisivel}
      onRequestClose={fechaModal}
    >
      <ContainerTransparente onPress={fechaModal}>
        <ContainerAuxiliar>
          <ContainerInformacoes alerta={props.tipoAlerta}>
            <Cabecalho alerta={props.tipoAlerta}>
              <Titulo>{props.titulo}</Titulo>
              <Mensagem>{props.mensagem}</Mensagem>
            </Cabecalho>

            <ContainerBotoes>
              <BotaoOk onPress={fechaModal} text="OK" />
            </ContainerBotoes>
            <Rotulo />
          </ContainerInformacoes>
        </ContainerAuxiliar>
      </ContainerTransparente>
    </Modal>
  )
}

const ContainerTransparente = styled(TouchableWithoutFeedback)``
const ContainerAuxiliar = styled.View`
  margin-bottom: 40px;
  flex: 1;
`
const ContainerInformacoes = styled.View<{ alerta: TypeTipoAlerta }>`
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  border-radius: 10px;
  width: ${({ theme }) => theme.layout.width(100)}px;
  height: ${({ theme }) => theme.layout.height(30)}px;

  background-color: ${({ theme, alerta }) => (alerta === 'Aviso erro' ? theme.cores.alerta20 : theme.cores.branco)};
`
const Cabecalho = styled.View<{ alerta: TypeTipoAlerta }>`
  padding: 10px ${({ theme }) => theme.layout.size(5)}px;

  ${({ theme, alerta }) => {
    switch (alerta) {
      case 'Erro fatal':
        return css`
          background-color: ${theme.cores.alerta80};
        `
      case 'Sucesso':
        return css`
          background-color: ${theme.cores.sucesso};
        `
      case 'Aviso erro':
        return css`
          background-color: ${theme.cores.alerta50};
        `
      case 'Aviso sucesso':
        return css`
          background-color: ${theme.cores.backgroundGray};
        `
    }
  }}
`
const Titulo = styled.Text`
  color: ${({ theme }) => theme.cores.branco};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size(25)}px;
`
const Mensagem = styled.Text`
  color: ${({ theme }) => theme.cores.branco};
  margin: 15px 0;
  font-size: ${({ theme }) => theme.fonts.size(18)}px;
`
const ContainerBotoes = styled.View`
  width: ${({ theme }) => theme.layout.width(100)}px;

  flex-direction: row;
  justify-content: space-between;

  padding: 10px;
`
const BotaoOk = styled(Botao)`
  flex: 1;

  min-height: ${({ theme }) => theme.layout.height(5)}px;
`
