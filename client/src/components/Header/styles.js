const styles = {
    wrapper: (theme)=>({
        width: "100%",
        height: "50px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#b3b3cc",
        padding: "0 15px",
        margin: "0 0px",
        [theme.breakpoints.up("sm")]: {
            padding: "0 15px",
            margin: "0",
        },
        [theme.breakpoints.up("md")]: {
            padding: "0 30px",
            margin: "0",
        },
        [theme.breakpoints.up("lg")]: {
            padding: "0 40px",
            margin: "0",
        },

    }),

    logoWrapper: (theme)=>({
        display: "flex",
        flexDirection: "row",
        // border: "1px solid red",
        alignItems: "center",
    }),
    logo: (theme)=>({
        width: "100%",
        fontSize: "1rem",
        color: "white",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.5rem",
        }
    }),
    linksWrapper: (theme)=>({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

    }),

    headerButton: (theme)=>({
        marginLeft: "10px",
        fontSize: "1rem",
        [theme.breakpoints.up("sm")]: {
            marginLeft: "20px",
            fontSize: "1.5rem",
        }

    }),
    avatar: (theme)=>({
        width: "32px",
        height: "32px",
        border: "1px solid white",
        borderRadius: "50%",
    })
}

export default styles