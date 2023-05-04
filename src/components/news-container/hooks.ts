import { useQuery } from "react-query";
import { getService } from "../../services/service";

const LanguageCode = {
  English: "en",
  Hindi: "hi",
};

const filterString = (selectedCategories: [], selectedLanguages: []) => {
  let categoryFilter: string = "";
  let languageFilter: string = "";
  if (!!selectedCategories.length) {
    categoryFilter = `&category=${selectedCategories.join(", ")}`;
  }
  if (!!selectedLanguages.length) {
    languageFilter = `&language=${selectedLanguages
      .map((lang) => LanguageCode[lang])
      .join(", ")}`;
  }
  return `${categoryFilter}${languageFilter}`;
};

export const useNewsApi = (selectedCategories: [], selectedLanguages: []) => {
  const url =
    "https://newsdata.io/api/1/news?apikey=pub_149709be101bf72dcd30da490e43ebf434de9&country=in";

  const filter = filterString(selectedCategories, selectedLanguages);

  const useNewsApi = useQuery(["news"], () => getService(`${url}${filter}`), {
    enabled: false,
  });

  return useNewsApi;
};
