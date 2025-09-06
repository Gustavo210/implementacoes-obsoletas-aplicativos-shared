import { VirtualizedList } from "react-native";
import styled from "styled-components/native";
import { ListaCadastrosLoginItem } from "../ListaCadastroLoginItem";

export type UsuarioSelecionadoLogin = {
  id_colaborador: number;
  telefone: string;
  razao_social: string;
  foto_perfil: string;
  usuario_meulook?: string;
};

type ListaCadastrosProps = {
  usuarios: UsuarioSelecionadoLogin[];
  selecionarUsuario(
    id_colaborador: number,
    telefone: string,
    razao_social: string,
    foto_perfil: string
  ): void;
};

function getItem(
  data: UsuarioSelecionadoLogin[],
  index: number
): UsuarioSelecionadoLogin {
  return data[index];
}

export function ListaCadastrosLogin(props: ListaCadastrosProps) {
  function escolherUsuario(
    idColaborador: number,
    telefone: string,
    razaoSocial: string,
    fotoPerfil: string
  ) {
    props.selecionarUsuario(idColaborador, telefone, razaoSocial, fotoPerfil);
  }

  return (
    <VirtualizedList
      data={props.usuarios || []}
      initialNumToRender={3}
      maxToRenderPerBatch={10}
      style={{ width: "100%", height: "100%" }}
      renderItem={({ item }) => (
        <ListaCadastrosLoginItem
          selecionarUsuario={escolherUsuario}
          {...item}
        />
      )}
      keyExtractor={(item) => item.id_colaborador.toString()}
      getItemCount={(data: UsuarioSelecionadoLogin[]) => data.length}
      getItem={getItem}
      ListFooterComponent={() => <FooterEmpty />}
    />
  );
}

const FooterEmpty = styled.View`
  height: ${({ theme }) => theme.layout.height(30)}px;
`;
