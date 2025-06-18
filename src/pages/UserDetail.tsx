import { Link, useParams } from "react-router";
import { userService } from "../shared/api/userService";
import useFetch from "../shared/hooks/useFetch";

const UserDetail = () => {
  const { user_id } = useParams();
  const { response: user } = useFetch({
    service: user_id ? () => userService.getUserById(user_id) : undefined,
  });

  return (
    <div className="max-w-[70dvw] m-auto rounded-lg pb-8 top-5 relative pt-3 gap-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col justify-between items-start h-full gap-1">
            <h3 className="text-3xl font-epiBold pt-2">Editar usuario - <span className="capitalize">{user?.[0].name}</span></h3>
            <p>Editá un beneficio para el programa de fidelización.</p>
          </div>
        </div>
{user?.[0].id}
        <Link to="/app/users" className="text-white">
          Vovler
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
