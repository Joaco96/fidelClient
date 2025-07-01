import { FormEvent, useState } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router";
import LogoSvg from "../shared/components/LogoSvg";

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
    <div className="min-h-screen flex items-center justify-center bg-[#FFE9D1]">
      <div className="md:max-w-[75dvw] flex w-full m-auto items-center gap-10">
        <div className="w-[55%] bg-[url(/login-bg.png)] bg-no-repeat bg-cover bg-center rounded-xl h-[70dvh] shadow">
          <div className="flex flex-col items-start justify-end h-full bg-linear-to-t from-[#2c2a2a8e] from-5% rounded-xl via-30% via-[#2c2a2a00] p-8">
            <h4 className="text-white font-epiBold text-3xl">
              Unite a los beneficios de Fidel
            </h4>
            <h6 className="block text-white w-3/4 leading-5">
              Comenza a ganar puntos y beneficios exclusivos con cada compra en el centro comercial
            </h6>
          </div>
        </div>
        <div className="w-[45%] h-fit bg-white p-8 rounded-xl flex flex-col items-center gap-2 shadow-sm">
          <NavLink to="/" className={""}>
            <LogoSvg />
          </NavLink>
          <div className="mt-2">
            <h2 className="font-epiBold text-3xl text-center text-[#515838]">
              Bienvenido
            </h2>
            <h4 className="block font-regular">
              Inicia sesion para acceder a tu beneficios
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label className="block my-2 font-medium text-[#515838]">Email</label>
              <input
                type="email"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@email.com"
              />
            </div>
            <div className="">
              <label className="block my-2 font-medium text-[#515838]">Contraseña</label>
              <input
                type="password"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresá contraseña"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#FC6F2F] items-center text-lg h-fit py-[6px] mt-4 text-white rounded-md w-full text-center hover:cursor-pointer"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>
          <div className="flex gap-2 pt-4">
            <h5 className="text-[#515838]">No tenes cuenta?</h5>
            <Link to={"/register"} className="text-[#FC6F2F] font-medium hover:underline">
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
