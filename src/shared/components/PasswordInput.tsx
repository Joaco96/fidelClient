import { useState } from "react";

const PasswordInput = ({
  onPasswordChange,
  label = "Contraseña",
}: {
  onPasswordChange: (value: string) => void;
  label?: string,
}) => {
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    onPasswordChange(value); // Actualiza el ref externo
  };

  return (
    <>
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <input
        type="password"
        maxLength={255}
        className="block w-full px-4 mb-4 py-2 border rounded-md resize-none border-[#72727260]"
        onChange={handleChange}
        value={password}
      />
    </>
  );
};

export default PasswordInput;
