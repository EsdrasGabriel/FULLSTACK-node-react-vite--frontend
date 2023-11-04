import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/entrar', { email, senha: password });

    if (data) return data;

    return new Error('Erro no login.');
  } catch (err) {
    console.error(err);
    return new Error((err as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = { auth };