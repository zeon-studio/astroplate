import searchData from ".json/search.json";
import config from "@/config/config.json";
import React, { useEffect, useRef, useState } from "react";
import SearchResult, { type ISearchItem } from "./SearchResult";

const { default_language } = config.settings;

const SearchModal = ({
  lang,
  searchPlaceholder = "Search...",
  searchEmpty = "Type something to search...",
  searchResultsLabel = "results",
  searchSecondsLabel = "seconds",
  searchNavigateLabel = "to navigate",
  searchSelectLabel = "to select",
  searchCloseLabel = "to close",
}: {
  lang?: string;
  searchPlaceholder?: string;
  searchEmpty?: string;
  searchResultsLabel?: string;
  searchSecondsLabel?: string;
  searchNavigateLabel?: string;
  searchSelectLabel?: string;
  searchCloseLabel?: string;
}) => {
  const activeLang = lang || default_language;
  const [searchString, setSearchString] = useState("");
  const selectedIndexRef = useRef(-1);

  // handle input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.currentTarget.value.replace("\\", "").toLowerCase());
  };

  // generate search result
  const doSearch = (searchData: ISearchItem[]) => {
    const regex = new RegExp(`${searchString}`, "gi");
    if (searchString === "") {
      return [];
    } else {
      const searchResult = searchData.filter((item) => {
        const title = item.frontmatter.title.toLowerCase().match(regex);
        const description = item.frontmatter.description
          ?.toLowerCase()
          .match(regex);
        const categories = item.frontmatter.categories
          ?.join(" ")
          .toLowerCase()
          .match(regex);
        const tags = item.frontmatter.tags
          ?.join(" ")
          .toLowerCase()
          .match(regex);
        const content = item.content.toLowerCase().match(regex);

        if (title || content || description || categories || tags) {
          return item;
        }
      });
      return searchResult;
    }
  };

  // get search result
  const typedSearchData = searchData as unknown as ISearchItem[];
  const filterSearchData = typedSearchData.filter(
    (item) => item.lang === activeLang,
  );
  const startTime = performance.now();
  const searchResult = doSearch(filterSearchData);
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  const getSearchResultItems = () =>
    Array.from(document.querySelectorAll<HTMLElement>("#searchItem"));

  const updateSelection = () => {
    const searchResultItems = getSearchResultItems();

    searchResultItems.forEach((item, index) => {
      if (index === selectedIndexRef.current) {
        item.classList.add("search-result-item-active");
      } else {
        item.classList.remove("search-result-item-active");
      }
    });

    searchResultItems[selectedIndexRef.current]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    selectedIndexRef.current = -1;
    updateSelection();
  }, [searchString, activeLang]);

  // search dom manipulation
  useEffect(() => {
    const searchModal = document.getElementById("searchModal");
    const searchInput = document.getElementById("searchInput");
    const searchModalOverlay = document.getElementById("searchModalOverlay");
    const searchModalTriggers = document.querySelectorAll(
      "[data-search-trigger]",
    );

    if (!searchModal || !searchInput || !searchModalOverlay) {
      return;
    }

    const openModal = () => {
      searchModal.classList.add("show");
      searchInput.focus();
      selectedIndexRef.current = -1;
      updateSelection();
    };

    const closeModal = () => {
      searchModal.classList.remove("show");
      selectedIndexRef.current = -1;
      updateSelection();
    };

    const handleTriggerClick = () => {
      openModal();
    };

    const handleOverlayClick = () => {
      closeModal();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        openModal();
        return;
      }

      if (!searchModal.classList.contains("show")) {
        return;
      }

      if (event.key === "Escape") {
        closeModal();
        return;
      }

      const searchResultItems = getSearchResultItems();

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }

      if (event.key === "ArrowUp" && selectedIndexRef.current > 0) {
        selectedIndexRef.current--;
      } else if (
        event.key === "ArrowDown" &&
        selectedIndexRef.current < searchResultItems.length - 1
      ) {
        selectedIndexRef.current++;
      } else if (event.key === "Enter") {
        const activeLink = document.querySelector(
          ".search-result-item-active a",
        ) as HTMLAnchorElement;
        if (activeLink) {
          activeLink?.click();
        }
      }

      updateSelection();
    };

    searchModalTriggers.forEach((button) => {
      button.addEventListener("click", handleTriggerClick);
    });
    searchModalOverlay.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      searchModalTriggers.forEach((button) => {
        button.removeEventListener("click", handleTriggerClick);
      });
      searchModalOverlay.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div id="searchModal" className="search-modal">
      <div id="searchModalOverlay" className="search-modal-overlay" />
      <div className="search-wrapper">
        <div className="search-wrapper-header">
          <label
            htmlFor="searchInput"
            className="absolute left-7 top-[calc(50%-7px)]"
          >
            <span className="sr-only">search icon</span>
            {searchString ? (
              <svg
                onClick={() => setSearchString("")}
                viewBox="0 0 512 512"
                height="18"
                width="18"
                className="hover:text-red-500 cursor-pointer -mt-0.5"
              >
                <title>close icon</title>
                <path
                  fill="currentcolor"
                  d="M256 512A256 256 0 10256 0a256 256 0 100 512zM175 175c9.4-9.4 24.6-9.4 33.9.0l47 47 47-47c9.4-9.4 24.6-9.4 33.9.0s9.4 24.6.0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6.0 33.9s-24.6 9.4-33.9.0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9.0s-9.4-24.6.0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6.0-33.9z"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 512 512"
                height="18"
                width="18"
                className="-mt-0.5"
              >
                <title>search icon</title>
                <path
                  fill="currentcolor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8.0 45.3s-32.8 12.5-45.3.0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9.0 208S93.1.0 208 0 416 93.1 416 208zM208 352a144 144 0 100-288 144 144 0 100 288z"
                ></path>
              </svg>
            )}
          </label>
          <input
            id="searchInput"
            placeholder={searchPlaceholder}
            className="search-wrapper-header-input"
            type="input"
            name="search"
            value={searchString}
            onChange={handleSearch}
            autoComplete="off"
          />
        </div>
        <SearchResult
          searchResult={searchResult}
          searchString={searchString}
          lang={activeLang}
          searchEmpty={searchEmpty}
        />
        <div className="search-wrapper-footer">
          <span className="flex items-center">
            <kbd>
              <svg
                width="14"
                height="14"
                fill="currentcolor"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 011.506.0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 01-.753-1.659z"></path>
              </svg>
            </kbd>
            <kbd>
              <svg
                width="14"
                height="14"
                fill="currentcolor"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 001.506.0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z"></path>
              </svg>
            </kbd>
            {searchNavigateLabel}
          </span>
          <span className="flex items-center">
            <kbd>
              <svg
                width="12"
                height="12"
                fill="currentcolor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M14.5 1.5a.5.5.0 01.5.5v4.8a2.5 2.5.0 01-2.5 2.5H2.707l3.347 3.346a.5.5.0 01-.708.708l-4.2-4.2a.5.5.0 010-.708l4-4a.5.5.0 11.708.708L2.707 8.3H12.5A1.5 1.5.0 0014 6.8V2a.5.5.0 01.5-.5z"
                ></path>
              </svg>
            </kbd>
            {searchSelectLabel}
          </span>
          {searchString && (
            <span>
              <strong>{searchResult.length} </strong> {searchResultsLabel} - in{" "}
              <strong>{totalTime} </strong> {searchSecondsLabel}
            </span>
          )}
          <span>
            <kbd>ESC</kbd> {searchCloseLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
