import { Reward } from '../../../entitites/Reward';
import RewardCard from './RewardCard';

const RewardsLayout = ({rewards}:{rewards: Reward[] | null}) => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full m-auto">
        {rewards
          ? rewards.map((item) => {
              return (
                <RewardCard reward={item} key={item.id}/>
              );
            })
          : null}
      </div>
  )
}

export default RewardsLayout