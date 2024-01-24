import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

// COMPONENTS
import { Button } from '../../components/Button';
import { CardBlur } from '../../components/CardBlur';
import { Input } from '../../components/Input';

import { schema } from './schema';

// STYLES
import { useNavigate } from 'react-router-dom';
import api from '../../services';
import { WrapperRegister } from './styles';

export interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async ({ email, password, name }) => {
    try {
      const response = await api.post('/users', {
        email,
        password,
        name,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <WrapperRegister>
      <CardBlur>
        <h2>Cadastro</h2>
        <form onSubmit={submit}>
          <Input
            placeholder="Name"
            inputType="text"
            icon={<AiOutlineUser size="20" />}
            {...register('name', { required: true })}
          />
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
          <Button type="submit" text="Cadastrar" />
        </form>
        <span>
          Ja tem cadastro?
          <Button
            type="button"
            onClick={() => navigate(-1)}
            $variant="link"
            text="Voltar à página inicial"
          />
        </span>
      </CardBlur>
    </WrapperRegister>
  );
}
