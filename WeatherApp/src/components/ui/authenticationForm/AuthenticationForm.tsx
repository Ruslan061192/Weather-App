import { IUserAuth } from "../../../core/types/userTypes";
import styles from "./styles/index.module.css";

interface IAuthenticatedForm {
  formData: IUserAuth;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthenticationForm({
  formData,
  handleChange,
  handleSubmit,
}: IAuthenticatedForm) {
  return (
    <form className={styles.authFormContainer} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.input}
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputWrap}>
        <label className={styles.label} htmlFor="email">
          Password:
        </label>
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
