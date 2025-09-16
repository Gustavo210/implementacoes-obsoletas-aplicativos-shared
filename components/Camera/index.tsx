// @issue https://github.com/mobilestock/aplicativos/issues/145
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import type { BarcodeScanningResult, CameraViewProps } from 'expo-camera'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Alert, Linking } from 'react-native'
import styled from 'styled-components/native'

import { useModalFullApp } from '../../hooks/useModalFullApp'
import { legacyTheme } from '../../utils/legacyTheme'
import { BotaoAtivador } from './components/AreaCameraAtivacao'
import { CameraPausada } from './components/CameraPausada'
import { CameraTravada } from './components/CameraTravada'
import { CardInfo } from './components/CardInfo'

type PropsLeitura =
  | 'volume entrega'
  | 'qrcode cliente'
  | 'qrcode meulook'
  | 'qrcode painel'
  | 'codigo barras'
  | 'codigo nao identificado'
  | 'qrcode sku legado'
  | 'qrcode sku'

export interface PropsBarCodeScanningResult extends BarcodeScanningResult {
  tipoDeCodigoLido: PropsLeitura
  codigoLido: string
}

interface PropsCamera extends CameraViewProps {
  travaLeitor?: boolean
  ativacaoManual?: boolean
  cabecalho: string | ReactNode
  ignorarLeitura?: PropsLeitura[]
  aceitaLeitura?: PropsLeitura[]
  onBarCodeScanned(scanningResult: PropsBarCodeScanningResult): Promise<void> | void
}

export const regexVolumeEntrega = /\/etiqueta\/expedicao\/|[0-9]+_[0-9]+_[0-9]+$/g
export const regexQRCliente = /(^C[0-9]+$|[A-z0-9-]{36}_[0-9]+_(TROCA|ENTREGA))/g
export const regexQRPainel = /^P[0-9]+$/g
export const regexSkuLegado = /^SKU_[0-9]+_[0-9]+$/g
export const regexSku = /^SKU[0-9]+$/g

type TypeEstadoDaCamera = 'SEM_PERMISSAO' | 'DISPONIVEL' | 'INDISPONIVEL' | 'CAMERA_PAUSADA'

export function verificaLeituraScanner(dado: string, type: string): PropsLeitura {
  let retorno: PropsLeitura
  if (!process.env.EXPO_PUBLIC_API_URL?.includes('https')) {
    console.log('\x1b[32m', 'LEITURA', dado)
    console.log('\x1b[32m', 'TIPO DE LEITURA', type)
  }

  switch (true) {
    case type === 'qr' && !!dado?.match(regexSku)?.length:
      retorno = 'qrcode sku'
      break
    case type === 'qr' && !!dado?.match(regexSkuLegado)?.length:
      retorno = 'qrcode sku legado'
      break
    case type === 'qr' && !!dado?.match(regexVolumeEntrega)?.length:
      retorno = 'volume entrega'
      break
    case type === 'qr' && !!dado?.match(regexQRCliente)?.length:
      retorno = 'qrcode cliente'
      break
    case type === 'qr' && dado?.match(/produto\/+[0-9]+[?w=]/g)?.length === 1:
      retorno = 'qrcode meulook'
      break
    case type === 'qr' && (dado?.length < 5 || !!dado?.match(regexQRPainel)?.length):
      retorno = 'qrcode painel'
      break
    case type === 'code128' && dado?.length <= 30:
      retorno = 'codigo barras'
      break
    default:
      retorno = 'codigo nao identificado'
      break
  }
  if (!process.env.EXPO_PUBLIC_API_URL?.includes('https')) {
    console.log('\x1b[32m', 'RETORNO LEITURA', type)
    console.log('\x1b[0m')
  }
  return retorno
}

export function converteCodigoLido(dado: string) {
  let retorno = ''
  switch (true) {
    case !!dado?.match(regexVolumeEntrega)?.length:
      retorno = dado.split('/').pop() || ''
      break
    case dado?.match(/produto\/+[0-9]+[?w=]/g)?.length === 1:
      retorno = dado.split('w=').pop() || ''
      break
    case !!dado?.match(regexQRPainel)?.length:
      retorno = dado.replace(/[^0-9]/, '')
      break
    case !!dado?.match(regexQRCliente)?.length:
    case dado?.length <= 30:
    case !!dado?.match(regexSkuLegado)?.length:
    case !!dado?.match(regexSku)?.length:
      retorno = dado
      break
  }
  return retorno
}

// @issue https://github.com/mobilestock/aplicativos/issues/206
export function Camera(props: PropsCamera) {
  const foco = useIsFocused()
  const navigation = useNavigation()
  const modal = useModalFullApp()
  const [estadoDaCamera, setEstadoDaCamera] = useState<TypeEstadoDaCamera>('SEM_PERMISSAO')
  const [cameraProcessando, setCameraProcessando] = useState<boolean>(false)
  const [cameraTravada, setCameraTravada] = useState<boolean>(false)
  const [_ignorado, requestPermission] = useCameraPermissions()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    pedePermissao()

    if (props.ativacaoManual) {
      setCameraTravada(true)
    }

    return () => {
      cancelaTemporizadorInatividade()
    }
  }, [])

  useEffect(() => {
    setCameraProcessando(!!props.travaLeitor)
  }, [props.travaLeitor])

  useEffect(() => {
    cancelaTemporizadorInatividade()
    if (modal.estadoDoModal === 'FECHADO') {
      iniciaTemporizadorInatividade()
    }
  }, [modal.estadoDoModal])

  function iniciaTemporizadorInatividade() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setEstadoDaCamera('CAMERA_PAUSADA')
    }, 30000)
  }

  function cancelaTemporizadorInatividade() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  function reativarCameraInativa() {
    if (estadoDaCamera === 'CAMERA_PAUSADA') {
      setEstadoDaCamera('DISPONIVEL')
      iniciaTemporizadorInatividade()
    }
  }

  async function pedePermissao() {
    const permitions = await requestPermission()
    if (permitions.granted) {
      setEstadoDaCamera('DISPONIVEL')
      iniciaTemporizadorInatividade()
    }
    if (!permitions.canAskAgain) {
      Alert.alert(
        'Precisamos de sua permissão',
        'Para que o aplicativo funcione corretamente precisamos de sua permissão para acessar a camera do dispositivo. \n\n ' +
          'Vá em configurações do app e habilite a permissão de camera para que o app funcione corretamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings().then(() => {
                navigation.dispatch(StackActions.replace('Home'))
              })
            }
          }
        ]
      )
    }
    if (!permitions.granted && permitions.canAskAgain) {
      Alert.alert(
        'Precisamos de sua permissão',
        'Para que o aplicativo funcione corretamente precisamos de sua permissão para acessar a camera do dispositivo. \n\n ' +
          'Não se preocupe, ela sera usada somente para fazer a leitura de códigos QR.',
        [
          {
            text: 'OK',
            onPress: async () => {
              const { status } = await requestPermission()
              if (status === 'granted') {
                setEstadoDaCamera('DISPONIVEL')
                iniciaTemporizadorInatividade()
              }
            }
          },
          {
            text: 'Nao',
            onPress: () => {
              navigation.dispatch(StackActions.replace('Home'))
            }
          }
        ]
      )
    }
  }

  function ativarCamera(situacao: boolean) {
    setCameraTravada(!situacao)
    cancelaTemporizadorInatividade()
    iniciaTemporizadorInatividade()
  }

  async function beforeOnBarCodeScanned(scanningResult: BarcodeScanningResult): Promise<void> {
    if (cameraProcessando || cameraTravada || props.travaLeitor) {
      // TODO: codigo temporario analizar melhor forma de fazer
      return
    }
    iniciaTemporizadorInatividade()

    const tipoDeCodigoLido = verificaLeituraScanner(scanningResult.data, scanningResult.type)

    if (
      (props.ignorarLeitura?.length && props.ignorarLeitura?.includes(tipoDeCodigoLido)) ||
      (props.aceitaLeitura?.length && !props.aceitaLeitura?.includes(tipoDeCodigoLido))
    ) {
      return
    }

    const codigoLido = converteCodigoLido(scanningResult.data)

    const augmentedScanningResult: PropsBarCodeScanningResult = {
      ...scanningResult,
      tipoDeCodigoLido,
      codigoLido
    }

    try {
      setCameraProcessando(true)
      await props.onBarCodeScanned(augmentedScanningResult)
    } finally {
      setCameraProcessando(false)
    }
  }

  if (estadoDaCamera === 'SEM_PERMISSAO') {
    return (
      <ContainerCentralizado>
        <TextoCentralizado>Sem acesso a câmera.</TextoCentralizado>
      </ContainerCentralizado>
    )
  }
  if (estadoDaCamera === 'INDISPONIVEL' || !foco) {
    return (
      <ContainerCentralizado>
        <TextoCentralizado>câmera indisponível</TextoCentralizado>
      </ContainerCentralizado>
    )
  }

  return (
    <Container>
      {modal.estadoDoModal === 'FECHADO' && estadoDaCamera === 'DISPONIVEL' && (
        <CameraScreen facing="back" onBarcodeScanned={beforeOnBarCodeScanned} />
      )}
      {estadoDaCamera === 'CAMERA_PAUSADA' && <CameraPausada reativarCameraInativa={reativarCameraInativa} />}
      <Conteudo>
        {typeof props.cabecalho === 'string' ? <CardInfo texto={props.cabecalho} /> : props.cabecalho}
        {estadoDaCamera !== 'CAMERA_PAUSADA' && (
          <BotaoAtivador ativacaoManual={!!props.ativacaoManual} quandoTocar={ativarCamera}>
            <AlvoContainer>
              {cameraProcessando && <Loading color={legacyTheme.cores.azul100} size={100} />}
              {cameraTravada && !cameraProcessando && <CameraTravada />}
              {!cameraProcessando && !cameraTravada && <AlvoImage source={require('../../assets/image/alvo.png')} />}
            </AlvoContainer>
          </BotaoAtivador>
        )}
      </Conteudo>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  position: relative;
`
const Conteudo = styled.View`
  flex: 1;
  position: absolute;
`
const AlvoContainer = styled.View`
  width: ${({ theme }) => theme.layout.width(100)}px;
  height: ${({ theme }) => theme.layout.height(70)}px;
  justify-content: center;
  align-items: center;
`
const Loading = styled.ActivityIndicator``
const AlvoImage = styled.Image`
  width: ${({ theme }) => theme.layout.width(50)}px;
  height: ${({ theme }) => theme.layout.width(50)}px;
`
const ContainerCentralizado = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const TextoCentralizado = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(16)}px;
  text-transform: uppercase;
  text-align: center;
`
const CameraScreen = styled(CameraView)`
  flex: 1;
  color: ${({ theme }) => theme.cores.branco};
  position: relative;
`
