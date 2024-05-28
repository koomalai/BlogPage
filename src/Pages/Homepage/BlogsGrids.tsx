import { useEffect, useState } from "react";
import { Blogs } from "./Types/Blogs";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreLink from "../ReadMoreLink/ReadMoreLink";
import { useSnackbar } from "../../Shared/Contexts/SnackbarProvider";

const BlogsGrids = () => {
    const [mainData, setMainData] = useState<Blogs[] | undefined>();
    const snackbar = useSnackbar();

    const items = JSON.parse(localStorage.getItem('blogs') || "[]");
    useEffect(() => {

        if (items) {
            setMainData(items);
        }
    }, []);

    const DeleteItem = async (id: number) => {
        await fetch(`/api/deleteBlog/:${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Accept": "application/json", "Access-Cross-Allow-Origin": "*" }
        })
            .then(() => {
                setMainData(values => {
                    const newData = values?.filter((item) => item.id !== id)
                    localStorage.setItem("blogs", JSON.stringify(newData));
                    snackbar.showSnackBar("Blog deleted successfully", "success", "Success Message");
                    return newData;
                })
            })
            .catch(() =>
                snackbar.showSnackBar("Cannot delete blog", "error", "Error Message")
            );
    }

    const card = (
        mainData?.map((item) =>
            <Card key={item.id} sx={{ mb: "10vh", mt: "10vh" }}>
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {item.BlogTitle}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom component={'span'}>
                            {item.BlogDescription.length <= 100 ?
                                (item.BlogDescription)
                                : (
                                    <ReadMoreLink>{item.BlogDescription}</ReadMoreLink>
                                )}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ float: "right" }}>
                        <DeleteIcon sx={{ float: "right" }} onClick={() => { DeleteItem(item.id) }} />
                    </CardActions>
                </React.Fragment>
            </Card>
        )
    )

    return (
        <>
            {card}
        </>
    );
}
export default BlogsGrids;