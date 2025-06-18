import useFetch from "../shared/hooks/useFetch";
import { userService } from "../shared/api/userService";
import { RoleIds } from "../entitites/Role";
import { Link } from "react-router";

const Users = () => {
  const { response } = useFetch({ service: userService.getUsers });

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">Gestión de usuarios</h3>
            <p>Visualizá y administrá los usuarios activos.</p>
          </div>
        </div>

        <Link to="/app/dashboard" className=" text-white">
          Vovler al dashboard
        </Link>
      </div>
      <div className="flex flex-wrap gap-10 justify-start mt-10 bg-neutral-900 rounded-xl p-4">
        {response
          ? response.map((user) => {
              return (
                <>
                  <div className="flex gap-4 items-center w-[22.7%]">
                    <div className="bg-[#000] rounded-full w-24 h-24 flex justify-center items-center font-bold text-5xl">
                      <span className="font-bold capitalize leading-9 pb-[2px]">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between">
                        <div className="bg-amber-600 flex text-sm rounded-2xl px-[14px] pt-[3px] pb-[3px] w-fit">
                          {user.role_id === RoleIds.USER
                            ? "Usuario"
                            : user?.role_id === RoleIds.EMPLOYEE
                            ? "Empleado"
                            : "Administrador"}
                        </div>
                        <Link
                          to={`/app/users/${user.id}`}
                          className=" text-amber-600"
                        >
                          Editar
                        </Link>
                      </div>
                      <h3 className="font-bold text-lg uppercase">
                        {user.name}
                      </h3>
                      <p>DNI: {user.dni}</p>
                      <p>{user.points_balance} pts.</p>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Users;
