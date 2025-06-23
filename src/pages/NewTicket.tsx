import { useRef, useState } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { roleNames } from "../entitites/Role";
import { ticketService } from "../shared/api/ticketService";
import { userService } from "../shared/api/userService";
import FindUser from "../shared/components/ticket/FindUser";
import TicketCard from "../shared/components/ticket/TicketCard";
import useFetch from "../shared/hooks/useFetch";
import { User } from "../entitites/User";
import { toast } from "sonner";
import { storeService } from "../shared/api/storeService";
import Select from "../shared/components/Select";
import { NumberFormatter } from "../shared/utils/numberFormatter";

const LIMIT_DAYS = 7;
const MAX_TICKETS = 5;

const NewTicket = () => {
  const { userData } = useAuth();
  const { response: users } = useFetch({ service: userService.getUsers });
  const { response: stores } = useFetch({ service: storeService.getStores });
  const { response: tickets, serviceCall: getTickets } = useFetch({
    service: ticketService.getTickets,
  });
  const { response: pointsRate } = useFetch({
    service: ticketService.getPointsRate,
  });
  const [user, setUser] = useState<User | null>(null);
  const [ticketNum, setTicketNum] = useState<string>("");
  const [ticketAmount, setTicketAmount] = useState<number>(0);
  const storesSelectRef = useRef<HTMLSelectElement | null>(null);

  const { serviceCall: getUserByDni, isPending: userPending } = useFetch({
    service: userService.getUserByDni,
    fetchOnRender: false,
  });

  const {
    serviceCall: newTicket,
    isPending: ticketPending,
    handleApiResponse,
  } = useFetch({
    service: ticketService.newTicket,
    fetchOnRender: false,
  });

  tickets?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const cantUsers = users?.length;

  let cantTickets = 0;
  let sumPuntos = 0;

  const today = new Date();
  const dateLimit = new Date(today.getTime());
  dateLimit.setDate(dateLimit.getDate() - LIMIT_DAYS);

  tickets?.forEach((item) => {
    if (new Date(item.createdAt) >= dateLimit) {
      cantTickets += 1;
      sumPuntos += item.points_earned;
    }
  });

  const lastTickets = tickets?.slice(0, MAX_TICKETS);

  const handleGetUserByDni = async (dni: string) => {
    const data = await getUserByDni(dni);
    if (data.response?.length) setUser(data.response[0]);
    else {
      toast.error("No encontramos ningún usuario con ese DNI");
    }
  };
  const handleNewTicket = async () => {
    if (ticketAmount < 0) {
      toast.warning("Ingresar un monto gastado mayor a 0");
      return;
    } else {
      if (user && ticketNum && ticketAmount && storesSelectRef.current?.value) {
        const data = await newTicket({
          id: ticketNum,
          user_id: user.id,
          store_id: storesSelectRef.current?.value,
          amount_spent: ticketAmount,
        });
        handleApiResponse(data);
        if (data.response) {
          setTicketAmount(0);
          setTicketNum("");
          setUser(null);
          getTickets({});
        }
      } else {
        toast.warning("Hay campos incompletos");
      }
    }
  };

  return (
    <>
      <div className="max-w-[70vw] flex flex-col w-full m-auto gap-8 pb-8 top-5 relative pt-3">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col justify-between items-start h-full gap-1">
                <h3 className="text-3xl font-epiBold pt-2">
                  Seguimiento de tickets
                </h3>
                <p className="font-medium">
                  Buscá y agregá nuevos comprobantes con el DNI del usuario.
                </p>
              </div>
            </div>
            <div className="bg-[#FC6F2F] text-white flex text-sm rounded-2xl px-[14px] pt-[3px] pb-[4px] w-fit">
              {userData?.role ? roleNames[userData?.role] : "..."}
            </div>
          </div>
          <div className="flex w-full gap-6">
            <div className="p-3 shadow-sm bg-white rounded-lg w-1/3">
              <h4 className="font-medium">Comprobantes de esta semana</h4>
              <p className="text-3xl font-bold">
                {NumberFormatter.format(cantTickets)}
              </p>
              <p className="text-sm">Tickets</p>
            </div>
            <div className="p-3 shadow-sm bg-white rounded-lg w-1/3">
              <h4 className="font-medium">Otorgados esta semana</h4>
              <p className="text-3xl font-bold">
                {NumberFormatter.format(sumPuntos)}
              </p>
              <p className="text-sm">Puntos</p>
            </div>
            <div className="p-3 shadow-sm bg-white rounded-lg w-1/3">
              <h4 className="font-medium">Usuarios activos</h4>
              <p className="text-3xl font-bold">
                {NumberFormatter.format(cantUsers)}
              </p>
              <p className="text-sm">Usuarios</p>
            </div>
          </div>
        </div>
        <div className="max-w-[70vw] flex w-full m-auto gap-8 pb-8 h-full relative">
          <div className="w-1/2 h-full bg-white shadow-sm rounded-lg p-5">
            <h4 className="text-2xl pb-2 font-epiBold">Nuevo ticket</h4>
            <FindUser
              handleSubmit={handleGetUserByDni}
              selectedUser={user}
              loading={userPending}
              resetUser={() => setUser(null)}
            />
            {user ? (
              <>
                <label className="block my-2 text-sm font-medium pt-2">
                  Numero de comprobante
                </label>
                <input
                  maxLength={255}
                  type="text"
                  className="block w-full px-4 py-2 border rounded-md border-[#72727260]"
                  onChange={(e) => setTicketNum(e.target.value)}
                  value={ticketNum}
                  placeholder="Ingresa el numero de ticket"
                />
                <label className="block my-2 text-sm font-medium pt-2">
                  Monto gastado
                </label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 border rounded-md no-arrows border-[#72727260] mb-4"
                  onChange={(e) => setTicketAmount(Number(e.target.value))}
                  value={ticketAmount}
                  placeholder="$"
                />
                <Select
                  ref={storesSelectRef}
                  items={stores?.map((store) => {
                    return { id: store.id, name: store.name };
                  })}
                  label={"Tienda"}
                  placeholder={"Selecciona la tienda"}
                />{" "}
                <div className="rounded-lg flex justify-between items-center p-5 mt-5 bg-[#FFE9D1]">
                  <div>
                    <h6 className="font-bold text-lg">Puntos a asignar al usuario</h6>
                    <p>
                      {pointsRate?.rate ? pointsRate.rate * 10 : 0} puntos por
                      cada $10 gastados
                    </p>
                  </div>
                  <span className="text-3xl font-medium text-[#FC6F2F]">
                    {ticketAmount && pointsRate?.rate
                      ? NumberFormatter.format(
                          Math.floor(ticketAmount * pointsRate.rate)
                        )
                      : 0}
                  </span>
                </div>
                <button
                  disabled={ticketPending}
                  onClick={handleNewTicket}
                  className="text-white text-lg bg-[#515838]  hover:bg-[#484e31] px-2 py-2 w-full cursor-pointer outline-none rounded-lg mt-5"
                >
                  {ticketPending ? "Creando..." : "Crear nuevo ticket"}
                </button>
              </>
            ) : null}
          </div>
          <div className="w-1/2 h-full bg-white shadow-sm rounded-lg">
            <div className="border-b-1 border-[#e9e9e9] p-4">
              <h4 className="text-xl font-semibold">Historial reciente</h4>
            </div>
            <div className="flex flex-col gap-4 px-4 pt-4">
              {lastTickets?.map((item, index) => {
                return <TicketCard key={item.id} ticket={item} index={index} lenght={lastTickets.length}/>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTicket;
