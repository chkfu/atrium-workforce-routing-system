import FormTextField from '../../FormTextField';
import FormSelectInput from '../../FormSelectInput';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export const select_input_field = (
  name: string,
  config: any,
  register: UseFormRegister<FieldValues>,
  errors: Record<string, any>
) => {
  if (config.type === 'select') {
    return (
      <FormSelectInput
        label={config.label}
        options={config.options}
        register={register(name)}
        error={errors[name] as any}
        isDisabled={false}
        required={false}
        placeholder={config.placeholder}
      />
    );
  }
  return (
    <FormTextField
      type={config.type || 'text'}
      label={config.label}
      placeholder={config.placeholder}
      register={register(name)}
      error={errors[name]}
      isDisabled={false}
      required={false}
    />
  );
};
