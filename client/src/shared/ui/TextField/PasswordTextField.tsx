import {Controller, useFormContext} from "react-hook-form";
import { StyledTextField } from './styled-TextField.styles'
import {IconButton, InputAdornment} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useState} from "react";
import Typography from "@mui/material/Typography";

export default function PasswordTextField() {
    const [showPassword, setShowPassword] = useState(false);


    const { control, formState: {errors} } = useFormContext();

    return (
        <>

        <Controller
    name="password"
    control={control}
    rules={{ required: true }}
    render={({ field }) => (
        <StyledTextField
            {...field}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={field.value || ''}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword(prev => !prev)}
                            edge="end"
                            size="small"
                            sx={{ color: 'var(--background-white)' }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )}
    />
    {errors.password && (<Typography variant="subtitle2" gutterBottom sx={{ color: "var(--red)" }}>
        Невалидный пароль
    </Typography>)}
        </>
    )
}