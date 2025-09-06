import styled from "styled-components/native";

import { ModalAppFullPropsType } from "../../modais/fullscreen/ModalAppFull";
import { Botao } from "../Botao";

export const BotaoFecharModalAppFull = styled(Botao)<{
  tipoErro: ModalAppFullPropsType["tipo"];
}>`
  background-color: ${({ tipoErro, theme }) => {
    switch (tipoErro) {
      case "ERRO_FATAL":
      case "Erro fatal":
        return theme.cores.botaoPadrao;
      case "AVISO_ERRO":
      case "Aviso erro":
        return theme.cores.alerta50;
      case "AVISO_SUCESSO":
      case "Aviso sucesso":
        return theme.cores.sucesso;
      case "SUCESSO":
      case "Sucesso":
        return theme.cores.backgroundGray;
    }
  }};
  height: ${({ theme }) => theme.layout.height(8)}px;
`;
