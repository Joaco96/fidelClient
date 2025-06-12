import { useAuth } from "../app/providers/AuthProvider";
import { RoleIds } from "../entitites/Role";
import { ticketService } from "../shared/api/ticketService";
import { userService } from "../shared/api/userService";
import TicketCard from "../shared/components/ticket/TicketCard";
import useFetch from "../shared/hooks/useFetch";

const LIMIT_DAYS = 7;

const NewTicket = () => {
  const { userData } = useAuth();
  const { response: users } = useFetch({ service: userService.getUsers });
  const { response: tickets } = useFetch({ service: ticketService.getTickets });
  
  tickets?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const cantUsers = users?.length;

  let cantTickets = 0;
  let sumPuntos = 0;

  const today = new Date();
  const dateLimit = new Date(today.getTime());
  dateLimit.setDate(dateLimit.getDate() - LIMIT_DAYS);

  tickets?.map((item) => {
    if (item.createdAt >= dateLimit) {
      cantTickets += 1;
      sumPuntos += item.points_earned;
    }
  });

  return (
    <>
      <div className="max-w-[70vw] flex flex-col w-full m-auto gap-8 pb-8 top-5 relative pt-3">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col justify-between items-start h-full gap-1">
                <h3 className="text-3xl font-epiBold">Seguimiento Tickets</h3>
                <p>Buscá y canjeá beneficios con tus puntos disponibles.</p>
              </div>
            </div>
            <div className="bg-[#000] flex text-sm rounded-2xl px-[14px] pt-[3px] pb-[4px] w-fit">
              {userData?.role === RoleIds.USER
                ? "Usuario"
                : userData?.role === RoleIds.EMPLOYEE
                ? "Empleado"
                : "Administrador"}
            </div>
          </div>
          <div className="flex w-full gap-6">
            <div className="p-3 border-1 border-white rounded-lg w-1/3">
              <h4 className="font-medium">Comprobantes de esta semana</h4>
              <p className="text-3xl font-bold">{cantTickets}</p>
              <p className="text-sm">Tickets</p>
            </div>
            <div className="p-3 border-1 border-white rounded-lg w-1/3">
              <h4 className="font-medium">Otorgados esta semana</h4>
              <p className="text-3xl font-bold">{sumPuntos}</p>
              <p className="text-sm">Puntos</p>
            </div>
            <div className="p-3 border-1 border-white rounded-lg w-1/3">
              <h4 className="font-medium">Usuarios activos</h4>
              <p className="text-3xl font-bold">{cantUsers}</p>
              <p className="text-sm">Usuarios</p>
            </div>
          </div>
        </div>
        <div className="max-w-[70vw] flex w-full m-auto gap-8 pb-8 h-full relative">
          <div className="w-1/2 h-full border-1 border-white rounded-lg p-3">
            <h4 className="text-2xl pb-2 font-epiBold">Nuevo ticket</h4>
          </div>
          <div className="w-1/2 h-full border-1 border-white rounded-lg p-3">
            <h4 className="text-xl pb-4 font-epiBold">Historial reciente</h4>
            <div className="flex flex-col gap-6">
              {tickets?.map((item) => {
                return <TicketCard ticket={item} />
              })}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTicket;
