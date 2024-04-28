import { createSignal } from "solid-js";

function Countdown({ targetDate }: { targetDate: Date }) {
  const [daysLeft, _] = createSignal(calculateDaysLeft(targetDate));

  function calculateDaysLeft(targetDate: Date) {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target.getTime() - now.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  }

  return (
    <div>
      {daysLeft()} day{daysLeft() !== 1 ? "s" : ""} to go!
    </div>
  );
}

export default Countdown;
