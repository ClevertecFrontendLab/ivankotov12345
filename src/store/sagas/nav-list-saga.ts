import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { NavListItemType } from "../../types/nav-list-type";
import { API_LIST } from "../api";
import { getNavListDataSuccess, getNavListDataFail } from "../slices/navigation-list-slice";


function* navigationListRequestWorker () {
    try {
        const { data }: AxiosResponse<NavListItemType[]> = yield call(axios.get, API_LIST.NAVIGATION_LIST_URL);
        yield put(getNavListDataSuccess(data))
    } catch {
        yield put(getNavListDataFail('Что-то пошло не так. Обновите страницу через некоторое время.'))
    }
}

export function* navigationListRequestWatcher () {
    yield takeLatest('navList/getNavListFetch', navigationListRequestWorker)
}