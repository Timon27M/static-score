import { useFormContext } from "react-hook-form";
import { TLoginForm } from "@/features/auth/model/types";
import PasswordTextField from "@/shared/ui/TextField/PasswordTextField";
import Form from "@/shared/ui/Form/Form";
import TextField from "@/shared/ui/TextField/TextField";
import { authApi } from "../api/api";
import { observer } from "mobx-react-lite";
import { useStore } from "@/shared/lib/store/hooks/useStore";

function LoginForm() {
  const { handleSubmit, formState: {errors} } = useFormContext<TLoginForm>();
  
  const store = useStore();

  function onSubmit(data: TLoginForm) {
    authApi(data)
      .then((res) => {
        console.log(res)
        
        store.user.setUser({
          name: res.name,
          email: res.email,
          phone: res.phone,
          avatar: res.avatar,
        })
        console.log(store)
      })
      .catch((err) => {(console.log(err))})
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

export default observer(LoginForm);
