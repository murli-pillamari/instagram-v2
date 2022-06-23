import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    // let userData = [
    //   {
    //     caption: null,
    //     location: null,
    //     heartCount: 0,
    //   },
    // ];
    this.state = {
      userPosts: [],
      heartCount: 0,
    };
    this.heartClick = this.heartClick.bind(this);
  }
  componentDidMount() {
    const localUserPosts = JSON.parse(localStorage.getItem("localUserPost"));
    // localUserPosts.map((items) => {
    //   return items.postImage = URL.createObjectURL(items.postImage);
    // });

    this.setState({
      userPosts: localUserPosts,
    });
  }
  componentDidUpdate() {
    console.log("this.state.userPosts: ", this.state.userPosts);
  }

  heartClick = (ind) => {
    // let items = [];
    // let count = 0;
    // count++;
    this.setState({
      heartCount: this.state.heartCount + 1,
    });
    this.state.userPosts.forEach((items) => {
      console.log("ind: ", ind);
      if (items.userId === ind) {
        console.log("clicked");
        items.heartCount = this.state.heartCount;
      } else {
        console.log("noot matched");
      }
    });
    // console.log("items: ", items);

    // this.setState({
    //   userPosts: {
    //     userPost:{
    //     }
    //   },
    // });
  };
  render() {
    return (
      <>
        <h2 className="mb-6">Dashboard</h2>

        {this.state.userPosts?.map((item, ind) => {
          // URL.createObjectURL(item.postImage)
          return (
            <div
              key={ind + 1}
              className="my-8 border px-30 w-8/12 mx-auto flex flex-col"
              style={{
                backgroundImage: `url(${item.postImage})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  textAlign: "left",
                  marginLeft: "5px",
                }}
              >
                {item.location}
              </p>
              <span style={{ marginTop: "170px" }}>
                <span
                  style={{
                    marginLeft: "5px",
                    float: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => this.heartClick(ind + 1)}
                >
                  &hearts;&nbsp;{item.heartCount || 0}
                </span>
                <span
                  style={{
                    marginRight: "4px",
                    float: "right",
                    fontSize: "11px",
                    marginTop: "10px",
                  }}
                >
                  comment?
                </span>
              </span>
              <p
                style={{
                  fontSize: "10px",
                  textAlign: "left",
                  marginLeft: "5px",
                }}
              >
                {item.caption}
              </p>
            </div>
          );
        })}

        <p className="mt-10">
          {" "}
          <Link to="AddPost">
            <Button variant="outlined">Add Posts</Button>
          </Link>
        </p>
      </>
    );
  }
}
export default Dashboard;
