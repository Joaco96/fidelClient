import { FormEvent, useState } from "react";
import { authService } from "../shared/api/authService";
import { Link, useNavigate } from "react-router";
import useFetch from "../shared/hooks/useFetch";
import { toast } from "sonner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { serviceCall: register, handleApiResponse } = useFetch({
    service: authService.register,
    fetchOnRender: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password === repeatedPassword) {
      setLoading(true);
      const data = await register({ name, email, dni, password });
      handleApiResponse(data);
      if (data.response) {
        navigate("/login");
      }
      setLoading(false);
    } else {
      toast.warning("Las contraseñas deben ser iguales");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-[100dvw]">
      <div className="w-1/2 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Registro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 text-gray-700 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 text-gray-700 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 text-gray-700 border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border text-gray-700 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Repetir Contraseña
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border text-gray-700 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              value={repeatedPassword}
              onChange={(e) => {
                setRepeatedPassword(e.target.value);
                setError(null);
              }}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="flex gap-2 pt-4">
          <h5 className="text-black">Tenes cuenta?</h5>
          <Link to={"/login"} className="text-blue-700 underline">Inicia sesion</Link>
        </div>
      </div>
    </div>
  );
}
