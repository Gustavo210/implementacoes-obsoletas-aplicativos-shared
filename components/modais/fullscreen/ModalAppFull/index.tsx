import React, { PropsWithChildren, useEffect } from 'react'
import { Modal } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styled, { NativeTarget } from 'styled-components/native'

import { useModalFullApp } from '../../../../hooks/useModalFullApp'
import { Rotulo } from '../../../Rotulo'
import { Spacer } from '../../../Spacer'
import { BotaoFecharModalAppFull } from '../../../botoes/BotaoFecharModalAppFull'
import { TypeTipoAlerta } from '../../modalHalf/ModalApp'

export type PropsInteracaoSuspensaPadrao = {
  visivel: boolean
  fechar(): void
}

export type ModalAppFullPropsType = {
  [P in keyof PropsInteracaoSuspensaPadrao]?: PropsInteracaoSuspensaPadrao[P]
} & {
  tipo: TypeTipoAlerta
  titulo?: string
  mensagem?: string
}

export function ModalAppFull(props: PropsWithChildren<ModalAppFullPropsType>) {
  const modal = useModalFullApp()

  useEffect(() => {
    if (props?.visivel) {
      modal.notificaModalAberto('ABERTO')
    } else {
      modal.notificaModalAberto('FECHADO')
    }
    return () => {
      modal.notificaModalAberto('FECHADO')
    }
  }, [props?.visivel])

  let icone = ''
  switch (props.tipo) {
    case 'AVISO_SUCESSO':
    case 'Aviso sucesso':
    case 'SUCESSO':
    case 'Sucesso':
      icone = 'check-bold'
      break
    case 'ERRO_FATAL':
    case 'Erro fatal':
      icone = 'alert'
      break
    case 'AVISO_ERRO':
    case 'Aviso erro':
      icone = 'alert-circle-outline'
      break
  }

  function funcaoFechar() {
    props.fechar?.()
    modal.notificaModalAberto('FECHADO')
  }
  return (
    <Modal animationType="slide" transparent statusBarTranslucent visible={props.visivel}>
      <ModalContainer>
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
                  <Icone tipoErro={props.tipo} name={icone} />
                  <TextoBody tipoErro={props.tipo}>{props.mensagem}</TextoBody>
                </ModalBody>
                <ModalFooter>
                  <BotaoFecharModalAppFull tipoErro={props.tipo} onPress={funcaoFechar} text="Fechar" />
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
const ModalConteudo = styled.View<{ tipoErro: ModalAppFullPropsType['tipo'] }>`
  background-color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'AVISO_SUCESSO':
      case 'Aviso sucesso':
        return theme.cores.branco
      case 'ERRO_FATAL':
      case 'Erro fatal':
        return theme.cores.tomate
      case 'SUCESSO':
      case 'Sucesso':
        return theme.cores.sucesso
      case 'AVISO_ERRO':
      case 'Aviso erro':
        return theme.cores.alerta20
    }
  }};

  justify-content: space-between;
  width: 100%;
  flex: 1;
`

/**
 * @deprecated utilize o componente HeaderAlert
 */
const ModalHeader = styled.View<{ tipoErro: ModalAppFullPropsType['tipo'] }>`
  background-color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'ERRO_FATAL':
      case 'Erro fatal':
        return theme.cores.alerta80
      case 'AVISO_ERRO':
      case 'Aviso erro':
        return theme.cores.alerta50
      case 'AVISO_SUCESSO':
      case 'Aviso sucesso':
      case 'SUCESSO':
      case 'Sucesso':
        return theme.cores.sucesso
    }
  }};
  padding: ${({ theme }) => theme.layout.size(10)}px;
  padding-top: ${({ theme }) => theme.layout.size(20)}px;
`
/**
 * @deprecated utilize o componente HeaderAlert
 */
const TextoHeader = styled.Text`
  color: ${({ theme }) => theme.cores.preto};
  font-size: ${({ theme }) => theme.fonts.size(16)}px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`
const ModalBody = styled.View`
  align-items: center;
  padding: 20px;
  justify-content: center;
  flex: 1;
`
const TextoBody = styled.Text<{ tipoErro: ModalAppFullPropsType['tipo'] }>`
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size(20)}px;
  color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'ERRO_FATAL':
      case 'Erro fatal':
        return theme.cores.branco
      case 'AVISO_ERRO':
      case 'Aviso erro':
        return theme.cores.preto
      case 'AVISO_SUCESSO':
      case 'Aviso sucesso':
        return theme.cores.preto
      case 'SUCESSO':
      case 'Sucesso':
        return theme.cores.branco
    }
  }};
`
const ModalFooter = styled.View`
  position: absolute;
  bottom: 0;
  padding: 0 5px;
  padding-bottom: ${({ theme }) => theme.layout.size(20)}px;
  min-height: ${({ theme }) => theme.layout.size(20)}px;
  width: ${({ theme }) => theme.layout.width(100)}px;
`
const Icone = styled(MaterialCommunityIcons as NativeTarget)<{
  tipoErro: ModalAppFullPropsType['tipo']
}>`
  font-size: ${({ theme }) => theme.fonts.size(100)}px;
  color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case 'ERRO_FATAL':
      case 'Erro fatal':
        return theme.cores.branco
      case 'AVISO_ERRO':
      case 'Aviso erro':
        return theme.cores.preto
      case 'AVISO_SUCESSO':
      case 'Aviso sucesso':
        return theme.cores.sucesso
      case 'SUCESSO':
      case 'Sucesso':
        return theme.cores.branco
    }
  }};
  margin: ${({ theme }) => theme.layout.size(8)}px;
`
