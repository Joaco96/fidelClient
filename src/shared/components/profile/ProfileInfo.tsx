import { Redemption } from "../../../entitites/Redemption";
import { Ticket } from "../../../entitites/Ticket";
import { JwtPayload } from "../../types/jwtPayload";

const ProfileInfo = ({
  userData,
  tickets,
  redemptions,
}: {
  userData: JwtPayload | null;
  tickets: Ticket[] | null;
  redemptions: Redemption[] | null;
}) => {

  let totalSpent = 0
  tickets?.map((ticket) => {
    totalSpent += ticket.amount_spent
  })

  return (
    <div className="max-w-[70vw] flex w-full m-auto gap-6 pb-8">
      <div className="flex p-3 flex-col border-1 w-1/2 border-white rounded-lg">
        <h4 className="text-2xl pb-4">Informacion personal</h4>
        <div>
          <h5>Id</h5>
          <p className="pb-2">{userData?.userId}</p>
          <h5>Email</h5>
          <p>{userData?.email}</p>
        </div>
      </div>
      <div className="flex flex-col w-1/2 gap-6">
        <div className="p-3 border-1 border-white rounded-lg">
          <h4 className="font-medium">Total gastado</h4>
          <p className="text-3xl font-bold">${totalSpent}</p>
          <p className="text-sm">En tiendas adheridas</p>
        </div>
        <div className="p-3 border-1 border-white rounded-lg">
          <h4 className="font-medium">Beneficios reclamados</h4>
          <p className="text-3xl font-bold">{redemptions?.length}</p>
          <p className="text-sm">Beneficios</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
