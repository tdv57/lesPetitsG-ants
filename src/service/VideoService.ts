import { createClient } from "@supabase/supabase-js";

export type VideoSelectType = {
    id: number,
    description: string,
    age: string, 
    url: string
}

export type VideoCreateType = {
    description: string,
    age: string,
    video: File
}

const PROJECT_URL = "https://xvkdlrgihgdvsaswwzbb.supabase.co";
const API_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2RscmdpaGdkdnNhc3d3emJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxNTk1MzEsImV4cCI6MjA5OTczNTUzMX0.oWIS3Kpte-unPK0JgBx06c15TxolY7sXVSiGTrQmxL8";
export const BUCKET_URL = "https://xvkdlrgihgdvsaswwzbb.supabase.co/storage/v1/object/public/lesPetitsGeants";
export const TABLE_VIDEOS_DU_MOMENT = "lesPetitsGeants";
export const TABLE_ARTICLE_DE_LA_SAISON = "lesPetitsGeantsArticleDeLaSaison";
export const BUCKET_NAME = "lesPetitsGeants"
export const supabase = supabasePublicConnection();


export function supabasePublicConnection() {
  return createClient(PROJECT_URL, API_PUBLIC_KEY);
}


export async function getSupabaseArticleDeLaSaison() : Promise<VideoSelectType | null>{
    const {data, error} = await supabase.from(TABLE_ARTICLE_DE_LA_SAISON).select();
    if (error ) {
        return null;
    }
    if (data.length > 0) {
        const articleDeLaSaison = data[0];
        console.log("getArticleDeLaSaison : ", articleDeLaSaison)
        const {data: urlData} = await supabase.storage.from(BUCKET_NAME).getPublicUrl(articleDeLaSaison.video_url);
        return {
            url: urlData.publicUrl, 
            description: articleDeLaSaison.description,
            age: articleDeLaSaison.age,
            id: articleDeLaSaison.id
        }
    }
    return null;

}


export async  function getVideoArticleDeLaSaison() {
    const d = await getSupabaseArticleDeLaSaison();
    if (!d) return null;
    
    return {
        src: d.url,
        titre: d.description,
        age: d.age
    };
}

export async function getSupabaseVideosDuMoment() : Promise<VideoSelectType[] | null>{
    const {data, error} = await supabase.from(TABLE_VIDEOS_DU_MOMENT).select();
    if (error ) {
        return null;
    }    
    return data.map((d) => {
        return {
            url: supabase.storage.from(BUCKET_NAME).getPublicUrl(d.video_url).data.publicUrl,
            description: d.description,
            age: d.age,
            id: d.id
        };
    })
}

export async function getVideosDuMoment() {
    let res =  await getSupabaseVideosDuMoment();
    if (!res) res=[];

    return res.map((d) => {
        return {
            src: d.url,
            titre: d.description,
            age: d.age
        }
    });
}