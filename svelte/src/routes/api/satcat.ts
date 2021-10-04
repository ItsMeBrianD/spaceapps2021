import type {Request, Response} from "@sveltejs/kit";
import {supabase} from "$lib/utils/supabase";

export const get = async ({query}: Request): Promise<Response> => {
    try {
        const id = parseInt(query.get("catId"));
    
        const {data, error} = await supabase.from("SatCat").select("*")
            .eq("NORAD_CAT_ID", id);
                
        if (data.length === 0) {
            return {
                status: 404,
                body: "Not Found",
                headers: {},
            };
        }
        if (error) {
            return {
                status: 500,
                headers: {},
            };
        }
        return {
            status: 200,
            body: data[0],
            headers: {},
        };
    } catch (e) {
        return {
            status: 400,
            headers: {},
        };
    }


};
