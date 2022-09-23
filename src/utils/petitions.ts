import fetch, {
    Blob,
    Headers,
    Request,
    RequestInit,
    Response,
    FetchError,
    RequestInfo,
  } from "node-fetch";
  
  export const Get = async (endPoint: RequestInfo) => {
    const res = await fetch(endPoint);
  
    return await res.json();
}

export const Post = async (endPoint: RequestInfo, body: any) => {
    const res = await fetch(endPoint, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    return await res.json();
}
