"use client";

import ListImages from "@/components/ui/ListImages";
import { fetchAllMovies } from "@/lib/api/movie.api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "@/store/loadingSlice";
import { MovieAttrs } from "@/lib/constant/type";
import errorHandler from "@/lib/utils/errorHandler";
import { getImageUrls } from "@/lib/api/image.api";

export default function ListAllMovie() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openLoading());
    async function fetchData() {
      try {
        const movies = await fetchAllMovies();
        const paths = movies.map((movie: MovieAttrs) => movie.image_url);
        const response = await getImageUrls({
          bucket: "posters",
          paths,
        });
        const signedUrls = response.map((data) => data.signedUrl);
        setImageUrls(signedUrls);
      } catch (error) {
        errorHandler(error, dispatch);
      } finally {
        dispatch(closeLoading());
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <>
      <h3>Top searches</h3>
      <ListImages imageUrls={imageUrls} />
    </>
  );
}
