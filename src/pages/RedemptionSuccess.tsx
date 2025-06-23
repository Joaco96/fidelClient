import { useParams } from "react-router";
import RedemptionCard from "../shared/components/redemption/RedemptionCard";

const RedemptionSuccess = () => {
  const { redemption_id } = useParams();

  return (
    <>
      <svg
        width="92"
        height="92"
        viewBox="0 0 62 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[70vw] m-auto pt-12"
      >
        <circle cx="31" cy="31" r="31" fill="#D1FAE5" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M40.7028 24.4847C41.5568 25.3389 41.5568 26.7236 40.7028 27.5778L29.7653 38.5153C28.9111 39.3693 27.5264 39.3693 26.6722 38.5153L22.2972 34.1403C21.4682 33.282 21.48 31.9176 22.3238 31.0738C23.1676 30.23 24.532 30.2182 25.3903 31.0472L28.2188 33.8756L37.6097 24.4847C38.4639 23.6307 39.8486 23.6307 40.7028 24.4847V24.4847Z"
          fill="#10B981"
        />
      </svg>
      <h3 className="max-w-[70vw] m-auto text-center text-2xl font-medium pt-2 text-gray-700">
        Beneficio canjeado exitosamente!
      </h3>
      <h6 className="max-w-[70vw] m-auto text-center pt-1">
        Tu canje se realizo con éxito, visualizá toda la información.
      </h6>
      <RedemptionCard redemptionId={redemption_id} />
    </>
  );
};

export default RedemptionSuccess;
