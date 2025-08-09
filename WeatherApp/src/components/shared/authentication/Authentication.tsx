import { useState } from "react";
import { IUserAuth } from "../../../core/types/userTypes";
import { useUsersStore } from "../../../core/store/useUsersStore";
import AuthenticationForm from "../../ui/authenticationForm/AuthenticationForm";

export const Authentication: React.FC = () => {
  const [formData, setFormData] = useState<IUserAuth>({
    email: "",
    password: "",
  });

  const { login } = useUsersStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      <AuthenticationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
