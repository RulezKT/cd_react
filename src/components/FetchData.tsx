import { ReqData, CookiesData } from "@/lib/cd_consts";
import axios from "axios";

export const FETCH_API = "http://127.0.0.1:3000/api";
export const FETCH_COOKIES = "http://127.0.0.1:3000/api/cookies";

export async function fetchData(
  reqData: ReqData | CookiesData,
  api: string = FETCH_API
) {
  const { data } = await axios.post(
    api,
    {
      ...reqData,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Accept: "*/*",
      },
    }
  );

  return data;
}
