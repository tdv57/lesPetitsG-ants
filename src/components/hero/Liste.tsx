
import ListeForm from "../form/ListeForm";
import { useListe } from "../../hook/useListe";
import { Select } from "../card/Select";
import { Modal } from "../modal/Modal";
import { useState } from "react";
import DossierForm from "../form/DossierForm";
import { createDossier, createImage, deleteDossier, deleteImage, findAllDossier, findAllImageByDossier, updateDossier } from "../../service/ListeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../queries/QueryKeys";
import type { DossierListeSelectType, ImageListeSelectType } from "../../types/ListeType";
import { COLORS } from "../../variables/couleur";
import { ConfirmationSuppressionCard } from "../card/ConfirmationSuppressionCard";
import { ImageForm } from "../form/ImageForm";
import { ImageListeCard } from "../card/ImageListeCard";
import { LoadingCard } from "../card/LoadingCard";

export function Liste() {
    const DEFAULT_DOSSIER_NAME = "Cliquez";
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [dossierName, setDossierName] = useState<string>(DEFAULT_DOSSIER_NAME);
    const {client, handleLogout, handleLogin } = useListe();

    const { data: dossiers = [], isPending: isPendingDossiers } = useQuery({
        queryKey: QueryKeys.listeDossier.findAll(),
        queryFn: () => findAllDossier(),
        enabled: client !== null,
    });

    const dossierActif = dossiers.find((d) => d.name === dossierName) ?? null;

    const { data: images = [], isPending: isPendingImages } = useQuery({
        queryKey: QueryKeys.listeImage.findByDossier(dossierActif?.id),
        queryFn: () => findAllImageByDossier(dossierActif!.id),
        enabled: dossierActif !== null,
    });

    const optionDossiers = dossiers.map((dossier) => ({label: dossier.name, value: dossier.name}))
    const queryClient = useQueryClient();

    const createDossierMutation = useMutation({
        mutationFn: (name: string) => createDossier(name),
        onSuccess: (newDossier) => {
            if (!newDossier || Array.isArray(newDossier)) return;

            queryClient.setQueryData<DossierListeSelectType[]>(
                QueryKeys.listeDossier.findAll(),
                (input) => [...(input ?? []), newDossier]
            );
            setOpenCreate(false);
            setDossierName(newDossier.name);
        },
    });

    const createImageMutation = useMutation({
        mutationFn: (data: { dossierId: number, image: File }) => {
            return createImage(data.dossierId, data.image);
        },
        onSuccess: (newImage, { dossierId }) => {
            if (!newImage || Array.isArray(newImage)) return;

            queryClient.setQueryData<ImageListeSelectType[]>(
                QueryKeys.listeImage.findByDossier(dossierId),
                (input) => [...(input ?? []), newImage]
            );
            setOpenCreate(false);
        },
    })

    const updateDossierMutation = useMutation({
        mutationFn: (data:  {name: string, id: number}) => updateDossier(data.name, data.id),
        onSuccess: (newDossier) => {
            if (!newDossier || Array.isArray(newDossier)) return;

            queryClient.setQueryData<DossierListeSelectType[]>(
                QueryKeys.listeDossier.findAll(),
                (old = []) => old.map((dossier) => dossier.id === newDossier.id ? newDossier : dossier)
            );
            setOpenUpdate(false);
            setDossierName(newDossier.name);
        },
    });

    const deleteDossierMutation = useMutation({
        mutationFn: (id: number) => deleteDossier(id),
        onSuccess: (_data, id) => {
            queryClient.setQueryData<DossierListeSelectType[]>(
                QueryKeys.listeDossier.findAll(),
                (old = []) => old.filter((dossier) => dossier.id !== id)
            );
            setOpenDelete(false);
        },
    });

    const deleteImageMutation = useMutation({
        mutationFn: (data : { dossierId: number, imageId: number}) => deleteImage(data.dossierId, data.imageId),
        onSuccess: (_data, { dossierId, imageId }) => {
            queryClient.setQueryData<ImageListeSelectType[]>(
                QueryKeys.listeImage.findByDossier(dossierId),
                (old = []) => old.filter((image) => image.id !== imageId)
            );
            setOpenDelete(false);
        },
    });

    const handleDeleteDossier = () => {
        const dossier = dossiers.find(d => d.name === dossierName);
        if (!dossier) return;
        deleteDossierMutation.mutate(dossier.id);
        if (dossier.name === dossierName) setDossierName(DEFAULT_DOSSIER_NAME);
    }

    const handleUpdateDossier = async (name: string) => {
        const dossier = dossiers.find(d => d.name === dossierName);
        if (!dossier) return;
        updateDossierMutation.mutateAsync({ name: name, id: dossier.id });
        setDossierName(name);
    }

    const handleCreateImage = (image : File) => {
        if (!dossierActif) return;
        createImageMutation.mutate({ dossierId: dossierActif.id, image })
    }

    const handleDeleteImage = (imageId: number) => {
        if(!dossierActif) return;
        deleteImageMutation.mutate({dossierId: dossierActif.id, imageId: imageId})
    }

    return (
        <> 
    <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)] mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
            MES LISTES DE PHOTOS
            </h2>

        { client ?
            <div>
                <div  className="flex flex-col">
                    <button 
                        onClick={handleLogout}
                        className="w-full h-10 md:h-20 text-xs rounded-xl flex items-center justify-center lg:text-lg"
                        style={{
                        background: COLORS.boutonInterieurNonClique,
                        border: `2px solid ${ COLORS.boutonBordNonClique }`,
                        fontFamily: "Fredoka",
                        }}
                    > Déconnexion 
                    </button>
                    <div  className="flex">
                        {
                            dossierName !== DEFAULT_DOSSIER_NAME &&
                            <Modal modalTitle={"Modifier ce dossier"} handleClick={() => setOpenUpdate(true)} open={openUpdate} onClose={() => setOpenUpdate(false)}>
                                <DossierForm onSubmit={({ name }) => handleUpdateDossier(name)}/>
                            </Modal>   
                        }
                        <Modal modalTitle={"Créez un nouveau dossier"} handleClick={() => setOpenCreate(true)} open={openCreate} onClose={() => setOpenCreate(false)}>
                            <DossierForm onSubmit={(dossierData) => createDossierMutation.mutateAsync(dossierData.name)}/>
                        </Modal>    
                        {
                            dossierName !== DEFAULT_DOSSIER_NAME &&
                            <Modal modalTitle={"Supprimer ce dossier"} handleClick={() => setOpenDelete(true)} open={openDelete} onClose={() => setOpenDelete(false)}>
                                <ConfirmationSuppressionCard onDelete={() => handleDeleteDossier()}/>
                            </Modal>  
                        }
                    </div>
                    {
                        isPendingDossiers ? 
                        <LoadingCard/> //Change la classeSize pour avoir un truc plus petit
                        :
                        <div  className="flex justify-center">
                            { dossiers.length > 0 && <Select options={optionDossiers} selected={dossierName} setSelected={setDossierName} title="Sélectionnez votre dossier"/> }
                        </div>
                    }

                </div>
                {
                    dossierName !== DEFAULT_DOSSIER_NAME && 
                    <div>
                        <ImageForm onSubmit={({image}) => handleCreateImage(image)}/>
                            {isPendingImages ? 
                            <LoadingCard/>
                            :
                            images.map((image) => (
                                <ImageListeCard image={image} onDelete={() => handleDeleteImage(image.id)}/>
                            ))}
                    </div>
                }
            </div>
            :
            <div className="flex flex-col gap-4">
                <section
                    className="mx-auto w-full max-w-2xl rounded-xl p-4 text-sm md:text-base"
                    style={{
                    color: COLORS.textDark,
                    border: `2px solid ${COLORS.boutonBordNonClique}`,
                    fontFamily: 'Fredoka',
                    }}
                >
                    <p>
                    Cette section vous permet de prendre en photo des articles du magasin et
                    de les conserver. Il vous suffit de saisir votre numéro de téléphone pour
                    accéder à votre espace.
                    </p>

                    <ul className="mt-3 list-disc pl-5">
                    <li>Vous pouvez créer jusqu'à 5 dossiers par numéro de téléphone.</li>
                    <li>Chaque dossier peut contenir jusqu'à 10 photos.</li>
                    </ul>

                    <p className="mt-3 font-semibold text-red-600">
                    Attention : cet espace n'est pas sécurisé. N'y déposez aucune photo à
                    caractère personnel (personnes, documents, pièces d'identité, etc.).
                    </p>
                </section>
                <ListeForm onSubmit={handleLogin}/>           
            </div>    
        }
        </section>
        </>
    );
}