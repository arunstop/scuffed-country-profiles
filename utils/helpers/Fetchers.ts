// export const apiFetch = async <T>(url: string): Promise<T> => {
//   return fetch(url, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     // mode: "no-cors",
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json() as Promise<T>;
//     })
//     .then((dataRaw) => dataRaw)
//     .catch((error: Error) => {
//       console.log(error);
//       throw error;
//     });
// };

export const apiFetch = async (url: string): Promise<Response> => {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    // mode: "no-cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response;
    })
    .then((successResponse) => successResponse)
    .catch((error) => {
      // console.log("--------" + error);
      // throw error;
      return error;
    });
};

export const apiFetchNoCors = async <T>(url: string): Promise<T> => {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    // mode: "no-cors",
  })
    .then((response) => {
      // console.log(response.clone().json());
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .then((dataRaw) => dataRaw)
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
};

export const lowerCaseChildrenFetch = (arr: string[]): string[] =>
  JSON.parse(JSON.stringify(arr).toLowerCase());
