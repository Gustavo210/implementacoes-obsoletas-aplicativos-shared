import { Vibration } from 'react-native'
import styled from 'styled-components/native'

type AreaCameraAtivacaoProps = {
  quandoTocar(tocado: boolean): void
  ativacaoManual: boolean
  children: React.ReactNode
}

export function BotaoAtivador(props: AreaCameraAtivacaoProps) {
  if (!props.ativacaoManual) {
    return <BodyCamera>{props.children}</BodyCamera>
  }

  return (
    <AreaCamera
      underlayColor="transparent"
      onPressIn={() => {
        props.quandoTocar(true)

        Vibration.vibrate(50)
      }}
      onPressOut={() => {
        props.quandoTocar(false)
      }}
    >
      <BodyCamera>{props.children}</BodyCamera>
    </AreaCamera>
  )
}

const AreaCamera = styled.TouchableHighlight`
  flex: 1;
  position: relative;
  justify-content: space-between;
`
const BodyCamera = styled.View`
  flex: 1;
`
