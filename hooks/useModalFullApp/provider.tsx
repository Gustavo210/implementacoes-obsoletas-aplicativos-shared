import React, { PropsWithChildren, useState } from 'react'

import { ModalAppFull, ModalAppFullPropsType } from '../../components/modais/fullscreen/ModalAppFull'
import { UseModalFullAppProvider } from './context'

type PropsEstadoDoModal = 'ABERTO' | 'FECHADO'

export interface PropsModalFullApp {
  configuraModal(dados: ModalAppFullPropsType | null): void
  notificaModalAberto(estado: PropsEstadoDoModal): void
  estadoDoModal: PropsEstadoDoModal
}
export function ModalFullAppProvider({ children }: PropsWithChildren) {
  const [estadoDoModal, setEstadoDoModal] = useState<PropsEstadoDoModal>('FECHADO')
  const [modalProps, setModalProps] = useState<ModalAppFullPropsType | null>(null)

  function configuraModal(dados: ModalAppFullPropsType | null) {
    notificaModalAberto(dados?.visivel ? 'ABERTO' : 'FECHADO')
    setModalProps(dados)
  }

  function notificaModalAberto(estado: PropsEstadoDoModal) {
    setEstadoDoModal(estado)
  }

  return (
    <UseModalFullAppProvider.Provider value={{ configuraModal, notificaModalAberto, estadoDoModal }}>
      {children}
      <ModalAppFull
        {...modalProps}
        fechar={() => {
          modalProps?.fechar?.()
          setModalProps(null)
        }}
        visivel={!!modalProps}
      />
    </UseModalFullAppProvider.Provider>
  )
}
