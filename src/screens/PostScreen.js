import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {posts} from "../data";

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }, 
    postImg: {
        width: "100%",
        height: "300px",
        objectFit: "cover",
        marginBottom: "20px",
    },
    title: {
        fontSize: "38px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    desc: {
        fontSize: "20px",
        marginBottom: "20px",
    },
    longDesc: {
        fontSize: "14px",
    }
}

const PostScreen = () => {

    const post = posts[0]
  return (
    <Box sx={styles.wrapper}>
        <Box component="img" src={post.img} alt="" sx={styles.postImg}/>
        <Typography sx={styles.title}>{post.title}</Typography>
        <Typography sx={styles.desc}>{post.desc}</Typography>
        <Typography sx={styles.longDesc}>{post.longDesc}</Typography>
    </Box>
  )
}

export default PostScreen