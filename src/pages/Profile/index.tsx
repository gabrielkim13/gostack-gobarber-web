import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast, ToastMessage } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Header, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const history = useHistory();

  const handleAvatarChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const data = new FormData();
      data.append('avatar', event.target.files[0]);

      try {
        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível atualizar o avatar',
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          oldPassword: Yup.string(),
          newPassword: Yup.string().when('oldPassword', {
            is: value => !!value.length,
            then: Yup.string().required('Informe a nova senha'),
            otherwise: Yup.string(),
          }),
          newPasswordConfirmation: Yup.string()
            .when('oldPassword', {
              is: value => !!value.length,
              then: Yup.string().required('Informe a nova senha'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('newPassword')], 'As senhas não são iguais'),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, oldPassword, newPassword } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                newPassword,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Seu perfil foi atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        const message = {
          type: 'error',
          title: 'Erro na atualização do perfil',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        } as ToastMessage;

        addToast(message);
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <Container>
      <Header>
        <Link to="/dashboard">
          <FiArrowLeft />
        </Link>
      </Header>

      <Content>
        <AvatarInput>
          <img src={user.avatar_url} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />

          <div>
            <Input
              name="oldPassword"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="newPassword"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="newPasswordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
          </div>

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
