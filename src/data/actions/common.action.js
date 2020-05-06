import {
    ALL_CATEGORIES_GET,
} from '../../data/constants/index';

import API from '../fetch/index';


 export const fetchAllCategories = () => { //funckcja ktora zwraca funkcje

    const promise = API.common.fetchAllCategories();
    return{ //wysylamy type oraz promise
        type: ALL_CATEGORIES_GET,
        promise
    }
}
