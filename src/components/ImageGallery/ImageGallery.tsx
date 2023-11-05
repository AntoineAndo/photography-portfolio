import React, { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import CategoryPill from "../CategoryPill/CategoryPill";
import "./ImageGallery.scss";
import useSWR from "swr";
import fetch from "unfetch";
import { createClient } from "@sanity/client";
import { navigate } from "astro:transitions/client";

function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const [clickedImage, setClickedImage] = useState<string>();

  const [numberColumns, setNumberColumns] = useState<number>(1);

  const client = createClient({
    apiVersion: "2023-02-08",
    dataset: "production",
    projectId: "bgp3zmck",
    token: import.meta.env?.PUBLIC_SANITY_TOKEN,
  });

  // List all the categories
  const queryCategories = async () => {
    let r = await client.fetch(`*[_type == 'category']`);

    return r;
  };

  // Get all the images for a given category
  const queryImages = async () => {
    let r = await client.fetch(
      `*[_type == 'imageContent']{
      title,
      "slug": slug.current,
      "imageUrl": imageField.asset->url,
      categories[]->
    }`
    );

    if (selectedCategory) {
      r = r.filter((i: any) => {
        // If the photo is not associated with a category, it is filtered out
        if (!i.categories) {
          return false;
        }

        return (
          i.categories?.find((c: any) => c.title == selectedCategory) !=
          undefined
        );
      });
    }

    return r;
  };

  const {
    data: images,
    error,
    isLoading,
  }: any = useSWR(selectedCategory ?? "all", queryImages);

  const {
    data: categories,
    errorCategories,
    isLoadingCategories,
  }: any = useSWR("categories", queryCategories, {
    fallbackData: [],
  });

  // Window resize listener
  useEffect(() => {
    const initialColumnNumber =
      window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;
    setNumberColumns(initialColumnNumber);

    const handleResize = (e: any) => {
      const newColNb =
        window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;

      setNumberColumns(newColNb);
    };
    return window.addEventListener("resize", handleResize);
  }, []);

  if (error) {
    return <span>Something went wrong...</span>;
  }

  const categoryClick = (e: any) => {
    const value: string = e.target.value;
    setSelectedCategory(value != "x" ? value : undefined);
  };

  useEffect(() => {
    if (!clickedImage) {
      return;
    }
    //@ts-ignore
    navigate(`/image/${clickedImage}`);
  }, [clickedImage]);

  const renderColumns = useCallback(() => {
    const cols = [];
    for (let j = 0; j < numberColumns; j++) {
      cols.push(
        <div className="col">
          {images?.map(({ title, imageUrl, slug }: any, i: number) => {
            if (i % numberColumns == j) {
              return (
                <a href={`/image/${slug}`} rel="prefetch">
                  <img
                    src={`${imageUrl}?w=1000`}
                    alt={title}
                    loading="lazy"
                    className={clickedImage == slug ? "clicked" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      setClickedImage(slug);
                    }}
                  />
                </a>
              );
            }
          })}
        </div>
      );
    }

    return cols;
  }, [images, numberColumns, clickedImage]);

  // const renderColumns = () => {
  // };

  return (
    <>
      <div className="categories">
        {/* Loop over all categories */}
        {isLoadingCategories ? (
          <div></div>
        ) : (
          categories.map(({ title }: any) => {
            return <CategoryPill name={title} onClick={categoryClick} />;
          })
        )}

        {/* If a category is selected, show the button to reset */}
        {selectedCategory && (
          <CategoryPill name={"x"} onClick={categoryClick} />
        )}
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="grid">{renderColumns()}</div>
      )}
    </>
  );
}

export default ImageGallery;
