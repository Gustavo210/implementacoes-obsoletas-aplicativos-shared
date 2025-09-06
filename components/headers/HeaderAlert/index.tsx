import styled from "styled-components/native";

import { ModalAppFullPropsType } from "../../modais/fullscreen/ModalAppFull";

interface HeaderAlertProps {
  title: string;
  type: ModalAppFullPropsType["tipo"];
}

export function HeaderAlert(props: HeaderAlertProps) {
  return (
    <HeaderContainer type={props.type}>
      <Title>{props.title}</Title>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View<{ type: ModalAppFullPropsType["tipo"] }>`
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "ERRO_FATAL":
        return theme.cores.alerta80;
      case "AVISO_ERRO":
        return theme.cores.alerta50;
      case "AVISO_SUCESSO":
      case "SUCESSO":
        return theme.cores.sucesso;
    }
  }};
  padding: ${({ theme }) => theme.layout.size(10)}px;
  padding-top: ${({ theme }) => theme.layout.size(20)}px;
`;
const Title = styled.Text`
  color: ${({ theme }) => theme.cores.preto};
  font-size: ${({ theme }) => theme.fonts.size(16)}px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;
