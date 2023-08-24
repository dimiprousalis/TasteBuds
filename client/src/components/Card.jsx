import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ imageUrl, title, recipeURL }) {

    return (

        <Card sx={{
            maxWidth: 345,
            height: 290,
            margin: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <CardMedia
                sx={{
                    minHeight: 130,
                }}
                image={imageUrl}
                title={title}
            />
            <CardContent
                sx={{
                    padding: '0 5%',
                    minHeight: 50,
                }}>
                <Typography >
                    <h2>
                        {title}
                    </h2>
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginBottom: '3%',

                }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '0.8vw',
                        margin: '1%',
                        padding: '2% 3%',
                        width: '45%',
                        '@media (max-width: 600px)': {
                            fontSize: '1.5vw',
                        }
                    }}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    href={recipeURL}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '0.8vw',
                        margin: '1%',
                        padding: '2% 3%',
                        width: '45%',
                        '@media (max-width: 600px)': {
                            fontSize: '1.5vw',
                        }
                    }}
                >
                    Recipe
                </Button>
            </CardActions>
        </Card>
    );
}
