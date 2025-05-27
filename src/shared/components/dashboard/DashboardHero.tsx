import { useAuth } from "../../../app/providers/AuthProvider";
import UserPoints from "../UserPoints";

const DashboardHero = () => {
  const { userData } = useAuth();

  const userName = userData?.name;
  return (
    <div className="pb-12 bg-[#363636] pt-12 mb-6">
      <div className="max-w-[70dvw] m-auto flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold">
            Hola <span className="uppercase">{userName}</span>!
          </h3>
          <p>Explora los beneficios y canjea con tus puntos hoy.</p>
        </div>
        <UserPoints userData={userData}/>
      </div>
    </div>
  );
};

export default DashboardHero;
