import z from 'zod';

const createRoleSchema = z.object({
  name: z.string({
    invalid_type_error: 'Название роли должен быть строкой',
    required_error: 'Название роли обязателен',
  })
});

export default createRoleSchema