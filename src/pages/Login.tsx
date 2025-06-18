import { FormEvent, useState } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const response = await login({ email, password });
    setLoading(false);

    if (response) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-[100dvw]">
      <div className="w-1/2 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              Contraseña
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border text-gray-700 rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
        <div className="flex gap-2 pt-4">
          <h5 className="text-black">No tenes cuenta?</h5>
          <Link to={"/register"} className="text-blue-700 underline">Registrate</Link>
        </div>
      </div>
    </div>
  );
}
