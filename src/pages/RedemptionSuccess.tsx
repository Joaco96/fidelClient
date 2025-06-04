import { useParams } from "react-router";
import RedemptionCard from "../shared/components/redemption/RedemptionCard";

const RedemptionSuccess = () => {
  const { redemption_id } = useParams();

  return (
    <>
      Succesfullllllllllllll
      <RedemptionCard redemptionId={redemption_id} />
    </>
  );
};

export default RedemptionSuccess;
