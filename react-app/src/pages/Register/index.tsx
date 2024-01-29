import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// COMPONENTS
import { Button } from '../../components/Button';
import { CardBlur } from '../../components/CardBlur';
import { Input } from '../../components/Input/DefaultInput';
import { schema } from './schema';

// SERVICES
import api from '../../services';

// STYLES
import { WrapperRegister } from './styles';

export interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async ({ email, password, name }) => {
    try {
      await api
        .post('/users', {
          email,
          password,
          name,
        })
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
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
