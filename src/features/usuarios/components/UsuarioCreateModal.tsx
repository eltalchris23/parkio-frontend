import { Button, Group, Modal, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { createUsuario } from '../api/usuariosApi';
import type { UsuarioCreateRequest } from '../types/usuarioTypes';

type UsuarioCreateModalProps = {
  opened: boolean;
  onClose: () => void;
  onUsuarioCreated: () => void;
};

/**
 * Modal para crear usuarios desde la pantalla de administración.
 *
 * Recibe desde la página padre si debe mostrarse, cómo cerrarse
 * y qué acción ejecutar cuando el usuario se creó correctamente.
 */
export function UsuarioCreateModal({ opened, onClose, onUsuarioCreated }: UsuarioCreateModalProps) {
  const [saving, setSaving] = useState(false);

  const form = useForm<UsuarioCreateRequest>({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },

    validate: {
      nombre: (value) => (value.trim().length < 2 ? 'El nombre es obligatorio.' : null),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'El email no tiene un formato válido.',
      password: (value) =>
        value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres.' : null,
    },
  });

  /**
   * Limpia el formulario y cierra el modal.
   *
   * Se usa cuando el usuario cancela o cuando la creación terminó correctamente.
   */
  function handleClose() {
    form.reset();
    onClose();
  }

  /**
   * Envía los datos capturados al backend para crear un usuario.
   *
   * Si el backend responde correctamente:
   * - muestra una notificación de éxito;
   * - limpia y cierra el modal;
   * - avisa a la página padre que debe recargar la tabla.
   */
  async function handleSubmit(values: UsuarioCreateRequest) {
    try {
      setSaving(true);

      await createUsuario({
        ...values,
        apellido: values.apellido?.trim() ? values.apellido.trim() : null,
      });

      notifications.show({
        color: 'green',
        title: 'Usuario creado',
        message: 'El usuario se creó correctamente.',
      });

      handleClose();
      onUsuarioCreated();
    } catch {
      notifications.show({
        color: 'red',
        title: 'No se pudo crear el usuario',
        message: 'Revisa los datos capturados o intenta nuevamente.',
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal opened={opened} onClose={handleClose} title="Nuevo usuario" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Nombre"
            placeholder="Ej. Bacilio"
            required
            {...form.getInputProps('nombre')}
          />

          <TextInput
            label="Apellido"
            placeholder="Ej. Herrera"
            {...form.getInputProps('apellido')}
          />

          <TextInput
            label="Email"
            placeholder="usuario@correo.com"
            required
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            required
            {...form.getInputProps('password')}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleClose} disabled={saving}>
              Cancelar
            </Button>

            <Button type="submit" loading={saving}>
              Crear usuario
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
