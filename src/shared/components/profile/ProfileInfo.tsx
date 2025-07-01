import { Link } from "react-router";
import { Redemption } from "../../../entitites/Redemption";
import { Ticket } from "../../../entitites/Ticket";
import { JwtPayload } from "../../types/jwtPayload";
import { NumberFormatter } from "../../utils/numberFormatter";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import { userService } from "../../api/userService";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../../app/providers/AuthProvider";
import { User } from "../../../entitites/User";
import { useRef } from "react";
import PasswordInput from "../PasswordInput";
import { toast } from "sonner";

const ProfileInfo = ({
  userData,
  tickets,
  redemptions,
}: {
  userData: JwtPayload | null;
  tickets: Ticket[] | null;
  redemptions: Redemption[] | null;
}) => {
  let totalSpent = 0;
  let totalPoints = 0;
  tickets?.map((ticket) => {
    totalSpent += ticket.amount_spent;
    totalPoints += ticket.points_earned;
  });
  const { logout } = useAuth();
  const {
    serviceCall: deleteUser,
    handleApiResponse,
    isPending,
  } = useFetch({
    service: userService.deleteUser,
    fetchOnRender: false,
  });

  const {
    serviceCall: updateUser,
    isPending: updateUserPending,
  } = useFetch({
    service: (params: { id: string; body: Partial<User> }) =>
      userService.updateUser(params.id, params.body),
    fetchOnRender: false,
  });

  const { openModal, ConfirmModalComponent } = useConfirmModal();
  const passwordRef = useRef<string>("");
  const repeatedPasswordRef = useRef<string>("");

  const handleDeleteUser = () => {
    openModal({
      title: "Eliminar cuenta",
      message: "Esta acción eliminará el elemento permanentemente.",
      children: null,
      onConfirm: async () => {
        if (userData) {
          const data = await deleteUser(userData?.userId);
          handleApiResponse(data);
          if (data.response) {
            logout();
          }
        }
      },
    });
  };

  const handleChangeUserPassword = () => {
    openModal({
      title: "Modificar contraseña",
      message: "Esta acción modificará la contraseña permanentemente.",
      children: (
        <>
          <PasswordInput
            onPasswordChange={(value) => {
              passwordRef.current = value;
            }}
            label={"Nueva contraseña"}
          />
          <PasswordInput
            onPasswordChange={(value) => {
              repeatedPasswordRef.current = value;
            }}
            label={"Repetir contraseña"}
          />
        </>
      ),
      onConfirm: async () => {
        if (
          passwordRef.current &&
          passwordRef.current === repeatedPasswordRef.current &&
          userData?.userId
        ) {
          const data = await updateUser({
            id: userData.userId,
            body: { password: passwordRef.current },
          });
          if (data.response) {
            toast.success("Contraseña modificada con éxito");
          }
        } else {
          toast.warning("Las contraseñas deben ser iguales");
        }
      },
    });
  };

  return (
    <div className="max-w-[70vw] flex flex-col w-full m-auto gap-6 mb-10">
      {ConfirmModalComponent}
      <div className="flex w-full gap-6">
        <div className="p-4 bg-white shadow-sm rounded-lg w-1/3">
          <h4 className="font-medium">Total gastado</h4>
          <p className="text-3xl font-bold">
            ${NumberFormatter.format(totalSpent)}
          </p>
          <p className="text-sm text-gray-500">En tiendas adheridas</p>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-lg w-1/3">
          <h4 className="font-medium">Beneficios reclamados</h4>
          <p className="text-3xl font-bold">
            {redemptions?.length ? redemptions?.length : "0"}
          </p>
          <p className="text-sm text-gray-500">Total de beneficios</p>
        </div>
        <div className="p-4 bg-white shadow-sm rounded-lg w-1/3">
          <h4 className="font-medium">Nivel obtenido</h4>
          <p className="text-3xl font-bold">
            {NumberFormatter.format(totalPoints)}
          </p>
          <p className="text-sm text-gray-500">Puntos de la cuenta</p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col w-1/2 bg-white shadow-sm rounded-lg">
          <div className="flex justify-between items-center border-b-1 border-[#e9e9e9] p-4">
            <h4 className="text-xl font-semibold">Informacion personal</h4>
            <Link
              to={`/app/profile/edit`}
              className="bg-[#FC6F2F] text-white hover:bg-[#db4500] flex rounded-md px-[20px] pt-[5px] pb-[5px] w-fit"
            >
              Editar
            </Link>
          </div>
          <div className="p-4">
            <h5 className="font-medium text-gray-500">ID</h5>
            <p className="pb-2 text-lg text-black">
              {userData?.userId}
            </p>
            <h5 className="font-medium text-gray-500">Email</h5>
            <p className="pb-2 text-lg text-black">
              {userData?.email}
            </p>
            <h5 className="font-medium text-gray-500">DNI</h5>
            <p className="text-lg text-black">
              {NumberFormatter.format(userData?.dni)}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/2 bg-white shadow-sm rounded-lg">
          <div className="border-b-1 border-[#e9e9e9] p-4">
            <h4 className="text-xl font-semibold">Preferencias y Seguridad</h4>
          </div>
          <div className="flex flex-col items-center gap-2 p-4">
            <button
              disabled={updateUserPending}
              onClick={handleChangeUserPassword}
              className="font-medium py-2 cursor-pointer bg-[#e9e9e9] hover:bg-[#dbdbdb] w-full rounded-lg text-[#515838]"
            >
              {updateUserPending ? "Cambiando..." : "Cambiar contraseña"}
            </button>
            <button
              disabled={isPending}
              onClick={handleDeleteUser}
              className=" text-[#f00] py-2 cursor-pointer disabled:opacity-50 font-medium hover:underline"
            >
              {isPending ? "Eliminando..." : "Eliminar cuenta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
