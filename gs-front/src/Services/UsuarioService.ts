import { api } from './api';
import type { TipoUsuario } from '../types/tipoUsuario';

const unwrapResponse = <T>(response: T | { data?: T } | undefined): T | undefined => {
  if (response === undefined) return undefined;
  if (Array.isArray(response)) return response as T;
  if (response && typeof response === 'object' && 'data' in response) {
    return ((response as { data?: T }).data ?? response) as T;
  }
  return response as T;
};

export const usuarioService = {
  listarTodos: async (): Promise<TipoUsuario[]> => {
    const response = await api.get<TipoUsuario[]>('/usuarios');
    const dados = unwrapResponse<TipoUsuario[]>(response);
    return dados || [];
  },

  buscarPorId: async (id: string | number): Promise<TipoUsuario> => {
    const response = await api.get<TipoUsuario>(`/usuarios/${id}`);
    const ben = unwrapResponse<TipoUsuario | TipoUsuario[]>(response);
    if (!ben) throw new Error(`Usuário com id ${id} não encontrado.`);
    return Array.isArray(ben) ? ben[0] : ben;
  },

  criar: async (dados: Omit<TipoUsuario, 'idUsuario'>): Promise<TipoUsuario | void> => {
  const res = await api.post<TipoUsuario>('/usuarios', dados);
  const criado = (res as TipoUsuario) || undefined;

  return criado;
},

  atualizar: async (id: string | number, dados: Partial<TipoUsuario>): Promise<TipoUsuario> => {
    const response = await api.put<TipoUsuario>(`/usuarios/${id}`, dados);
    const ben = unwrapResponse<TipoUsuario | TipoUsuario[]>(response);
    if (!ben) throw new Error(`Falha ao atualizar beneficiário ${id}.`);

    return Array.isArray(ben) ? ben[0] : ben;
  },

  deletar: async (id: string | number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};

export default usuarioService;