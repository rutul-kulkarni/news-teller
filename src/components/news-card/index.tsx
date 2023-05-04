import { Grid, Card, Typography, Button } from "@mui/material";

const truncate = (input: string) =>
  input?.length > 500 ? `${input?.substring(0, 200)}...` : input;

const NewsCard = ({ title, content, pubDate, link }: any) => {
  const onReadMoreClick = () => {
    window.open(link, "_blank");
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Card style={{ padding: "10px" }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography fontSize={18} fontWeight={600}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={14}>
              {truncate(content)}
              <Button
                style={{ textTransform: "lowercase" }}
                onClick={onReadMoreClick}
              >
                read more
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={14}>
              {new Date(pubDate).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default NewsCard;
