import { useParams } from "react-router";
import RedemptionCard from "../shared/components/redemption/RedemptionCard";

const Redemption = () => {
  const { redemption_id } = useParams();

  return (
    <RedemptionCard redemptionId={redemption_id} />
  )
}

export default Redemption