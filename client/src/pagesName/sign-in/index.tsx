"use client";
import {FormProvider, useForm} from 'react-hook-form';

import React, { FC } from "react";
import styles from "./styles.module.css";
import LoginForm from "@/features/auth/ui/LoginForm";
import {TLoginForm} from "@/features/auth/model/types";

const SignIn: FC = () => {

  const methods = useForm<TLoginForm>();

  return (
  <section className={styles.page}>
    <FormProvider {...methods}>
      <LoginForm title={'Авторизация'}/>
    </FormProvider>
  </section>
  );
}

 export default SignIn;

// "use client";
// // import { useRouter } from "next/navigation";
// import {FormProvider, useForm} from 'react-hook-form';
//
// import React, { FC } from "react";
// import styles from "./styles.module.css";
//
// type TForm = {
//   email: string;
//   password: string;
// }
//
// const SignIn: FC = () => {
//   // const router = useRouter()
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TForm>();
//
//   // const methods = useForm<TForm>();
//
//   const onSubmit = (data: TForm) => {
//
//     // router.push('/')
//     console.log("Отправка формы:", data);
//   };
//
//   return (
//   <section className={styles.page}>
//     <FormProvider {...methods}>
//       <div className={styles.container}>
//         <h1 className={styles.title}>Вход в систему</h1>
//         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//           <div className={styles.formGroup}>
//             <label htmlFor="email">Email:</label>
//             <input
//               {...register("email", { required: true })}
//             type="email"
//             id="email"
//             name="email"
//             required
//             className={styles.input}
//             />
//             {errors.email && <p>{errors.email.message as string}</p>}
//           </div>
//           <div className={styles.formGroup}>
//            <label htmlFor="password">Пароль:</label>
//             <input
//               {...register("password", { required: true })}
//             type="password"
//             id="password"
//             name="password"
//             required
//             className={styles.input}
//             />
//            {errors.password && <p>{errors.password.message as string}</p>}
//           </div>
//           <button type="submit" className={styles.button}>
//            Войти
//           </button>
//         </form>
//       </div>
//     </FormProvider>
//   </section>
//   );
// }
//
// export default SignIn;
