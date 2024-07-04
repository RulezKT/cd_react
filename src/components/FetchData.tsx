import { ReqData, CookiesData, CDinfo } from "@/lib/cd_consts.ts";
import { useCdInfo, UseCdInfo } from "./cdInfo";


export const FETCH_API: string = import.meta.env.VITE_BASE_URL || "";
export const FETCH_LAST10: string = import.meta.env.VITE_BASE_URL_LAST10 || "";
export const FETCH_PREV: string = import.meta.env.VITE_BASE_URL_FETCH_PREV || "";
export const FETCH_NEXT: string = import.meta.env.VITE_BASE_URL_FETCH_NEXT || "";

export async function fetchData(
  reqData: ReqData | CookiesData,
  api: string = "base"
) {
  // console.log("FETCH_API", FETCH_API);
  // console.log("fetchData", reqData);


  // console.log("api", api);

  const url = api === "base" ? FETCH_API : FETCH_LAST10;
  // const url = api === "base" ? "/api" : "/api/last10";

  // console.log("url", url);

  // if (api !== "base") {
  //   console.log("fetchData", reqData);
  // }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(reqData),
  });

  return await response.json();
}


export async function fetchPrevNextNutr(reqData: CDinfo, direction: string) {


  const url = direction === "next" ? FETCH_NEXT : FETCH_PREV;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(reqData),
  });

  return await response.json();
}