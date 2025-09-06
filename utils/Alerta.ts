import Toast from 'react-native-root-toast'

export const Alerta = {
  Toast(message: string, delay = 100): void {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay
    })
  }
}
