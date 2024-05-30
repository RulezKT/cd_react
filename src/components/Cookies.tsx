import Cookies from "js-cookie";

async function getCookies() {
  const cookies = Cookies.get("last10");
  // console.log(cookies);
  const json = JSON.parse(cookies);
  // console.log(json);
  // setLast10(json);

  // console.log(`getCookies ${json.length}`);
  const { data } = await axios.post(
    "http://127.0.0.1:3000/api/cookies",
    {
      cookies: json,
    },
    {
      headers: {
        "Content-Type": "application/json",

        Accept: "*/*",
      },
    }
  );

  setLast10(data);
}

// =======================================

Cookies.set("last10", JSON.stringify(json));
