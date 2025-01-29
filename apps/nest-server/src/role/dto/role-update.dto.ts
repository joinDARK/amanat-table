import z from 'zod';

const updateRoleSchema = z.object({
  id: z.number({
    invalid_type_error: 'ID должен быть числом',
    required_error: 'ID обязателен',
  }),
  name: z.string({
    invalid_type_error: 'Название роли должен быть строкой',
    required_error: 'Название роли обязателен',
  })
});

export default updateRoleSchema