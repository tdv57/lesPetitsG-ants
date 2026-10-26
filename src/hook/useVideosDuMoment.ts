import { QueryKeys } from "../queries/QueryKeys";
import { getVideosDuMoment } from "../service/VideoService";
import { useQuery } from "@tanstack/react-query";

export function useVideosDuMoment() {
  return useQuery({
    queryKey: QueryKeys.videos.duMoment(),
    queryFn: getVideosDuMoment,
 });
}