
import {Grid,Modal,Typography,Avatar, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function LikesModal({ likeModal, setLikeModal,post }: any) {
// console.log(post)
  const style = {
    width: 400,
    height: 500,
    background: "#fff",
    color: "#000",
    display: "grid",
    marginTop: "100px",
    marginLeft: "30%",
  };
  return (
    <Modal
      open={likeModal}
      id="likesModal"
      onClose={() => setLikeModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      aria-hidden="true"
    >
        <div style={style}>
            <Grid>
                <Typography sx={{ textAlign: "center", marginTop: "20px" ,height:'30px'}}>
                    Likes
                </Typography>
                <CloseIcon
                style={{
                    padding:'10px',
                    display: "inline",
                    float: "right",
                    marginTop:'-50px'
                }}
                onClick={() => setLikeModal((prev: any) => !prev)}
                />
            </Grid>
            <Grid style={{overflow:'auto',height:'400px'}}>
                {(post !== undefined && post['comments'] != undefined) &&
                  post['comments'].length > 0 ?(                 
                        post['comments'].map(
                            (item: any, i: any) =>(
                            <Grid key={i} p={3} style={{display: 'flex'}}>
                                <Avatar src={`http://localhost:8080/${item['commentBy']['profilePicture']}`}/>
                                <Typography pl={3}>
                                    {item['commentBy']['firstname']}
                                </Typography>
                            </Grid>
                        ))
                    ):
                    (
                    <Typography style={{textAlign: "center"}}>0 likes yet</Typography>
                    )
                }
            </Grid>
        </div>
    </Modal>
  );
}

export default LikesModal;
