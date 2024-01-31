// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//     <h1>inventory$</h1>
//     </main>
//   );
// }

import {
    Box,
    Button,
    CardActionArea,
    CardActions,
    Container,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
export default function MultiActionAreaCard() {
  return (
    <Container>
      <Box sx={{ display: "flex",justifyContent:"center", marginTop:"70px" }}>
      <Card sx={{ display: "flex", maxWidth:"30rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.cdc.gov/nceh/features/lightning-safety/lightning-safety_456px.jpg?_=99662"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Thunder Storm
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Read more
              </Button>
            </CardActions>
          </CardContent>
        </Box>
      </Card>
    </Box>
    </Container>
 );
}