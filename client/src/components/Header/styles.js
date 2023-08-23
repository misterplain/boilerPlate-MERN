
const styles = {
    wrapper: (theme)=>({
        width: "100%",
        height: "60px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#b3b3cc",
        padding: "0px 15px",
        margin: "0px",
        [theme.breakpoints.up("sm")]: {
            padding: "0px 15px",
            margin: "0px",
        },
        [theme.breakpoints.up("md")]: {
            padding: "0px 30px",
            margin: "0px",
        },
        [theme.breakpoints.up("lg")]: {
            padding: "0px 40px",
            margin: "0px",
        },

    }),

    logoWrapper: (theme)=>({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }),
    collections: (theme)=>({
        minWidth: 150,
        background: "white",
        borderRadius: "5px",
        margin: "0px 5px",
        [theme.breakpoints.down("md")]: {
            display: "none"
        }
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

