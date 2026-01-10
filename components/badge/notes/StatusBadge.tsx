import DoneBadge from "./DoneBadge";
import OnProgressBadge from "./OnProgressBadge";
import PendingBadge from "./PendingBadge";
import SoonBadge from "./SoonBadge";

type StatusBadgeProps = {
    status: string;
}

export default function StatusBadge({status}: StatusBadgeProps){
    switch (status) {
    case "Done":
      return <DoneBadge />;

    case "Pending":
      return <PendingBadge />;

    case "Soon":
      return <SoonBadge />;

    case "On Progress":
      return <OnProgressBadge />;

    default:
      return null;
  }
}