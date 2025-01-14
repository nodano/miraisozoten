import { CreateWeaponInput, CreateWeaponInputSchema } from 'schema/dist/weapon';
import AutoForm, { AutoFormSubmit } from 'ui/components/ui/auto-form';
import { z } from 'zod';

import { useUpdateWeapon } from '../api/update-weapon';

import type { Weapon } from 'database';

export const UpdateWeapon = ({ weapon }: { weapon: Weapon }) => {
  const updateWeaponMutaion = useUpdateWeapon();

  const schema = CreateWeaponInputSchema.merge(
    z.object({
      // ...
    })
  );

  const handleSubmit = async (data: { [x: string]: unknown }) => {
    await updateWeaponMutaion.mutateAsync({
      id: weapon.id,
      data: data as CreateWeaponInput,
    });
  };

  return (
    <AutoForm formSchema={schema} onSubmit={handleSubmit}>
      <AutoFormSubmit>Update</AutoFormSubmit>
    </AutoForm>
  );
};
