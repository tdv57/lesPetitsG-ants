import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../queries/QueryKeys";
import { getVideoArticleDeLaSaison } from "../service/VideoService";

export function useArticleDeLaSaison() {
    return useQuery({
        queryKey: QueryKeys.videos.deLaSaison(),
        queryFn: getVideoArticleDeLaSaison,
    });
}