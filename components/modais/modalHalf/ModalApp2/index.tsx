import { ReactNode } from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components/native'

import { Rotulo } from '../../../Rotulo'
import { Spacer } from '../../../Spacer'
import { Botao } from '../../../botoes/Botao'
import { TypeTipoAlerta } from '../ModalApp'

export type ModalPropsType = {
  visivel?: boolean
  tipo: TypeTipoAlerta
  fecharForaDoModal?: boolean
  fechar?(): void
  children?: ReactNode
  titulo?: string
  mensagem?: string
}

/**
 * @issue https://github.com/mobilestock/aplicativos/issues/148
 */
export function ModalApp2(props: ModalPropsType) {
  function funcaoFechar() {
    if (props.fecharForaDoModal) {
      props.fechar?.()
    }
  }
  return (
    <Modal animationType="slide" transparent statusBarTranslucent visible={props.visivel}>
      <ModalContainer>
        <ModalWrap onPress={funcaoFechar} />
        <ModalConteudo tipoErro={props.tipo}>
          <>
            {!!props.titulo && (
              <ModalHeader tipoErro={props.tipo}>
                <TextoHeader>{props.titulo}</TextoHeader>
              </ModalHeader>
            )}
            {!props.children ? (
              <>
                <ModalBody>
                  <TextoBody numberOfLines={7}>{props.mensagem}</TextoBody>
                </ModalBody>
                <ModalFooter>
                  <BotaoFechar tipoErro={props.tipo} onPress={props.fechar} text="Fechar" />
                </ModalFooter>
              </>
            ) : (
              props.children
            )}
          </>
          <Spacer x={4} />
          <Rotulo />
        </ModalConteudo>
      </ModalContainer>
    </Modal>
  )
}

const ModalContainer = styled.View`
  flex: 1;
`
const ModalWrap = styled.TouchableOpacity`
  flex: 1;
`
const ModalConteudo = styled.View<{ tipoErro: ModalPropsType['tipo'] }>`
  background-color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'Erro fatal':
      case 'ERRO_FATAL':
      case 'Aviso sucesso':
      case 'AVISO_SUCESSO':
      case 'Sucesso':
      case 'SUCESSO':
        return theme.cores.branco
      case 'Aviso erro':
      case 'AVISO_ERRO':
        return theme.cores.alerta20
    }
  }};
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: ${({ theme }) => theme.layout.height(50)}px;
  min-height: ${({ theme }) => theme.layout.height(10)}px;
`
const ModalHeader = styled.View<{ tipoErro: ModalPropsType['tipo'] }>`
  background-color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'Erro fatal':
      case 'ERRO_FATAL':
        return theme.cores.alerta80
      case 'Aviso erro':
      case 'AVISO_ERRO':
        return theme.cores.alerta50
      case 'Aviso sucesso':
      case 'AVISO_SUCESSO':
        return theme.cores.backgroundGray
      case 'Sucesso':
      case 'SUCESSO':
        return theme.cores.sucesso
    }
  }};
  padding: 10px;
`
const TextoHeader = styled.Text`
  color: ${({ theme }) => theme.cores.branco};
  font-size: ${({ theme }) => theme.fonts.size(16)}px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`
const ModalBody = styled.View`
  align-items: flex-start;
  padding: 20px;
`
const TextoBody = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(14)}px;
`
const ModalFooter = styled.View`
  padding: 0 5px;
  min-height: ${({ theme }) => theme.layout.size(20)}px;
`
const BotaoFechar = styled(Botao)<{ tipoErro: ModalPropsType['tipo'] }>`
  background-color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'Erro fatal':
      case 'ERRO_FATAL':
        return theme.cores.alerta80
      case 'Aviso erro':
      case 'AVISO_ERRO':
        return theme.cores.alerta50
      case 'Aviso sucesso':
      case 'AVISO_SUCESSO':
        return theme.cores.backgroundGray
      case 'Sucesso':
      case 'SUCESSO':
        return theme.cores.sucesso
    }
  }};
  height: ${({ theme }) => theme.layout.height(8)}px;
  min-height: ${({ theme }) => theme.layout.height(8)}px;
  flex: 1;
`
