import { useParams } from "react-router";
import RedemptionCard from "../shared/components/redemption/RedemptionCard";

const RedemptionSuccess = () => {
  const { redemption_id } = useParams();

  return (
    <>
      <h3 className="max-w-[70vw] m-auto text-center pt-8">Beneficio canjeado con exito!</h3>
      <RedemptionCard redemptionId={redemption_id} />
    </>
  );
};

export default RedemptionSuccess;
