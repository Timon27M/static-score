import { useFormContext } from "react-hook-form";
import { TLoginForm } from "@/features/auth/model/types";
import PasswordTextField from "@/shared/ui/TextField/PasswordTextField";
import Form from "@/shared/ui/Form/Form";
import TextField from "@/shared/ui/TextField/TextField";

export default function LoginForm() {
  const { handleSubmit, formState: {errors} } = useFormContext<TLoginForm>();

  function onSubmit(data: TLoginForm) {
    console.log(data);
  }

  return (
    <Form title="Авторизация" handleSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField name="email" type="email" label="Email" textError="Невалидный email" isError={errors.email} />
      </div>
      <div>
        <PasswordTextField />
      </div>
    </Form>
  );
}
