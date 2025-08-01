import { useFormContext } from "react-hook-form";
import { TRegisterForm, TResRegisterForm } from "@/features/registrations/model/types";
import PasswordTextField from "@/shared/ui/TextField/PasswordTextField";
import Form from "@/shared/ui/Form/Form";
import TextField from "@/shared/ui/TextField/TextField";
import { registerApi } from "../api/api";

export default function RegisterForm() {
  const { handleSubmit, formState: {errors} } = useFormContext<TRegisterForm>();

  function onSubmit(data: TRegisterForm) {
    console.log(data);
    registerApi(data)
      .then((res: TResRegisterForm) => console.log(res))

  }

  return (
    <Form title="Регистрация" handleSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField name="name" type="text" label="Имя" textError="Невалидное имя" isError={errors.name} />
      </div>
      <div>
        <TextField name="email" type="email" label="Email" textError="Невалидный email" isError={errors.email} />
      </div>
      <div>
        <TextField name="phone" type="text" label="Телефон" textError="Невалидный номер телефона" isError={errors.phone} />
      </div>
      <div>
        <PasswordTextField />
      </div>
    </Form>
  );
}