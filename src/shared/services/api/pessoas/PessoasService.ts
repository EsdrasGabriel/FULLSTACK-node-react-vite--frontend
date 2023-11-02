import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IPeopleListing {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
interface IPeopleDetail {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
type TPeopleWithTotalCount = {
  data: IPeopleListing[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPeopleWithTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.ROW_LIMIT}&nomeCompleto_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROW_LIMIT),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IPeopleDetail | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

    if (data) return data;

    return new Error('Erro ao consultar o registro.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IPeopleDetail, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPeopleDetail>('/pessoas', dados);

    if (data) return data.id;

    return new Error('Erro ao criar o registro.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IPeopleDetail): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};