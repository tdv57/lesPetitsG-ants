import { ListeClient, listeClientInstance } from "../client/ListeClient";


export async function login(phone: string) {
    ListeClient.getInstance(phone);
}

export async function logout() {
    listeClientInstance?.logout();
}

export async function findAllDossier() {
    if(listeClientInstance) {
        return listeClientInstance.findAllDossier();
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}

export async function createDossier(name: string) {
    if(listeClientInstance) {
        return listeClientInstance.createDossier(name);
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}

export async function updateDossier(name: string, id: number) {
    if(listeClientInstance) {
        return listeClientInstance.updateDossier(name, id);
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}

export async function deleteDossier(id: number) {
    if(listeClientInstance) {
        return listeClientInstance.deleteDossier(id);
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}

export async function findAllImageByDossier(dossierId: number) {
    if(listeClientInstance) {
        return listeClientInstance.findAllImageByDossier(dossierId);
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}

export async function createImage(dossierId: number, image: File) {
    if(listeClientInstance) {
        return listeClientInstance.createImage(dossierId, image);
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}

export async function deleteImage(dossierId: number, imageId: number) {
    if(listeClientInstance) {
        return listeClientInstance.deleteImage(dossierId, imageId);
    } else {
        console.warn("listeClientInstance non instancié");
        return [];
    }
}