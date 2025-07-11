import { useEffect, useState } from "react";
import { User } from "../../../entitites/User";

const FindUser = ({
  handleSubmit,
  selectedUser,
  loading,
  resetUser,
}: {
  handleSubmit: (dni: string) => Promise<void>;
  selectedUser?: User | null;
  loading: boolean;
  resetUser: () => void;
}) => {
  const [dni, setDni] = useState<string>("");

  const handleFormSubmit = () => {
    if (dni.length) handleSubmit(dni);
  };

  const handleReset = () => {
    setDni("");
    if (resetUser) resetUser();
  };

  useEffect(() => {
    if (!selectedUser) setDni("");
  }, [selectedUser]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div>
          <label className="block text-sm my-2 font-medium">
            Encontrar Usuario por DNI
          </label>
        <div className="flex gap-3">
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded-md border-[#72727260] focus:border-[#72727260] bg-white"
            disabled={loading || !!selectedUser}
            onChange={(e) => setDni(e.target.value)}
            value={dni}
            placeholder="DNI"
          />
          <button
            disabled={loading || !!selectedUser}
            onClick={handleFormSubmit}
            className="w-fit px-4 bg-[#FC6F2F] text-white hover:bg-[#db4500] rounded-lg disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
          {dni != "" && !selectedUser ? (
            <button
              onClick={handleReset}
              className="w-fit px-4 text-[#FC6F2F] hover:bg-[#ffd6ab] py-2 rounded-lg font-medium disabled:opacity-50 cursor-pointer"
            >
              X
            </button>
          ) : null}
        </div>
      </div>
      {selectedUser ? (
        <div className="rounded-lg flex justify-between items-center bg-[#FFE9D1]">
          <span className="p-5">
            <div className="flex items-center gap-4">
              <div className="bg-[#515838] rounded-full w-12 h-12 flex justify-center items-center font-bold text-2xl">
                <span className="font-bold leading-9 pb-[2px] text-white">
                  {selectedUser?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h5 className="capitalize font-semibold text-lg">
                  {selectedUser?.name}
                </h5>
                <p className="text-gray-500 font-medium">
                  {selectedUser?.email}
                </p>
              </div>
            </div>
          </span>
          <button
            onClick={resetUser}
            className="w-fit px-4 mr-5 bg-[#FFE9D1] text-[#FC6F2F] h-fit text-xl font-medium py-2 rounded-lg hover:bg-[#ffd6ab] disabled:opacity-50 cursor-pointer"
          >
            X
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FindUser;
