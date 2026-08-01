import { createClient } from "@supabase/supabase-js";

export type VideoSelectType = {
    id: number,
    description: string,
    age: string, 
    url: string
    created_at : string,
}

const PROJECT_URL = "https://xvkdlrgihgdvsaswwzbb.supabase.co";
const API_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2RscmdpaGdkdnNhc3d3emJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxNTk1MzEsImV4cCI6MjA5OTczNTUzMX0.oWIS3Kpte-unPK0JgBx06c15TxolY7sXVSiGTrQmxL8";
export const TABLE_IMAGE = "lesPetitsGeantsImage";
export const TABLE_VIDEO= "lesPetitsGeantsVideo";
export const supabase = supabasePublicConnection();
export const ARTICLE_DE_LA_SAISON_CODE = "ArticleDeLaSaison";

export function supabasePublicConnection() {
  return createClient(PROJECT_URL, API_PUBLIC_KEY);
}


export async function getSupabaseArticleDeLaSaison() : Promise<VideoSelectType | null>{
    const {data, error} = await supabase.from(TABLE_VIDEO).select().eq("code", ARTICLE_DE_LA_SAISON_CODE);
    if (error ) {
        return null;
    }
    if (data.length > 0) {
        const articleDeLaSaison = data[0];
        console.log("getArticleDeLaSaison : ", articleDeLaSaison)
        return {
            url: articleDeLaSaison.url, 
            description: articleDeLaSaison.description,
            age: getAge(articleDeLaSaison.age,articleDeLaSaison.type_age),
            created_at: articleDeLaSaison.created_at,
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
    const {data, error} = await supabase.from(TABLE_VIDEO).select();
    if (error ) {
        return null;
    }    
    return data.filter((d) => d.code != ARTICLE_DE_LA_SAISON_CODE).map((d) => {
        return {
            url: d.url,
            description: d.description,
            age: getAge(d.age,d.type_age),
            created_at: d.created_at,
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

function getAge(age: number, type_age: "ANS" | "MOIS") : string {
    if( !age || age < 0 || !type_age || (type_age !== "ANS" && type_age !== "MOIS")) {
        return "";
    }
    console.log("getAge : ", age, type_age);
    if (type_age === "ANS") {
        if (Number(age) === 1 || Number(age) === 0) {
            return "Dès " + age + " an";
        } else {
            return "Dès " + age + " ans";
        }
    }
    else if (type_age === "MOIS") {
        return "Dès " + age + " mois";
    }
    return ""; 
}