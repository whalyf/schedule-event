import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Nome deve conter ao menos 3 caracteres")
    .required("Digite seu nome"),

  email: yup
    .string()
    .email("Digite um email válido")
    .required("Campo de email obrigatório"),

  password: yup.string().required("Campo de senha obrigatório"),
});
