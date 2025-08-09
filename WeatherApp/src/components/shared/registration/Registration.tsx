import { FC, useState } from "react";
import { IUserAuth } from "../../../core/types/userTypes";
import { useUsersStore } from "../../../core/store/useUsersStore";
import RegistrationForm from "../../ui/registrationForm/RegistrationForm";

export const Registration: FC = () => {
  const [formData, setFormData] = useState<IUserAuth>({
    email: "",
    password: "",
    name: "",
    avatar: "https://i.imgur.com/LDOO4Qs.jpg",
  });
  const { register } = useUsersStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <RegistrationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
