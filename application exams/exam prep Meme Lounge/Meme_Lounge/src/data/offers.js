import { get, post, put, del } from "./api.js";

const endpoints = {
catalog: '/data/memes?sortBy=_createdOn%20desc',
byId: '/data/memes/'
}
export async function getAllOffers(){
return get(endpoints.catalog)
}

export async function getById(id){
return get(endpoints.byId + id);
}

export async function createOffer(data){
    return post(endpoints.catalog, data);
}

export async function updateOffer(id, data){
    return put(endpoints.byId + id, data);
}

export async function deleteOffer(id){
    return del(endpoints.byId + id);
}