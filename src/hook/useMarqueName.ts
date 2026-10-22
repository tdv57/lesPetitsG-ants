import { getImageByType } from "../service/ImageService";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../queries/QueryKeys";
import { TypeImageEnumValue } from "../enum/TypeImageEnum";

export function useMarqueName() {
    return useQuery({
        queryKey: QueryKeys.marques.findAll(),
        queryFn: () => getImageByType(TypeImageEnumValue.MARQUE),
    });
}