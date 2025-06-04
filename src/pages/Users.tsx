import useFetch from "../shared/hooks/useFetch";
import { userService } from "../shared/api/userService";
import { RoleIds } from "../entitites/Role";

const Users = () => {
  const { response } = useFetch({ service: userService.getUsers });

  return (
    <div>
      Usuarios activos
      {response
        ? response.map((user) => {
            return (
              <>
                <div className="p-2 my-3 border-amber-500 border-1 rounded-lg flex flex-col">
                  <div className="bg-[#000] flex text-sm rounded-2xl px-[14px] pt-[3px] pb-[4px] w-fit">
                    {user.role_id === RoleIds.USER
                      ? "Usuario"
                      : user?.role_id === RoleIds.EMPLOYEE
                      ? "Empleado"
                      : "Administrador"}
                  </div>
                  <p>ID: {user.id}</p>
                  <h3 className="font-bold text-lg uppercase">{user.name}</h3>
                  <p>DNI: {user.dni}</p>
                  <h5>EMAIL: {user.email}</h5>
                  <p>PUNTOS: {user.points_balance}</p>
                </div>
              </>
            );
          })
        : null}
    </div>
  );
};

export default Users;
