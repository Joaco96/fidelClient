import { Link } from "react-router";
import useFetch from "../shared/hooks/useFetch";
import { userService } from "../shared/api/userService";
import { User } from "../entitites/User";
import { ActivityOptions, formatDate } from "../shared/utils/formatDate";
import { roleNames } from "../entitites/Role";
import { NumberFormatter } from "../shared/utils/numberFormatter";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useConfirmModal } from "../shared/hooks/useConfirmModal";
import { useAuth } from "../app/providers/AuthProvider";
import { authService } from "../shared/api/authService";
import PasswordInput from "../shared/components/PasswordInput";

const ProfileDetail = () => {
  const { login, userData } = useAuth();

  const { response: userPointsResponse } = useFetch({
    service: userData
      ? () => userService.getUserPoints(userData.userId)
      : undefined,
  });

  const {
    serviceCall: loginService,
    isPending: loginPending,
    handleApiResponse: handleApiLoginResponse,
  } = useFetch({
    service: authService.login,
    fetchOnRender: false,
  });

  const [userName, setUserName] = useState<string | null>(
    userData ? userData.name : null
  );
  const [userDni, setUserDni] = useState<string | null>(
    userData ? userData.dni : null
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    userData ? userData.email : null
  );

  const { openModal, ConfirmModalComponent } = useConfirmModal();

  const {
    serviceCall: updateUser,
    isPending,
    handleApiResponse,
  } = useFetch({
    service: (params: { id: string; body: Partial<User> }) =>
      userService.updateUser(params.id, params.body),
    fetchOnRender: false,
  });

  const passwordRef = useRef<string>("");

  const handleUpdateUser = async () => {
    openModal({
      title: "Guardar cambios",
      message: "Ingresá tu contraseña para guardar los cambios.",
      children: (
        <PasswordInput
          onPasswordChange={(value) => {
            passwordRef.current = value;
          }}
        />
      ),
      onConfirm: async () => {
        console.log("Password actual:", passwordRef.current);
        if (userData?.userId && userDni && userName && userEmail) {
          const loginFirstResult = await loginService({
            email: userEmail,
            password: passwordRef.current,
          });
          handleApiLoginResponse(loginFirstResult, false);
          if (loginFirstResult.response?.token) {
            const data = await updateUser({
              id: userData.userId,
              body: {
                dni: userDni,
                name: userName,
                email: userEmail,
              },
            });
            handleApiResponse(data);
            if (data.response) {
              toast.success("Cambios guardados con éxito");
              setUserName(data.response.name);
              setUserDni(data.response.dni);
              setUserEmail(data.response.email);
              await login(
                {
                  email: userEmail,
                  password: passwordRef.current,
                },
                false
              );
            }
          }
        }
      },
    });
  };

  useEffect(() => {
    if (userData) {
      setUserName(userData.name);
      setUserDni(userData.dni);
      setUserEmail(userData.email);
    }
  }, [userData]);

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3 gap-8 flex flex-col">
      {ConfirmModalComponent}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">
              Editar perfil -{" "}
              <span className="capitalize">
                {userData ? userData.name : "..."}
              </span>
            </h3>
            <p>{userData ? userData.userId : "..."}</p>
          </div>
        </div>
        <Link
          to="/app/profile"
          className="font-medium hover:underline text-[#515838]"
        >
          Vovler al perfil
        </Link>
      </div>
      <div className="flex flex-col gap-6 bg-white rounded-lg shadow-sm p-6">
        {userData ? (
          <>
            <div className="flex gap-6">
              <div className="w-1/2">
                <h4 className="text-lg font-epiBold text-gray-700">Nombre</h4>
                <input
                  maxLength={255}
                  className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName ?? ""}
                />
              </div>
              <div className="w-1/2">
                <h4 className="text-lg font-epiBold text-gray-700">Rol</h4>
                <div className="bg-[#FC6F2F] flex items-center h-fit py-[2px] text-white rounded-2xl px-[12px] w-fit">
                  {userData?.role ? roleNames[userData.role] : "..."}
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-1/2">
                <h4 className="text-lg font-epiBold text-gray-700">Email</h4>
                <input
                  maxLength={255}
                  className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail ?? ""}
                />
              </div>
              <div className="w-1/2">
                <h4 className="text-lg font-epiBold text-gray-700">
                  Fecha de creacion
                </h4>
                <p>
                  {userData.createdAt
                    ? formatDate(userData.createdAt, ActivityOptions)
                    : "..."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-1/2">
                <h4 className="text-lg font-epiBold text-gray-700">DNI</h4>
                <input
                  maxLength={255}
                  className="block w-full px-4 py-2 border rounded-md resize-none border-[#72727260]"
                  onChange={(e) => setUserDni(e.target.value)}
                  value={userDni ?? ""}
                />
              </div>
              <div className="w-1/2">
                <h4 className="text-lg font-epiBold text-gray-700">
                  Balance de puntos
                </h4>
                <p>
                  {NumberFormatter.format(userPointsResponse?.points_balance)}{" "}
                  pts.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between gap-6">
              <button
                disabled={isPending || loginPending}
                onClick={handleUpdateUser}
                className="font-medium py-2 cursor-pointer bg-[#515838] hover:bg-[#484e32] w-fill text-center disabled:opacity-50 h-fit rounded-lg flex justify-center text-white mt-2 w-1/2"
              >
                {isPending || loginPending ? "Guardando..." : "Guardar cambios"}
              </button>
              <div className="w-1/2"></div>
            </div>
          </>
        ) : (
          <div className="h-[120px] flex justify-center items-center text-lg font-medium">
            Cargando usuario...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetail;


