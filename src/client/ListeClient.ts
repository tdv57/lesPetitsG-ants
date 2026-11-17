import type { DossierListeSelectType, ImageListeSelectType } from "../types/ListeType";

export let listeClientInstance: ListeClient | null = null;

export class ListeClient {
    private static instance: ListeClient | null = null;

    private constructor(phone: string) {
        this.phone = phone;

    }

    public static getInstance(phone: string): ListeClient {
        (ListeClient.instance ??= new ListeClient(phone));
        listeClientInstance = ListeClient.instance;
        return listeClientInstance;
    }

    public static readonly D1_ANNONCE_URL =
        'https://les-petits-geants-annonce-worker.ferdinand-axia.workers.dev';
    public static readonly R2_BUCKET_LISTE = "https://pub-f6f8cf20f7c34d58b6d22a5fdff9937f.r2.dev"
    private static readonly EXPIRY_MARGIN_MS = 60_000;

    private token: string | null = null;
    private expiresAt = 0;
    private loginPromise: Promise<void> | null = null;
    private phone: string;

    private isTokenValid(): boolean {
        return this.token !== null && Date.now() < this.expiresAt - ListeClient.EXPIRY_MARGIN_MS;
    }

    public async getToken(): Promise<string> {
        if (this.isTokenValid()) return this.token!;

        this.loginPromise ??= this.login().finally(() => {
            this.loginPromise = null;
        });

        await this.loginPromise;
        return this.token!;
    }

    private async login(): Promise<void> {
        const res = await fetch(`${ListeClient.D1_ANNONCE_URL}/liste/login`, {
            method: 'POST',
            body: JSON.stringify({ phone: this.phone }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
            console.error(`Login échoué ${res.status}`);
            this.logout();
        }
        const { token } = await res.json();
        if (!token) console.error(`Token de login absent de la réponse`);
        this.token = token;
        this.expiresAt = ListeClient.readExp(token);
    }

    private static readExp(jwt: string): number {
        const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload.exp * 1000;
    }

    public logout(): void {
        this.token = null;
        this.phone = '';
        this.expiresAt = 0;
        ListeClient.instance = null; 
        listeClientInstance = null;
    }

    private async request(path: string, init: RequestInit = {}): Promise<Response> {
        await this.getToken();
        const res = await fetch(`${ListeClient.D1_ANNONCE_URL}${path}`, {
            ...init,
            headers: { ...init.headers,  Authorization: `Bearer ${this.token}` },
        });
        return res;
    }

    public async findAllDossier(): Promise<DossierListeSelectType[]> {
        const res = await this.request('/liste/dossier', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            console.warn(`findAllDossier a raté ${res.status}`);
            return [];
        }
        return res.json();
    }

    public async createDossier(name: string): Promise<DossierListeSelectType> {
        const res = await this.request('/liste/dossier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name 
            })
        });
        if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(body?.error ?? `Erreur, vos actions n'a pas été validé`);
        }
        return res.json();        
    }

    public async updateDossier(name: string, id: number): Promise<DossierListeSelectType | null> {
        const res = await this.request(`/liste/dossier/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name 
            })
        });
        if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(body?.error ?? `Erreur, vos actions n'a pas été validé`);
        }
        return res.json();        
    }

    public async deleteDossier(id: number): Promise<void> {
        const res = await this.request(`/liste/dossier/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }, 
        });
        if(!res.ok) {
            console.warn(`deleteDossier a raté ${res.status}`);
        }
    }

    public async findAllImageByDossier(dossierId: number): Promise<ImageListeSelectType[]> {
        const res = await this.request(`/liste/dossier/${dossierId}/image`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            console.warn(`findAllImageByDossier a raté ${res.status}`);
            return [];
        }
        return res.json();
    }

    public async createImage(dossierId: number, image: File): Promise<ImageListeSelectType | null > {
        const formData = new FormData();
        formData.append('image', image);
        const res = await this.request(`/liste/dossier/${dossierId}/image`, {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            console.warn(`createImage a raté ${res.status}`);
            return null;
        }
        return res.json();      
    }

    public async deleteImage(dossierId: number, imageId: number): Promise<void > {
        const res = await this.request(`/liste/dossier/${dossierId}/image/${imageId}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            console.warn(`deleteImage a raté ${res.status}`);
        }
    }
}