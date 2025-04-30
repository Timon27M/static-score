import {useFormContext} from "react-hook-form";
import {TLoginForm} from "@/features/auth/model/types";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

type TProps = {
    title: string;
}

const StyledForm = styled.form`
  padding: 20px;
    color: var(--background-white);
    display: flex;
    flex-direction: column;
    gap: 60px;
    `;

const StyledTextField = styled(TextField)`
    .MuiInputBase-input {
    color: var(--background-white);
    border-bottom: 1px solid var(--background-white)
    }
    .MuiInputLabel-root {
        color: var(--background-white);
    }
    .MuiOutlinedInput-root {
        fieldset {
            border-color: gray;
        }
        &:hover fieldset {
            border-color: darkgray;
        }
        &.Mui-focused fieldset {
            border-color: transparent;
            box-shadow: none;
        }
    }
    color: var(--background-white)
`;

export default function LoginForm({ title }: TProps) {
   const {register, handleSubmit, formState: {errors}} = useFormContext<TLoginForm>();

   function onsubmit(data: TLoginForm) {
    console.log(data);
   }

    return (
        <StyledForm onSubmit={handleSubmit(onsubmit)}>
            <Typography variant="h2">{title}</Typography>
            <StyledTextField
                {...register("email", {required: true})}
                required
                name="email"
                label={"Email"}
                id="filled-required"
                variant="standard"
            />
            {errors.email && (<Typography variant="h5" gutterBottom sx={{ color: "var(--red)" }}>
                Невалидный email
                </Typography>)}
            <StyledTextField
                {...register("password", {required: true})}
                name="password"
                id="filled-password-input"
                type="password"
                label="Password"
                autoComplete="current-password"
                variant="standard"
                required
            />
            {errors.password && (<Typography variant="h5" gutterBottom>
                Невалидный пароль
            </Typography>)}
            <Button size="medium" type="submit">Войти</Button>
        </StyledForm>
    )
}