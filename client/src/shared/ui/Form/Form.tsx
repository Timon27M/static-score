import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledForm = styled.form`
    padding: 55px;
    min-width: 500px;
    text-align: center;
    color: var(--background-white);
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: var(--dark-gray);
    border-radius: 40px;
    `;

type Props = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    title: string;
    children: React.ReactNode;
}

export default function Form({ handleSubmit, title, children }: Props) {
    return (
        <StyledForm onSubmit={handleSubmit} noValidate>
            <Typography variant="h3">{title}</Typography>
            {children}
            <Button size="large" type="submit" variant={"contained"}>Войти</Button>
        </StyledForm>
    )
}