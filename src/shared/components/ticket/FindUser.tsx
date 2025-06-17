import { useEffect, useState } from "react";
import { User } from "../../../entitites/User";

const FindUser = ({
  handleSubmit,
  selectedUser,
  loading,
  resetUser,
}: {
  handleSubmit: (dni: string) => Promise<void>;
  selectedUser: User | null;
  loading: boolean;
  resetUser: () => void;
}) => {
  const [dni, setDni] = useState<string>("");

  const handleFormSubmit = () => {
    if (dni.length) handleSubmit(dni);
  };

  useEffect(() => {
    if (!selectedUser) setDni("");
  }, [selectedUser]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium">
          Encontrar Usuario por DNI
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded-md"
            disabled={loading || !!selectedUser}
            onChange={(e) => setDni(e.target.value)}
            value={dni}
            placeholder="DNI"
          />
          <button
            disabled={loading || !!selectedUser}
            onClick={handleFormSubmit}
            className="w-fit px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>
      <div className="border-1 rounded-lg flex justify-between bg-gray-800">
        <span className="p-3">
          {selectedUser ? (
            <div>
              <h5 className="capitalize font-bold">{selectedUser?.name}</h5>
              <p>{selectedUser?.email}</p>
            </div>
          ) : (
            "Usuario no encontrado"
          )}
        </span>
        {selectedUser && (
          <button
            onClick={resetUser}
            className="w-fit px-4 bg-amber-600 text-white rounded-r-lg hover:bg-amber-700 disabled:opacity-50 cursor-pointer"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default FindUser;
