import { ReqData, CookiesData } from "@/lib/cd_consts.ts";

export const FETCH_API: string = import.meta.env.VITE_BASE_URL || "";
export const FETCH_LAST10: string = import.meta.env.VITE_BASE_URL_LAST10 || "";

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
