import { Box, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddBlog } from "../../Services/Hooks/useAddBlogs";
import { useSnackbar } from "../../Shared/Contexts/SnackbarProvider";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/homepage">
        My Science Blog
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const AddBlogForm = () => {
  const defaultTheme = createTheme();

  const { isAddingBlog, addBlogs } = useAddBlog();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  
  const handleAddBlog = (Values: any) => {
    addBlogs(Values)
      .then((response: any) => {
        if (response) {
          navigate('/');
          snackbar.showSnackBar("Blog added successfully", "success", "Success Message");
        }
      })
      .catch(() =>
        snackbar.showSnackBar("Cannot add blog", "error", "Error Message")
      );
  }
  const formik = useFormik({
    initialValues: {
      BlogTitle: "",
      BlogDescription: ""
    },
    validationSchema: Yup.object({
      BlogTitle: Yup.string()
        .required("Blog title is required"),
      BlogDescription: Yup.string()
        .required("Blog description is required"),
    }),
    onSubmit: (values) => handleAddBlog(values),
  });

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" data-testid="add-blog-text">
              Add Blog
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1.5 }}
            >
              <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1.5 }}>
                <Grid item xs={12}>
                  <TextField
                    id="BlogTitle"
                    label="Blog Title"
                    name="BlogTitle"
                    autoComplete="BlogTitle"
                    type="text"
                    required
                    fullWidth
                    value={formik.values.BlogTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.BlogTitle && Boolean(formik.errors.BlogTitle)}
                    helperText={formik.touched.BlogTitle && formik.errors.BlogTitle}
                    inputProps={{ "data-testid": "blog-title" }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="BlogDescription"
                    label="Blog Description"
                    name="BlogDescription"
                    autoComplete="BlogDescription"
                    type="text"
                    required
                    fullWidth
                    value={formik.values.BlogDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.BlogDescription && Boolean(formik.errors.BlogDescription)}
                    helperText={formik.touched.BlogDescription && formik.errors.BlogDescription}
                    inputProps={{ "data-testid": "blog-description" }} />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isAddingBlog}
                sx={{ mt: 1.5, mb: 1.5 }}
                disabled={!(formik.values.BlogTitle && formik.values.BlogDescription)}
              >
                Add Blog
              </LoadingButton>
              <Copyright sx={{ mt: 2 }} />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}
export default AddBlogForm;