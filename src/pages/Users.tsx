import useFetch from "../shared/hooks/useFetch";
import { userService } from "../shared/api/userService";
import { roleNames, roles } from "../entitites/Role";
import { Link } from "react-router";
import { NumberFormatter } from "../shared/utils/numberFormatter";
import { User } from "../entitites/User";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import FindUser from "../shared/components/ticket/FindUser";

const Users = () => {
  const { response, isPending: userPending } = useFetch({
    service: userService.getUsers,
  });

  const { serviceCall: getUserByDni, isPending: userByDniPending } = useFetch({
    service: userService.getUserByDni,
    fetchOnRender: false,
  });

  const [filteredUser, setFilteredUser] = useState<User[] | null>(null);
  const [activeRolFilter, setActiveRolFilter] = useState<string>("");

  const handleGetUserByDni = async (dni: string) => {
    setActiveRolFilter("");
    const data = await getUserByDni(dni);
    if (data.response?.length) setFilteredUser([data.response[0]]);
    else {
      toast.error("No encontramos ningún usuario con ese DNI");
    }
  };

  const handleRoleFilter = (rol_id: string) => {
    setActiveRolFilter(rol_id);
  };

  const handleReset = () => {
    setActiveRolFilter("");
  };

  const handleDniFilterReset = () => {
    setFilteredUser(response);
    setActiveRolFilter("");
  };

  useEffect(() => {
    setFilteredUser(response ? response : null);
  }, [response]);

  const newFilteredUsers = useMemo(
    () =>
      activeRolFilter
        ? filteredUser?.filter((user) => {
            return user.role_id === Number(activeRolFilter);
          })
        : filteredUser,
    [activeRolFilter, filteredUser]
  );

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">Gestión de usuarios</h3>
            <p className="font-medium">
              Visualizá y administrá los usuarios activos.
            </p>
          </div>
        </div>
        <Link to="/app/dashboard" className=" font-medium hover:underline">
          Volver al dashboard
        </Link>
      </div>
      <div className="w-full items-center justify-between flex">
        <div className="flex gap-4 items-center justify-start w-1/2">
          {roles.map((rol) => {
            return (
              <button
                className={`h-fit px-3 py-0.5 rounded-full hover:cursor-pointer ${
                  activeRolFilter === rol.id
                    ? "bg-[#FC6F2F] text-white"
                    : "bg-white shadow-sm"
                }`}
                onClick={() => (!(activeRolFilter === rol.id) ? handleRoleFilter(rol.id) : handleReset())}
              >
                {rol.name}
              </button>
            );
          })}
        </div>
        <div className="w-1/2">
          <FindUser 
            handleSubmit={handleGetUserByDni}
            loading={userByDniPending || !response}
            resetUser={handleDniFilterReset}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-start mt-6 bg-white shadow-sm rounded-xl px-4">
        {!userPending ? (
          newFilteredUsers ? (
            newFilteredUsers.map((user, index) => {
              return (
                <>
                  <div
                    className={`flex gap-4 items-center w-full mx-4 py-[20px] ${
                      newFilteredUsers.length - 1 > index
                        ? "border-b-1 border-[#e9e9e9]"
                        : ""
                    }`}
                  >
                    <div className="bg-[#515838] rounded-full w-12 h-12 flex justify-center items-center font-bold text-2xl">
                      <span className="font-bold capitalize leading-9 pb-[2px] text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium capitalize">{user.name}</h3>
                        <span>-</span>
                        <p className="text-sm">
                          DNI: {NumberFormatter.format(user.dni)}
                        </p>
                        <span>-</span>
                        <p className="text-sm text-[#FC6F2F]">
                          {NumberFormatter.format(user.points_balance)} pts.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#FC6F2F] flex text-xs items-center h-fit pt-[2px] pb-[3px] text-white rounded-2xl px-[8px] w-fit">
                          {user?.role_id ? roleNames[user?.role_id] : "..."}
                        </div>
                        <p className="text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/app/users/${user.id}`}
                        className=" text-[#FC6F2F] font-medium hover:underline"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                </>
              );
            })
          ) : null
        ) : (
          <div className="h-[90px] m-auto flex justify-center items-center font-medium text-lg">Cargando usuarios...</div>
        )}
      </div>
    </div>
  );
};

export default Users;
