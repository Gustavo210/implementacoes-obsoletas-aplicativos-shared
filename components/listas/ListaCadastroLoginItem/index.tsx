import styled from "styled-components/native";
import { UsuarioSelecionadoLogin } from "../ListaCadastroLogin";

type ListaCadastroItemProps = UsuarioSelecionadoLogin & {
  selecionarUsuario(
    id_colaborador: number,
    telefone: string,
    razao_social: string,
    fotoUsuario: string
  ): void;
};

export function ListaCadastrosLoginItem(props: ListaCadastroItemProps) {
  function escolherUsuario(
    id: number,
    telefone: string,
    razaoSocial: string,
    fotoUsuario: string
  ) {
    props.selecionarUsuario(id, telefone, razaoSocial, fotoUsuario);
  }

  return (
    <BlocoCadastro
      onPress={() =>
        escolherUsuario(
          Number(props.id_colaborador),
          props.telefone,
          props.razao_social,
          props.foto_perfil
        )
      }
    >
      <ContainerCadastro>
        <FotoCadastro source={{ uri: props.foto_perfil }} />
        <ContainerNomes>
          <NomeCadastro numberOfLines={1}>
            {props.id_colaborador} - {props.razao_social}
          </NomeCadastro>
          <NomeUsuario>{props.usuario_meulook}</NomeUsuario>
        </ContainerNomes>
      </ContainerCadastro>
    </BlocoCadastro>
  );
}

const BlocoCadastro = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.cores.bege10};
  padding: ${({ theme }) => theme.layout.size(5)}px;
  border-radius: ${({ theme }) => theme.layout.size(2)}px;
  margin-top: ${({ theme }) => theme.layout.size(7)}px;
`;
const ContainerCadastro = styled.View`
  flex-direction: row;
`;
const ContainerNomes = styled.View`
  flex: 1;
`;
const NomeCadastro = styled.Text`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.size(15)}px;
  width: 100%;
`;
const NomeUsuario = styled.Text``;
const FotoCadastro = styled.Image`
  border-radius: ${({ theme }) => theme.layout.size(100)}px;
  margin-right: 10px;
  height: ${({ theme }) => theme.layout.size(30)}px;
  width: ${({ theme }) => theme.layout.size(30)}px;
`;
