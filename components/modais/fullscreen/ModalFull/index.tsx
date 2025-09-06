import Feather from "@expo/vector-icons/Feather";
import { Modal, ModalProps, ViewProps } from "react-native";
import styled from "styled-components/native";

import { Rotulo } from "../../../Rotulo";
import { Botao } from "../../../botoes/Botao";
import { PropsInteracaoSuspensaPadrao } from "../ModalAppFull";

export interface PropsModalFull
  extends PropsInteracaoSuspensaPadrao,
    ViewProps {
  children?: React.ReactNode;
  modal?: ModalProps;
  titulo?: string;
  subtitulo?: string;
}

export function ModalFull(props: PropsModalFull) {
  // const modal = useModalFullApp()
  // useEffect(() => {
  //   if (props?.visivel) {
  //     modal.notificaModalAberto('ABERTO')
  //   } else {
  //     modal.notificaModalAberto('FECHADO')
  //   }
  //   return () => {
  //     modal.notificaModalAberto('FECHADO')
  //   }
  // }, [props?.visivel])
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent
      visible={props.visivel}
      onRequestClose={props.fechar}
      {...props.modal}
    >
      <Conteudo style={props.style}>
        {props?.titulo ? (
          <Cabecalho>
            <ContainerTitulo>
              <Titulo>{props.titulo}</Titulo>
              {props?.subtitulo ? (
                <Subtitulo>{props.subtitulo}</Subtitulo>
              ) : null}
            </ContainerTitulo>
            <BotaoTransparente onPress={props.fechar}>
              <Icone name="x" />
            </BotaoTransparente>
          </Cabecalho>
        ) : null}
        <Container style={props.style}>{props.children}</Container>
      </Conteudo>
      <Rotulo />
    </Modal>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Conteudo = styled.View`
  padding-bottom: 15px;
  padding-top: 40px;
  flex: 1;
`;
const Cabecalho = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;
const ContainerTitulo = styled.View`
  flex-direction: column;
  flex: 0.8;
`;
const Titulo = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(25)}px;
  font-weight: bold;
  flex-wrap: wrap;
`;
const Subtitulo = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size(12)}px;
  max-width: ${({ theme }) => theme.layout.width(75)}px;
`;
const BotaoTransparente = styled(Botao)`
  background-color: transparent;
  width: ${({ theme }) => theme.layout.width(15)}px;
  height: ${({ theme }) => theme.layout.width(10)}px;
  position: absolute;
  right: 0;
  top: 0;
`;
const Icone = styled(Feather)`
  font-size: ${({ theme }) => theme.fonts.size(25)}px;
  padding-right: 10px;
  margin-top: 5px;
`;
