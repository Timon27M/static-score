import {Controller, FieldError, FieldErrorsImpl, Merge, useFormContext} from "react-hook-form";
import { StyledTextField } from './styled-TextField.styles'
import Typography from "@mui/material/Typography";

type TProps = {
   name: string;
   type: string;
   label: string;
   textError: string;
   isError: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
}

export default function TextField({name, type, label, isError, textError}: TProps) {

    const { control } = useFormContext();

    return (
        <>
    <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (

            <StyledTextField
                {...field}
                name={name}
                label={label}
                id="filled-required"
                type={type}
                variant="outlined"
                value={field.value || ''}
            />
        )}
    />
    {isError && (<Typography variant="subtitle2" gutterBottom sx={{ color: "var(--red)" }}>
        {textError}
    </Typography>)}
        </>
)
}