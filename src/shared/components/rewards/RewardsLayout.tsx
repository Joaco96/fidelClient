import { Reward } from '../../../entitites/Reward';
import RewardCard from './RewardCard';

const RewardsLayout = ({rewards, userRole}:{rewards: Reward[] | null, userRole: number}) => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full m-auto">
        {rewards
          ? rewards.map((item) => {
              return (
                <RewardCard reward={item} key={item.id} userRole={userRole}/>
              );
            })
          : null}
      </div>
  )
}

export default RewardsLayout