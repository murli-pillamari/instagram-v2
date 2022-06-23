import { Button, TextField } from "@mui/material";
import React from "react";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPost: {
        userId: 0,
        postImage: null,
        caption: null,
        location: null,
        heartCount: 0,
      },
      userPosts: [],
    };
    this.setPostData = this.setPostData.bind(this);
    this.addPostClick = this.addPostClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      userPost: {
        userId: 0,
      },
    });
  }

  componentDidUpdate() {
    console.log("userPost did update: ", this.state.userPost);
  }
  addPostClick = () => {
    const { caption, location } = this.state.userPost;
    if (caption && location) {
      var array = localStorage.getItem("localUserPost");
      let items = [];

      if (array) {
        items = JSON.parse(array);
      }

      items.push(this.state.userPost);

      items.forEach((items, index) => {
        items.userId = index + 1;
      });

      localStorage.setItem("localUserPost", JSON.stringify(items));
      this.setState({
        userPost: items,
      });
      window.location.href = "./";
    } else {
      alert("Please fill the details");
    }
  };
  onImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    var imgUrl;
    reader.onload = (event) => {
      this.setState({
        userPost: {
          postImage: event.target.result,
        },
      });
    };
  };
  setPostData = (e) => {
    this.setState({
      userPost: {
        ...this.state.userPost,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    return (
      <>
        <div className="flex flex-col">
          <h2 className="">Add Post</h2>
          <div className="px-10 mt-10 flex flex-col">
            <TextField
              type="file"
              onChange={this.onImageChange}
              error={!this.state.userPost.postImage}
              helperText="Field is required"
            />
            <br />
            <TextField
              onChange={this.setPostData}
              name="caption"
              label="Caption"
              error={!this.state.userPost.caption}
              helperText="Field is required"
              value={this.state.userPost.caption || ""}
            />
            <TextField
              onChange={this.setPostData}
              name="location"
              label="Location"
              error={!this.state.userPost.location}
              helperText="Field is required"
              value={this.state.userPost.location || ""}
            />
            <Button
              onClick={this.addPostClick}
              className="w-2/5 self-center"
              variant="outlined"
            >
              ADD
            </Button>
          </div>
        </div>
      </>
    );
  }
}
export default AddPost;
