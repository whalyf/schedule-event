import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import * as yup from 'yup';
//SERVICES

// COMPONENTS
import { Button } from '../../components/Button';
import { CardBlur } from '../../components/CardBlur';

// STYLES
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '../../components/Input';
import api from '../../services';
import { WrapperLogin } from './styles';

interface IFormValues {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Digite um email válido')
      .required('Campo de email obrigatório'),

    password: yup.string().required('Campo de senha obrigatório'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async ({ email, password }) => {
    try {
      const response = await api.post(`/users/${email}`, { password });
      toast.info(response.data.message);
      console.log(response);
    } catch (err) {
      // console.log(err);
    }
  });

  return (
    <WrapperLogin>
      <CardBlur>
        <h2>Olá, seja bem vindo</h2>
        <form onSubmit={submit}>
          <Input
            placeholder="Email"
            inputType="text"
            icon={<AiOutlineMail size="20" />}
            {...register('email', { required: true })}
          />
          <Input
            placeholder="Senha"
            inputType="password"
            icon={<AiOutlineLock size="20" />}
            {...register('password', { required: true })}
          />
          <Button type="submit" text="Entrar" />
        </form>
        <span>
          Ainda não tem conta?
          <Button
            type="button"
            onClick={() => navigate('/register')}
            $variant="link"
            text="Registre-se"
          />
        </span>
      </CardBlur>
    </WrapperLogin>
  );
}
