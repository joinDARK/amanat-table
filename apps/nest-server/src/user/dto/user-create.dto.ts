import z from 'zod';

const createUserSchema = z.object({
  login: z
    .string({
      invalid_type_error: 'Логин должен быть строкой',
      required_error: 'Логин обязателен',
    })
    .min(3, 'Имя пользователя должно содержать не менее 3 символов'),
  password: z
    .string({
      invalid_type_error: 'Пароль должен быть строкой',
      required_error: 'Пароль обязателен',
    })
    .min(6, 'Пароль должен содержать не менее 6 символов'),
  roleId: z.number({
    invalid_type_error: 'ID роли должен быть числом',
    required_error: 'ID роли обязателен',
  }).optional(),
});

export default createUserSchema