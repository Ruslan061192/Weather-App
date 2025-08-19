import React from "react";
import { IUserAuth } from "../../../core/types/userTypes";
import styles from "./styles/index.module.css";

interface IRegistrationForm {
  formData: IUserAuth;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function RegistrationForm({
  formData,
  handleChange,
  handleSubmit,
}: IRegistrationForm) {
  return (
    <form className={styles.registerFormContainer} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputWrap}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputWrap}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonWrap}>
        <button type="submit">Send</button>
      </div>
    </form>
  );
}
