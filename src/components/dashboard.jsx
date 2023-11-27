import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      heartCount: 0,
      commentHide: true,
      comments: [],
    };
    this.heartClick = this.heartClick.bind(this);
    this.onCommentClickSection = this.onCommentClickSection.bind(this);
    this.setStorageData = this.setStorageData.bind(this);
    this.addCommentClick = this.addCommentClick.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }

  componentDidMount() {
    const localUserPosts = JSON.parse(localStorage.getItem("localUserPost"));
    this.setState({
      userPosts: localUserPosts,
    });
  }
  componentDidUpdate() {
    console.log("this.state.userPosts: ", this.state.userPosts);
  }

  setStorageData = (ind, cases) => {
    const userData = JSON.parse(localStorage.getItem("localUserPost"));
    const userPost = userData.find((data) => data.userId === ind);
    if (cases === "HeartClick") {
      userPost.heartCount += 1;
    } else if (cases === "commentClick") {
      userPost.commentHide = !userPost.commentHide;
    } else if (cases === "addComment") {
      userPost.comments = [...userPost.comments, this.state.comments];
    }
    const index = userData.findIndex((data) => data.userId === userPost.userId);
    userData[index] = userPost;
    localStorage.setItem("localUserPost", JSON.stringify(userData));
    this.setState({ userPosts: userData });
  };

  heartClick = (ind) => {
    this.setStorageData(ind, "HeartClick");
  };
  onCommentClickSection = (ind) => {
    this.setStorageData(ind, "commentClick");
  };
  addCommentClick = (ind) => {
    this.setStorageData(ind, "addComment");
  };
  onChangeComment = (textValue) => {
    this.setState({
      comments: textValue,
    });
  };
  render() {
    return (
      <div className="">
        <h2 className="mb-6">Dashboard</h2>

        {this.state.userPosts?.map((item, ind) => {
          return (
            <div key={ind + 1}>
              <div
                className="my-8 border px-30 w-8/12 mx-auto flex flex-col"
                style={{
                  backgroundImage: `url(${item.postImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  paddingBottom: "15px"
                }}
              >
                <div className="flex justify-between mx-2">
                  <p
                    style={{
                      fontSize: "10px",
                      textAlign: "left",

                    }}
                  >
                    {item.location}
                  </p>
                  <Link to={`/addPost/${item.userId}`} className="font-semibold text-xs">Edit</Link>
                </div>
                <span style={{ marginTop: "170px", position: "relative", top: "46px", padding: "4px 0px" }}>
                  <span
                    style={{
                      marginLeft: "5px",
                      float: "left",
                      cursor: "pointer",
                    }}
                    onClick={() => this.heartClick(item.userId)}
                  >
                    <span
                      style={{ fontSize: "18px", color: "red" }}
                      className={`${item.heartCount === 0 && "hidden"}`}
                    >
                      &hearts;
                    </span>
                    <span
                      style={{ fontSize: "18px" }}
                      className={`${item.heartCount > 0 && "hidden"}`}
                    >
                      &hearts;
                    </span>
                    &nbsp;
                    <span style={{ fontSize: "14px" }}>{item.heartCount}</span>
                  </span>
                  <span
                    style={{
                      marginRight: "4px",
                      float: "right",
                      fontSize: "11px",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.onCommentClickSection(item.userId)}
                  >
                    Comment
                  </span>
                </span>
                <p
                  style={{
                    fontSize: "10px",
                    textAlign: "left",
                    marginLeft: "5px",
                    marginTop: "20px",
                    position: "relative",
                    top: "15px",
                  }}
                >
                  {item.caption}
                </p>
              </div>
              <div
                className={`mx-auto -mt-6  w-8/12 text-xs ${
                  item.comments.length > 0 && "border"
                }`}
              >
                <p className={`${item.comments.length > 0 && "hidden"}`}>
                  There are no comments yet{" "}
                </p>
                <div
                  className={`text-left mx-2 ${
                    item.comments.length <= 0 && "hidden"
                  } `}
                >
                  <ol>
                    {item.comments.map((items, index) => {
                      return <li key={index}>-- {items}</li>;
                    })}
                  </ol>
                </div>
              </div>
              <div
                className={`flex flex-col mt-2 mx-auto border w-8/12 pt-2 text-xs p-1 ${
                  item.commentHide && "hidden"
                }`}
              >
                <textarea
                  onChange={(e) => this.onChangeComment(e.target.value)}
                  rows="2"
                  placeholder="Write Down here.."
                />
                <button
                  className="py-1 bg-white text-blue-400 w-1/2 self-center "
                  onClick={() => this.addCommentClick(item.userId)}
                >
                  Add +
                </button>
              </div>
            </div>
          );
        })}

        <p className="mt-10">
          {" "}
          <Link to="AddPost">
            <Button variant="outlined">Add Posts</Button>
          </Link>
        </p>
      </div>
    );
  }
}
export default Dashboard;
