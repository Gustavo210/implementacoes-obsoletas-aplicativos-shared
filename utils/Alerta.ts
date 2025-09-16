import { ToastAndroid } from 'react-native'

export const Alerta = {
  Toast(message: string): void {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }
}
