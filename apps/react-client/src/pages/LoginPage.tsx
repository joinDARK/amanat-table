import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, IconButton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import LightModeIcon from '@mui/icons-material/LightMode';

import { CREATE_USER_SCHEMA } from '@amanat/schema';
import useLoaderStore from '@/shared/store/useLoaderStore';

interface Props {
  onLogin: (state: boolean) => void;
}

type UserType = z.infer<typeof CREATE_USER_SCHEMA>;

export default function LoginPage({ onLogin }: Props) {
  const { register, reset, handleSubmit } = useForm<UserType>({
    resolver: zodResolver(CREATE_USER_SCHEMA),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const handlerLoader = useLoaderStore((store) => store.setIsLoading);

  const submit = async (user: UserType) => {
    handlerLoader(true);
    enqueueSnackbar('Допустим успешная отправка', { variant: 'success' });
    handlerLoader(false);
  };

  return (
    <div className="flex h-full justify-center items-center">
      <Card
        variant="outlined"
        sx={{
          background: 'transparent',
          minWidth: 475,
          p: 3,
          borderColor: '#1e293b',
          backgroundColor: '#141d33',
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-display dark:text-white text-2xl font-semibold">Аутентификация</h1>
          <IconButton size="medium" sx={{ color: 'white' }}>
            <LightModeIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(submit)}>
          <Button type='submit' fullWidth variant='contained'>Войти</Button>
        </form>
      </Card>
    </div>
  );
}
