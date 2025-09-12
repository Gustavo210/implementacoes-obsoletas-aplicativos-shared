import { useContext } from 'react'

import { UseModalFullAppProvider } from './context'

export function useModalFullApp() {
  // @issue https://github.com/mobilestock/aplicativos/issues/147
  const contexto = useContext(UseModalFullAppProvider)
  return contexto
}
