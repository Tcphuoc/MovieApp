import { ErrorResponse } from "../models/Error";

const HOST = process.env.NEXT_PUBLIC_API_URL;

async function POST<T, R>({ endpoint, payload } : {endpoint: string, payload: T}) : Promise<R> {
  const response = await fetch(`${HOST}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  })

  if (response.status !== 200) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.error_message);
  }

  const resultData: R = await response.json();
  return resultData;
}

export { POST };
