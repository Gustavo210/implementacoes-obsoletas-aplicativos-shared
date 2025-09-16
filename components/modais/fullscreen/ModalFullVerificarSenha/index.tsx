import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import { useRef, useState } from 'react'
import styled from 'styled-components/native'
import * as Yup from 'yup'

import { legacyTheme } from '../../../../utils/legacyTheme'
import { Botao } from '../../../botoes/Botao'
import { TextInputUnform } from '../../../unform/TextInputUnform'
import { PropsInteracaoSuspensaPadrao } from '../ModalAppFull'
import { ModalFull } from '../ModalFull'

interface PropsModalFullVerificarSenha extends PropsInteracaoSuspensaPadrao {
  verificaSenha(senha: string): Promise<boolean>
}

export function ModalFullVerificarSenha(props: PropsModalFullVerificarSenha) {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)

  async function formularioVerificarSenha(data: { senha: string }) {
    setLoading(true)
    try {
      const schema = Yup.object().shape({
        senha: Yup.string().required('É obrigatório informar a senha')
      })
      await schema.validate(data, { abortEarly: false })
      if (!(await props.verificaSenha(data.senha))) {
        throw new Error('Senha incorreta')
      }
    } catch (error) {
      formRef.current?.setFieldError('senha', (error as Yup.ValidationError).message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container {...props}>
      <Header>
        <Titulo>Autenticação necessária</Titulo>
        <Subtitulo>Para prosseguir, digite sua senha.</Subtitulo>
      </Header>
      <ModalContainer behavior={'padding'}>
        <ContainerForm>
          <Form ref={formRef} onSubmit={formularioVerificarSenha}>
            <ContainerInput>
              <Input
                label="Senha"
                secureTextEntry
                dataDetectorTypes="all"
                autoCorrect={false}
                textContentType="password"
                name="senha"
                labelStyles={{ color: legacyTheme.cores.texto }}
                placeholder="Digite sua senha de acesso"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </ContainerInput>
          </Form>
        </ContainerForm>

        <ContainerBotoes>
          <BotaoConfirmar
            disabled={loading}
            isLoading={loading}
            text="Confirmar"
            onPress={() => formRef.current?.submitForm()}
          />
          <BotaoCancelar disabled={loading} text="Cancelar" onPress={props.fechar} />
        </ContainerBotoes>
      </ModalContainer>
    </Container>
  )
}

const ModalContainer = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
`
const Container = styled(ModalFull)`
  flex: 1;
`
const Input = styled(TextInputUnform)`
  height: ${({ theme }) => theme.layout.height(7)}px;
  border-radius: 5px;
  color: ${({ theme }) => theme.cores.preto};
  background-color: ${({ theme }) => theme.cores.branco90};
  border: 1px solid ${({ theme }) => theme.cores.bege10};
`
const ContainerBotoes = styled.View`
  flex-direction: row;
  padding: 10px;
`
const ContainerForm = styled.View`
  flex: 1;
`
const BotaoConfirmar = styled(Botao)`
  min-height: ${({ theme }) => theme.layout.height(8)}px;
  flex: 1;

  background-color: ${({ theme }) => theme.cores.alerta80};
`
const BotaoCancelar = styled(Botao)`
  min-height: ${({ theme }) => theme.layout.height(8)}px;
  flex: 1;

  background-color: ${({ theme }) => theme.cores.sucesso};
`
const ContainerInput = styled.View`
  border-radius: 5px;
  padding: 10px;
`
const Header = styled.View`
  margin: 10px;
`
const Titulo = styled.Text`
  font-size: ${({ theme }) => theme.layout.size(18)}px;
  font-weight: bold;
`
const Subtitulo = styled.Text``
