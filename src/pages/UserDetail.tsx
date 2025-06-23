import { Link, useParams } from "react-router";
import { userService } from "../shared/api/userService";
import useFetch from "../shared/hooks/useFetch";
import { ActivityOptions, formatDate } from "../shared/utils/formatDate";
import { NumberFormatter } from "../shared/utils/numberFormatter";
import { roleNames, roles } from "../entitites/Role";
import Select from "../shared/components/Select";
import { useRef } from "react";
import { User } from "../entitites/User";
import { toast } from "sonner";

const UserDetail = () => {
  const { user_id } = useParams();
  const { response: user, serviceCall: getUsersById, isPending: userPending } = useFetch({
    service: user_id ? () => userService.getUserById(user_id) : undefined,
  });
  const {
    serviceCall: updateUserRole,
    isPending,
    handleApiResponse,
  } = useFetch({
    service: (params: { id: string; body: Pick<User, "role_id"> }) =>
      userService.updateUserRole(params.id, params.body),
    fetchOnRender: false,
  });
  const rolesSelectRef = useRef<HTMLSelectElement | null>(null);

  const handleUpdateRol = async () => {
    if (!rolesSelectRef.current?.value) {
      toast.warning("Selecciona un rol nuevo");
    } else {
      if (user_id && rolesSelectRef) {
        console.log(typeof rolesSelectRef.current!.value)
        const data = await updateUserRole({
          id: user_id,
          body: { role_id: Number(rolesSelectRef.current!.value) as unknown as User["role_id"] },
        });
        handleApiResponse(data);
        if (data.response) {
          toast.success("Cambio realizado con éxito")
          getUsersById({});
        }
      }
    }
  };

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3 gap-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">
              Editar usuario -{" "}
              <span className="capitalize">
                {user ? user?.[0].name : "..."}
              </span>
            </h3>
            <p>{user ? user?.[0].id : "..."}</p>
          </div>
        </div>
        <Link
          to="/app/users"
          className="font-medium hover:underline text-[#515838]"
        >
          Vovler a usuarios
        </Link>
      </div>
      <div className="flex flex-col gap-6 bg-white rounded-lg shadow-sm p-6">
        {!userPending ? (<><div className="flex">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Nombre</h4>
            <p>{user ? user?.[0].name : "..."}</p>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">DNI</h4>
            <p>{user ? user?.[0].dni : "..."}</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Email</h4>
            <p>{user ? user?.[0].email : "..."}</p>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">
              Fecha de creacion
            </h4>
            <p>
              {user?.[0].createdAt
                ? formatDate(user[0].createdAt, ActivityOptions)
                : "..."}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">Rol</h4>
            <div className="bg-[#FC6F2F] flex items-center h-fit py-[2px] text-white rounded-2xl px-[12px] w-fit">
              {user?.[0].role_id ? roleNames[user?.[0].role_id] : "..."}
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="text-lg font-epiBold text-gray-700">
              Balance de puntos
            </h4>
            <p>{NumberFormatter.format(user?.[0].points_balance)} pts.</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col bg-[#FFE9D1] p-5 rounded-lg">
          <Select
            ref={rolesSelectRef}
            items={roles.filter((rol) => {
              return String(rol.id) !== String(user?.[0].role_id);
            })}
            label={"Editar rol"}
            placeholder={"Nuevo rol"}
          />
          <button
            disabled={isPending}
            onClick={handleUpdateRol}
            className="font-medium py-2 cursor-pointer bg-[#515838] hover:bg-[#484e32] w-fill text-center h-fit rounded-lg flex justify-center text-white mt-2"
          >
            {isPending ? "Cambiando..." : "Cambiar rol"}
          </button>
        </div></>) : <div className="h-[120px] flex justify-center items-center text-lg font-medium">Cargando usuario...</div>}
        
      </div>
    </div>
  );
};

export default UserDetail;
