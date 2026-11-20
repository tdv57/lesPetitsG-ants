
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
import { LightBoxCard } from "../card/LightBoxCard";
import { ListeClient } from "../../client/ListeClient";

export function Liste() {
    const DEFAULT_DOSSIER_NAME = "Cliquez";
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [dossierName, setDossierName] = useState<string>(DEFAULT_DOSSIER_NAME);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
                (old = []) => old.filter((dossier) => {
                    if (dossier.id !== id) {
                        return true;
                    } else {
                        if (dossier.name === dossierName) setDossierName(DEFAULT_DOSSIER_NAME);
                        return false;
                    }
                })
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
    }

    const handleUpdateDossier = async (name: string) => {
        const existingDossier = dossiers.find(d => d.name == name);
        if (existingDossier) {
            throw new Error("Un de vos dossiers possède déjà ce nom")
        }
        const dossier = dossiers.find(d => d.name === dossierName);
        if (!dossier) return ;
        await updateDossierMutation.mutateAsync({ name: name, id: dossier.id });
    }

    const handleCreateDossier = async (name: string) => {
        const existingDossier = dossiers.find(d => d.name == name);
        if (existingDossier) {
            throw new Error("Un de vos dossiers possède déjà ce nom")
        }
        await createDossierMutation.mutateAsync(name)
    }
    const handleCreateImage = async (image : File) => {
        if (!dossierActif) return;
        await createImageMutation.mutateAsync({ dossierId: dossierActif.id, image })
    }

    const handleDeleteImage = (imageId: number) => {
        if(!dossierActif) return;
        deleteImageMutation.mutateAsync({dossierId: dossierActif.id, imageId: imageId})
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
            <div className="flex flex-col items-center gap-6 w-full max-w-5xl px-4">
                <div  className="flex flex-col items-center gap-4 w-full">
                    <button
                        onClick={handleLogout}
                        className="w-full max-w-xs md:w-44 md:max-w-none h-10 px-4 rounded-xl text-sm lg:text-base whitespace-nowrap flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
                        style={{
                        background: COLORS.boutonInterieurNonClique,
                        border: `2px solid ${ COLORS.boutonBordNonClique }`,
                        fontFamily: "Fredoka",
                        }}
                    > Déconnexion 
                    </button>
                    <div  className="flex flex-col items-center w-full gap-3 md:grid md:grid-flow-col md:auto-cols-[11rem] md:w-auto">
                        {
                            dossierName !== DEFAULT_DOSSIER_NAME &&
                            <Modal buttonClassName="order-2 w-full max-w-xs md:order-1 md:w-full md:max-w-none" modalTitle={<><span className="md:hidden">Modifier le dossier</span><span className="hidden md:inline">Modifier</span></>} handleClick={() => setOpenUpdate(true)} open={openUpdate} onClose={() => setOpenUpdate(false)}>
                                <DossierForm onSubmit={({ name }) => handleUpdateDossier(name)}/>
                            </Modal>
                        }
                        <Modal buttonClassName="order-1 w-full max-w-xs md:order-2 md:w-full md:max-w-none" modalTitle={"Nouveau dossier"} handleClick={() => setOpenCreate(true)} open={openCreate} onClose={() => setOpenCreate(false)}>
                            <DossierForm onSubmit={(dossierData) => handleCreateDossier(dossierData.name)}/>
                        </Modal>
                        {
                            dossierName !== DEFAULT_DOSSIER_NAME &&
                            <Modal buttonClassName="order-3 w-full max-w-xs md:w-full md:max-w-none" modalTitle={<><span className="md:hidden">Supprimer le dossier</span><span className="hidden md:inline">Supprimer</span></>} handleClick={() => { deleteDossierMutation.reset(); setOpenDelete(true);}} open={openDelete} onClose={() => { deleteDossierMutation.reset(); setOpenDelete(false);}}>
                                <ConfirmationSuppressionCard onDelete={() => handleDeleteDossier()} error={deleteDossierMutation.error?.message}/>
                            </Modal>  
                        }
                    </div>
                    {
                        isPendingDossiers ?
                        <LoadingCard compact sizeClassName="w-20 h-20 md:w-24 md:h-24"/>
                        :
                        <div  className="flex justify-center w-full">
                            { dossiers.length > 0 && <Select className="w-full max-w-xs md:w-40 md:max-w-none" options={optionDossiers} selected={dossierName} setSelected={(name: string) => { setDossierName(name); setLightboxIndex(null); }} title="Choisir mon dossier ▼"/> }
                        </div>
                    }
                </div>
                {
                    dossierName !== DEFAULT_DOSSIER_NAME && 
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="w-full max-w-xl">
                            <ImageForm onSubmit={({image}) => handleCreateImage(image)}/>
                        </div>
                        {isPendingImages ?
                        <LoadingCard/>
                        :
                        <>
                            { images.length > 0 && 
                            <p                      
                                className="w-full max-w-xl px-8 mb-1 text-xs lg:text-xl text-center"
                                style={{ fontFamily: "Fredoka", color: COLORS.primary }}
                            >
                            Cliquez sur une image pour l'afficher en grand. 
                            Vous pourrez ensuite naviguer entre vos images à l'aide des flèches 
                            à gauche et à droite.                            
                            </p>
                            }
                            <div className="flex flex-wrap justify-center gap-6 pb-8">

                                {images.map((image, i) => (
                                    <ImageListeCard 
                                        key={image.id} 
                                        image={image} 
                                        onOpen={() => setLightboxIndex(i)}
                                        onDelete={() => handleDeleteImage(image.id)}/>
                                ))}
                            </div>
                        </>
                        }
                        {lightboxIndex !== null && images[lightboxIndex] && (
                            <LightBoxCard
                                srcs={images.map((img) => ListeClient.R2_BUCKET_LISTE + "/" + img.code)}
                                index={lightboxIndex}
                                onClose={() => setLightboxIndex(null)}
                                onChange={setLightboxIndex}
                            />
                        )}
                        
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