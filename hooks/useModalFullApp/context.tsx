import { createContext } from 'react'

import { PropsModalFullApp } from './provider'

export const UseModalFullAppProvider = createContext<PropsModalFullApp>({} as PropsModalFullApp)
