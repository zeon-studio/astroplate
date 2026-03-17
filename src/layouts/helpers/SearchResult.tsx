import { slugSelector } from "@/lib/utils/languageParser";
import { plainify, titleify } from "@/lib/utils/textConverter";
import React from "react";

export interface ISearchItem {
  lang: string;
  group: string;
  slug: string;
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    categories?: string[];
    tags?: string[];
  };
  content: string;
}

export interface ISearchGroup {
  group: string;
  groupItems: {
    slug: string;
    frontmatter: {
      title: string;
      image?: string;
      description?: string;
      categories?: string[];
      tags?: string[];
    };
    content: string;
  }[];
}

// search result component
const SearchResult = ({
  searchResult,
  searchString,
  lang,
}: {
  searchResult: ISearchItem[];
  searchString: string;
  lang: string;
}) => {
  // generate search result group
  const generateSearchGroup = (searchResult: ISearchItem[]) => {
    const joinDataByGroup: ISearchGroup[] = searchResult.reduce(
      (groupItems: ISearchGroup[], item: ISearchItem) => {
        const groupIndex = groupItems.findIndex(
          (group) => group.group === item.group,
        );
        if (groupIndex === -1) {
          groupItems.push({
            group: item.group,
            groupItems: [
              {
                frontmatter: { ...item.frontmatter },
                slug: item.slug,
                content: item.content,
              },
            ],
          });
        } else {
          groupItems[groupIndex].groupItems.push({
            frontmatter: { ...item.frontmatter },
            slug: item.slug,
            content: item.content,
          });
        }

        return groupItems;
      },
      [],
    );
    return joinDataByGroup;
  };
  const finalResult = generateSearchGroup(searchResult);

  // match marker
  const matchMarker = (text: string, substring: string) => {
    const parts = text.split(new RegExp(`(${substring})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === substring.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      ),
    );
  };

  // match underline
  const matchUnderline = (text: string, substring: string) => {
    const parts = text?.split(new RegExp(`(${substring})`, "gi"));
    return parts?.map((part, index) =>
      part.toLowerCase() === substring.toLowerCase() ? (
        <span key={index} className="underline">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  // match content
  const matchContent = (content: string, substring: string) => {
    const plainContent = plainify(content);
    const position = plainContent
      .toLowerCase()
      .indexOf(substring.toLowerCase());

    // Find the start of the word containing the substring
    let wordStart = position;
    while (wordStart > 0 && plainContent[wordStart - 1] !== " ") {
      wordStart--;
    }

    const matches = plainContent.substring(
      wordStart,
      substring.length + position,
    );
    const matchesAfter = plainContent.substring(
      substring.length + position,
      substring.length + position + 80,
    );
    return (
      <>
        {matchMarker(matches, substring)}
        {matchesAfter}
      </>
    );
  };

  return (
    <div className="search-wrapper-body">
      {searchString ? (
        <div className="search-result">
          {finalResult.length > 0 ? (
            finalResult.map((result) => (
              <div className="search-result-group" key={result.group}>
                <p className="search-result-group-title">
                  {titleify(result.group)}
                </p>

                {result.groupItems.map((item) => (
                  <div
                    key={item.slug}
                    id="searchItem"
                    className="search-result-item"
                  >
                    {item.frontmatter.image && (
                      <div className="search-result-item-image">
                        <img
                          src={item.frontmatter.image}
                          alt={item.frontmatter.title}
                          width={100}
                          height={100}
                        />
                      </div>
                    )}
                    <div className="search-result-item-body">
                      <a
                        href={`${slugSelector(item.slug, lang)}`}
                        className="search-result-item-title search-result-item-link"
                      >
                        {matchUnderline(item.frontmatter.title, searchString)}
                      </a>
                      {item.frontmatter.description && (
                        <p className="search-result-item-description">
                          {matchUnderline(
                            item.frontmatter.description,
                            searchString,
                          )}
                        </p>
                      )}
                      {item.content && (
                        <p className="search-result-item-content">
                          {matchContent(item.content, searchString)}
                        </p>
                      )}
                      <div className="search-result-item-taxonomies">
                        {item.frontmatter.categories && (
                          <div className="mr-2">
                            <svg
                              width="14"
                              height="14"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2zm2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1V3zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z"></path>
                            </svg>
                            {item.frontmatter.categories.map(
                              (category, index) => (
                                <span key={category}>
                                  {matchUnderline(category, searchString)}
                                  {item.frontmatter.categories &&
                                    index !==
                                      item.frontmatter.categories.length -
                                        1 && <>, </>}
                                </span>
                              ),
                            )}
                          </div>
                        )}
                        {item.frontmatter.tags && (
                          <div className="mr-2">
                            <svg
                              width="14"
                              height="14"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"></path>
                              <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"></path>
                            </svg>
                            {item.frontmatter.tags.map((tag, index) => (
                              <span key={tag}>
                                {matchUnderline(tag, searchString)}
                                {item.frontmatter.tags &&
                                  index !==
                                    item.frontmatter.tags.length - 1 && <>, </>}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="search-result-empty">
              <svg
                className="mx-auto"
                width="42"
                height="42"
                viewBox="0 0 47 47"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.10368 33.9625C9.90104 36.2184 13.2988 37.6547 16.9158 38.0692C21.6958 38.617 26.5063 37.3401 30.3853 34.4939C30.4731 34.6109 30.5668 34.7221 30.6721 34.8304L41.9815 46.1397C42.5323 46.6909 43.2795 47.0007 44.0587 47.001C44.838 47.0013 45.5854 46.692 46.1366 46.1412C46.6878 45.5904 46.9976 44.8432 46.9979 44.064C46.9981 43.2847 46.6888 42.5373 46.138 41.9861L34.8287 30.6767C34.7236 30.5704 34.6107 30.4752 34.4909 30.3859C37.3352 26.5046 38.6092 21.6924 38.0579 16.912C37.6355 13.2498 36.1657 9.81322 33.8586 6.9977L31.7805 9.09214C34.0157 11.9274 35.2487 15.4472 35.2487 19.0942C35.2487 21.2158 34.8308 23.3167 34.0189 25.2769C33.207 27.2371 32.0169 29.0181 30.5167 30.5184C29.0164 32.0186 27.2354 33.2087 25.2752 34.0206C23.315 34.8325 21.2141 35.2504 19.0925 35.2504C16.9708 35.2504 14.8699 34.8325 12.9098 34.0206C11.5762 33.4682 10.3256 32.7409 9.18992 31.8599L7.10368 33.9625ZM28.9344 6.28152C26.1272 4.12516 22.671 2.93792 19.0925 2.93792C14.8076 2.93792 10.6982 4.64009 7.66829 7.66997C4.6384 10.6999 2.93623 14.8093 2.93623 19.0942C2.93623 21.2158 3.35413 23.3167 4.16605 25.2769C4.72475 26.6257 5.4625 27.8897 6.35716 29.0358L4.2702 31.1391C1.35261 27.548 -0.165546 23.0135 0.00974294 18.3781C0.19158 13.5695 2.18233 9.00695 5.58371 5.60313C8.98509 2.19932 13.5463 0.205307 18.3547 0.0200301C22.9447 -0.156832 27.4369 1.32691 31.0132 4.18636L28.9344 6.28152Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M3.13672 39.1367L38.3537 3.64355"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                ></path>
              </svg>
              <p className="mt-4">
                No results for &quot;<strong>{searchString}</strong>&quot;
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center">Type something to search...</div>
      )}
    </div>
  );
};

export default SearchResult;
