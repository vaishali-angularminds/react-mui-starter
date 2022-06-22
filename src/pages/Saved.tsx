import React from 'react'
import './Saved.scss'
import SimpleImageSlider from "react-simple-image-slider";
import {useState,useEffect} from 'react'
import authAxios from '../utils/http/api'
import {Typography,CardMedia,Grid,Paper} from '@mui/material'
function Saved() {
  const [allPosts,setAllPosts] = useState([]);
  const [savedPosts,setSavedPosts] = useState([]);
  const [urls,setUrls] = useState([]);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("currentUser")  || '{}')  )

  const getdata = async () => {
    const res = await authAxios.get(`/post`);
  
    setAllPosts(res.data.results);
      const val = res.data.results.map((p : any) => {
      return p.img.map((im : any) => {
        return `http://localhost:8080/${im.path}`;
      });
    });    
  
    setUrls(val); 
       const re = await authAxios.get(`/users/${user._id}`)

    const val1 = re.data.bookmark.map((p : any) => {
    
        return `${p.postId}`;
     
    });
  //  console.log(val1)
   setSavedPosts(val1)

  };


    useEffect(()=>{
    getdata();
    },[])
     
    // console.log(savedPosts)
    // console.log(allPosts)
    
  return (
   
    <Grid container style={{ margin:'0px 100px'}} >
 
      {allPosts.map((post,index) =>
          savedPosts.includes(post['_id']) && 
          <Grid item xs={4} key={index} style={{ marginTop:'50px'}}>

        { post['img']['length'] > 1 ? (
        
            <SimpleImageSlider
            
              height="300px"
              width="300px"
              images={urls[index] ? urls[index] : []}
              showBullets={true}
              showNavs={true}
            />
        
        ) : (

          <CardMedia
           
            component="img"
           
            style={{minHeight:'300px',maxWidth:'300px',minWidth:'300px'}}
            // style={{height:'300px',width:'300px'}}
            image={`http://localhost:8080/${post['img'][0]['path']}`}
          />
      
        )}
        </Grid>
       )
      }
     </Grid>

)
} 

export default Saved
     
    {/* <Grid className='mainGrid'>
        <Grid  xs={12} style={{display:'flex',margin:'30px 30px'}} >
       
        
     {allPosts.map((post,index) =>
          savedPosts.includes(post['_id']) && 
          <Grid item  xs={4}  className='mediaContainer' >

        { post['img']['length'] > 1 ? (
        
            <SimpleImageSlider
           
              height="300px"
              width="300px"
              images={urls[index] ? urls[index] : []}
              showBullets={true}
              showNavs={true}
              // style={{margin:'30px 30px'}}
            />
        
        ) : (

          <CardMedia
            className="mediaImg"
            component="img"
           
            style={{minHeight:'300px',minWidth:'300px'}}
            image={`http://localhost:8080/${post['img'][0]['path']}`}
          />
      
        )}
        </Grid>
       )
      }

       
      </Grid>
   
  </Grid>

*/}
