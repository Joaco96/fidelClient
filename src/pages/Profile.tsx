import { useAuth } from "../app/providers/AuthProvider";
import RecentActivity from "../shared/components/dashboard/RecentActivity";
import ProfileHero from "../shared/components/profile/ProfileHero";
import ProfileInfo from "../shared/components/profile/ProfileInfo";
import useActivities from "../shared/hooks/useActivities";

const Profile = () => {
  const { userData } = useAuth();
  const { tickets, redemptions, sortedActivities } = useActivities();

  return (
    <div className="relative top-5">
      <ProfileHero userData={userData} />
      <ProfileInfo
        userData={userData}
        tickets={tickets}
        redemptions={redemptions}
      />
      <RecentActivity activities={sortedActivities} profile={true} />
    </div>
  );
};

export default Profile;
