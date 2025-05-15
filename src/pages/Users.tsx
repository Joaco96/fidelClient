import useFetch from "../shared/hooks/useFetch";
import { userService } from "../shared/api/userService";

const Users = () => {
  const { response } = useFetch({ service: userService.getUsers });

  return (
    <div>
      Usuarios activos
      {response ? response.map(user => {
        return <>
            <div className="p-2 my-3 border-amber-500 border-1 rounded-lg">
                <p>DNI: {user.id}</p>
                <h3 className="font-bold text-lg uppercase">{user.name}</h3>
                <p>DNI: {user.dni}</p>
                <h5>EMAIL: {user.email}</h5>
                <p>PUNTOS: {user.points_balance}</p>
            </div>
        </>
      }) : null}
    </div>
  );
};

export default Users;
