import { useParams } from "react-router-dom";
import { FALL_2026_WEEKS } from "@/data/fall2026-weeks";
import Fall2026WeekLayout from "@/components/Fall2026WeekLayout";
import Fall2026Placeholder from "./Fall2026Placeholder";

const Fall2026Week = () => {
  const { week } = useParams();
  const w = FALL_2026_WEEKS.find((x) => x.routeWeek === week);
  if (!w) return <Fall2026Placeholder title={`Week ${week}`} />;
  return <Fall2026WeekLayout week={w} />;
};

export default Fall2026Week;
