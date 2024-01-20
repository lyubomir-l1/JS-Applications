import { get } from "./api.js";

const endPoints = {
    'all': '/data/members'
}

export async function getParts(){
    return get(endPoints.all);

}