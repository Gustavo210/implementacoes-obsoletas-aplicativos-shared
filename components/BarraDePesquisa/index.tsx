import React from 'react'
import { Keyboard } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'

import { Botao } from '../botoes/Botao'

interface PropsBarraDePesquisa {
  valor: string
  onchange(valor: string): void
  clicouNaPesquisa(): void
  clicouEmLimparPesquisa?(): void
  placeholder?: string
}

export function BarraDePesquisa(props: PropsBarraDePesquisa) {
  function funBotaoPesquisa() {
    Keyboard.dismiss()
    props.onchange(props.valor)
    props.clicouNaPesquisa()
  }
  function funLimpaPesquisa() {
    Keyboard.dismiss()
    props.onchange('')
    props.clicouEmLimparPesquisa?.()
  }
  return (
    <Container>
      <Input
        value={props.valor}
        keyboardType="default"
        onSubmitEditing={funBotaoPesquisa}
        returnKeyType="done"
        placeholder={props.placeholder}
        onChangeText={text => props.onchange(text)}
      />
      {props.valor.length > 0 && (
        <BotaoCampoPesquisa onPress={funLimpaPesquisa}>
          <Icon name="x" />
        </BotaoCampoPesquisa>
      )}
      <BotaoCampoPesquisa onPress={funBotaoPesquisa}>
        <Icon name="search" />
      </BotaoCampoPesquisa>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.cores.branco};
  border: 1px solid ${({ theme }) => theme.cores.bege10};
  border-radius: ${({ theme }) => theme.layout.size(2)}px;
  overflow: hidden;
  padding-left: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
`
const Input = styled.TextInput`
  flex: 1;
  padding: 8px;
`
const Icon = styled(FeatherIcon)`
  font-size: ${({ theme }) => theme.fonts.size(25)}px;
  padding: 5px;
  padding-left: 7px;
  padding-right: 10px;
`
const BotaoCampoPesquisa = styled(Botao)`
  background-color: transparent;
`
