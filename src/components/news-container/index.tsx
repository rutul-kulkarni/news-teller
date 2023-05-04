import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getService } from "../../services/service";
import NewsCard from "../news-card";
import { useNewsApi } from "./hooks";

const NewsContainer = () => {
  const languages = ["English", "Hindi"];

  const categories = [
    "Business",
    "Entertainment",
    "Environment",
    "Food",
    "Health",
    "Politics",
    "Science",
    "Sports",
    "Technology",
    "Top",
    "World",
  ];

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<any>([]);

  const isAllCategoriesSelected =
    categories.length > 0 && selectedCategories.length === categories.length;

  const isAllLanguagesSelected =
    languages.length > 0 && selectedLanguages.length === languages.length;

  const handleCategoryChange = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedCategories(
        selectedCategories.length === categories.length ? [] : categories
      );
      return;
    }
    setSelectedCategories(value);
  };

  const handleLanguageChange = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedLanguages(
        selectedLanguages.length === languages.length ? [] : languages
      );
      return;
    }
    setSelectedLanguages(value);
  };

  const useNews = useNewsApi(selectedCategories, selectedLanguages);

  useEffect(() => {
    useNews.refetch();
  }, []);

  useEffect(() => {
    if (!!selectedCategories.length || !!selectedLanguages.length) {
      useNews.refetch();
    }
  }, [selectedCategories, selectedLanguages]);

  if (useNews.isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid
      container
      p={3}
      display="flex"
      alignItems="center"
      direction="column"
      rowGap={2}
    >
      <Grid container>
        <Grid item xs={6} sm={6} md={8} lg={8}>
          <Typography fontSize={30} fontWeight={600}>
            News Teller
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="mutiple-select-label">Categories</InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={isAllCategoriesSelected}
                        indeterminate={
                          selectedCategories.length > 0 &&
                          selectedCategories.length < categories.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedCategories.indexOf(option) > -1}
                        />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="mutiple-select-label">Language</InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={selectedLanguages}
                  onChange={handleLanguageChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={isAllLanguagesSelected}
                        indeterminate={
                          selectedLanguages.length > 0 &&
                          selectedLanguages.length < languages.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {languages.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedLanguages.indexOf(option) > -1}
                        />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {useNews.data !== undefined &&
          useNews.data.results?.map((val: any) => (
            <NewsCard
              title={val.title}
              content={val.content}
              pubDate={val.pubDate}
              link={val.link}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default NewsContainer;
