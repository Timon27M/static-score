import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)`
    width: 100%;
  .MuiInputBase-input {
    color: var(--background-white); /* Цвет текста внутри поля */
    font-size: 16px;

  }

  .MuiInputLabel-root {
    color: var(--background-white); /* Цвет label */
    font-size: 16px;

      &.Mui-focused {
          color: var(--background-white); /* Цвет label при фокусе */
      }
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: rgba(255, 255, 255, 0.5); /* Светлая обводка по умолчанию */
    }

    &:hover fieldset {
      border-color: var(--background-white); /* При наведении */
    }

      &.Mui-focused fieldset {
          border-color: var(--background-white); /* При фокусе */
          box-shadow: none; /* Убираем shadow, если есть */
          outline: none;
      }
  }

  .MuiFormHelperText-root {
    color: var(--background-white); /* Если будут helper text */
  }
`;