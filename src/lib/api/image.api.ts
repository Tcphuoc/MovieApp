import { ERROR_MSG } from "../constant/error";
import { supabaseClient } from "../utils/supabase";

async function getImageUrl({ bucket, path }: { bucket: string; path: string }) {
  const response = await supabaseClient?.storage
    .from(bucket)
    .createSignedUrl(path, 60);
  if (!response) throw new Error(ERROR_MSG.no_response);

  const { data } = response;
  if (!data) throw new Error("image");

  return data;
}

async function getImageUrls({
  bucket,
  paths,
}: {
  bucket: string;
  paths: string[];
}) {
  const response = await supabaseClient?.storage
    .from(bucket)
    .createSignedUrls(paths, 60);
  if (!response) throw new Error(ERROR_MSG.no_response);

  const { data } = response;
  if (!data) throw new Error("image");

  return data;
}

export { getImageUrl, getImageUrls };
