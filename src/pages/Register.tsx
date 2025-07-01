import { FormEvent, useState } from "react";
import { authService } from "../shared/api/authService";
import { Link, NavLink, useNavigate } from "react-router";
import useFetch from "../shared/hooks/useFetch";
import { toast } from "sonner";
import LogoSvg from "../shared/components/LogoSvg";

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
    <div className="min-h-screen flex items-center justify-center bg-[#FFE9D1]">
      <div className="md:max-w-[75dvw] flex w-full m-auto items-center gap-10">
        <div className="w-[55%] bg-[url(/register-bg.png)] bg-no-repeat bg-cover bg-center rounded-xl h-[70dvh] shadow">
          <div className="flex flex-col items-start justify-end h-full bg-linear-to-t from-[#2c2a2a8e] from-5% rounded-xl via-30% via-[#2c2a2a00] p-8">
            <h4 className="text-white font-epiBold text-3xl">
              Unite a los beneficios de Fidel
            </h4>
            <h6 className="block text-white w-3/4 leading-5">
              Comenza a ganar puntos y beneficios exclusivos con cada compra en
              el centro comercial
            </h6>
          </div>
        </div>
        <div className="w-[45%] h-fit bg-white p-8 rounded-xl flex flex-col items-center gap-2 shadow-sm">
          <NavLink to="/" className={""}>
            <LogoSvg />
          </NavLink>
          <div className="mt-2">
            <h2 className="font-epiBold text-3xl text-center text-[#515838]">
              Crear cuenta
            </h2>
            <h4 className="block font-regular">
              Unite a nuestro programa de fidelidad hoy
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label className="block my-1 font-medium text-[#515838]">
                Nombre
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Juan Perez"
              />
            </div>
            <div>
              <label className="block my-1 font-medium text-[#515838]">
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@email.com"
              />
            </div>
            <div>
              <label className="block my-1 font-medium text-[#515838]">
                DNI
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
                placeholder="88.888.888"
              />
            </div>
            <div>
              <label className="block my-1 font-medium text-[#515838]">
                Contraseña
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                required
                placeholder="Elegí una contraseña segura"
              />
            </div>
            <div>
              <label className="block my-1 font-medium text-[#515838]">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                value={repeatedPassword}
                onChange={(e) => {
                  setRepeatedPassword(e.target.value);
                  setError(null);
                }}
                required
                placeholder="Confirmá tu contraseña"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#FC6F2F] items-center text-lg h-fit py-[6px] mt-4 text-white rounded-md w-full text-center hover:cursor-pointer"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
          <div className="flex gap-2 pt-4">
            <h5 className="text-black">Tenes cuenta?</h5>
            <Link to={"/login"} className="text-[#FC6F2F] font-medium hover:underline">
              Inicia sesion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
