import KuliahBadge from "./KuliahBadge";
import PraktikumBadge from "./PraktikumBadge";
import ResponsiBadge from "./ResponsiBadge";

type KelasBadgeProps = {
    kelas : string;
}

export default function KelasBadge ({kelas}: KelasBadgeProps){
    switch (kelas) {

        case "Kuliah":
            return <KuliahBadge />;

        case "Responsi":
            return <ResponsiBadge />;

        case "Praktikum":
            return <PraktikumBadge />;

        default:
            return null;
    }
}