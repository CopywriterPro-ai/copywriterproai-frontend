const getRewardfulClientReferenceId = () => {
  return (
    (window.Rewardful && window.Rewardful.referral) ||
    "checkout_" + new Date().getTime()
  );
};

export default getRewardfulClientReferenceId;
