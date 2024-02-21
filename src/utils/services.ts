import axios from "axios";
export const baseUrl = "http://localhost:3000/api";
type ErrorMessages = {
  message: string;
};

type PostResponse<V> =
  | {
      data: V;
    }
  | ErrorMessages;
export const postRequest = async <T, V>(
  url: string,
  body: T
): Promise<PostResponse<V>> => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post<PostResponse<V>>(
      url,
      JSON.stringify(body),
      headers
    );
    if ("message" in response.data) {
      console.log(response.data.message);
    }

    return { data: response.data as V };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      console.log("unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getRequest = async <T>(url: string): Promise<T> => {
  try {
    const { data } = await axios.get<T>(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
