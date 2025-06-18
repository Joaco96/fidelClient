import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="max-w-[70dvw] m-auto h-full justify-center items-center rounded-lg pb-8 relative flex">
      <div className="w-1/2 flex justify-end">
        <img src="/404.png" alt="imagen 404 error page" className="w-3/4"/>
      </div>
      <div className="flex flex-col w-1/2">
        <h2 className="text-6xl font-epiBold">Oops!</h2>
        <h4 className="text-3xl font-epiBold pt-2">404 - Page not found</h4>
        <h4>
          Esta pagina que estas buscando puede que ya no exista, cambio su
          nombre o no este disponible.
        </h4>
        <Link to="/app/dashboard" className=" text-white text-lg bg-amber-600 hover:bg-amber-700 px-2 py-2 cursor-pointer outline-none rounded-lg w-fit mt-5">
          Vovler al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
