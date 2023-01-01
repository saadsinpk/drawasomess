import React, { useState, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import config from "../services/config.json";
import AdminEntries from "./components/AdminEntries";
import Userdata from "./components/Userdata";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { getTokenSession } from "./utils/common";
import { toast } from "react-toastify";
import Loader from "./components/common/Loader";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./dragsComponents/DraggableElement";
import styled from "styled-components";
import DraggableDateElement from "./dragsComponents/DraggableDateElement";

function AdminDashboard({ isDragging }) {
  const [data, setData] = useState("");
  const [updated, setupdated] = useState(false);
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [initiallyRunning, setinitiallyRunning] = useState(false);
  useEffect(() => {
    if (isComponentMounted.current) {
      getData();
    }
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    };
  }, []);
  const [adminEntrieslist, setAdminEntrieslist] = useState([
    {
      entry_id: "1",
      id: "1",
      username: "muzzz",
      submissiondate: "Monday 12 2022",
    },
    {
      entry_id: "2",
      id: "2",
      username: "ALi",
      submissiondate: "Monday 12 2023",
    },
  ]);
  const [savedEntrieslist, setSavedEntrieslist] = useState([
    {
      entry_id: "3",
      username: "zain",
      submissiondate: "Monday 22 2022",
    },
    {
      entry_id: "4",
      username: "affan",
      submissiondate: "Monday 01 2022",
    },
  ]);
  const [userdata, setUserdata] = useState("");

  const [upcomingenteries, setupcomingenteries] = useState([
    {
      id: "1uc",
      title: "Tues December 20th 2022",
    },
    {
      id: "2uc",
      title: "Wednes December 21th 2022",
    },
    {
      id: "3uc",
      title: "Thurs December 22th 2022",
    },
  ]);
  const getData = async () => {
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   "Authorization":`Bearer ${getTokenSession()}`,
    // };
    // axios.get(`${config.apiEndPoint}dashboard`,)
    // .then ((response) => {
    //   setData(response.data);
    // const AdminEntriesupdate = response.data.entries.filter((item) => item.saved == "0");
    // const savedEntriesupdate = response.data.entries.filter((item) => item.saved != "0");
    // setAdminEntrieslist()
    // setSavedEntrieslist()
    //   setLoading(false);
    //   getUserData(`${response.data.entries[0].entry_id}`);
    // })
    // .catch((error) => {
    //   setLoading(true);
    //   if (error.response.status === 401)
    //   toast.error(error.response.data.message);
    //   else toast.error("Something went wrong. Please try again later.");
    // });
  };
  const getUserData = async (id) => {
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   "Authorization":`Bearer ${getTokenSession()}`,
    // };
    // axios.get(`${config.apiEndPoint}userInfo/${id}`,)
    // .then ((response) => {
    //   setUserdata(response.data.data);
    // })
    // .catch((error) => {
    //   setLoading(true);
    //   if (error.response.status === 401)
    //   toast.error(error.response.data.message);
    //   else toast.error("Something went wrong. Please try again later.");
    // });
  };
  // if (loading) return <Loader />;

  const handlesavedEntries = (e) => {
    const savedEntriesupdate = savedEntrieslist.filter(
      (item) => item.entry_id != e.target.id
    );
    const adminEntrieslistdate = savedEntrieslist.filter(
      (item) => item.entry_id == e.target.id
    );
    setSavedEntrieslist(savedEntriesupdate);
    setAdminEntrieslist([...adminEntrieslist, adminEntrieslistdate[0]]);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .put(`${config.apiEndPoint}updateEntry/${e.target.id}`, {
        updateValue: false,
      })
      .then((response) => {
        if (response) {
          toast.success("update");
        }
      })
      .catch((error) => {
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  };
  const handleEntrieslist = (e) => {
    const savedEntriesupdate = adminEntrieslist.filter(
      (item) => item.entry_id != e.target.id
    );
    const adminEntrieslistdate = adminEntrieslist.filter(
      (item) => item.entry_id == e.target.id
    );
    setAdminEntrieslist(savedEntriesupdate);
    setSavedEntrieslist([...savedEntrieslist, adminEntrieslistdate[0]]);

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .put(`${config.apiEndPoint}updateEntry/${e.target.id}`, {
        updateValue: true,
      })
      .then((response) => {
        if (response) {
          toast.success("update");
        }
      })
      .catch((error) => {
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  };
  const handlelistdelete = (e) => {
    const listdelete = adminEntrieslist.filter(
      (item) => item.entry_id != e.target.getAttribute("data-delete")
    );
    setAdminEntrieslist(listdelete);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .post(
        `${config.apiEndPoint}deleteEntry/${e.target.getAttribute(
          "data-delete"
        )}`
      )
      .then((response) => {
        if (response) {
          toast.success(response.message);
        }
      });
  };
  const handleClick = (item, e) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}userInfo/${item.user_id}`)
      .then((response) => {
        if (response.data.errorMessage) {
          toast.error(response.data.errorMessage);
        } else {
          setUserdata(response.data.data);
        }
      });
  };
  const currentCount = seconds;
  let myInterval;
  const startTimer = () => {
    setinitiallyRunning(true);
    myInterval = setInterval(() => {
      initiallyRunning && setSeconds((seconds) => seconds - 1);
    }, 1000);
  };
  const stopTimer = () => {
    alert("dskgfdahjg");
    setinitiallyRunning(false);
    clearInterval(myInterval);
  };
  const onDragEnd = (result) => {
    const indexOfDroppableEntry = adminEntrieslist.findIndex(
      (item) => item.id === result.draggableId
    );
    const indexOfDestinationEntry = upcomingenteries.findIndex(
      (item) => item.id === result.destination.droppableId
    );
    console.log(indexOfDroppableEntry, "indexOfDroppableEntry");
    if (!result.destination) return;
    else if (result.destination.droppableId === "newEntries") return;
    else if (upcomingenteries[indexOfDestinationEntry].submitted) {
      alert("already Submitted");
      return;
    }
    setupcomingenteries((prev) =>
      prev.map((item) => {
        if (item.id === result.destination.droppableId) {
          const user = adminEntrieslist[indexOfDroppableEntry];
          return {
            ...item,
            submitted: true,
            name: user.username,
            date: user.submissiondate,
          };
        } else return item;
      })
    );
    setAdminEntrieslist((prev) =>
      prev.filter((item) => item.id !== result.draggableId)
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        <div className="aadmindasboard my-2 grid grid-cols-3">
          <div className="aadmindasboard__left">
            <div className="AdminEntries mb-3">
              <div className="AdminEntries__top adminheading text-center">
                {"New Entries"}
              </div>
              <div className="AdminEntries__bottom">
                <DraggableElement
                  elements={adminEntrieslist}
                  key={"newEntries"}
                  prefix={"newEntries"}
                />
              </div>
            </div>
            <div className="AdminEntries mb-3">
              <div className="AdminEntries__top adminheading text-center">
                {"Saved Entries"}
              </div>
              <div className="AdminEntries__bottom">
                <ul className="list adminlist">
                  {savedEntrieslist.map((item, index) => (
                    <li
                      className="list__item flex gap-2 items-center justify-between"
                      onClick={(e) => handleClick(item, e)}
                      key={index}
                    >
                      <div>
                        <span>Username</span>
                        <span>{item.username}</span>
                      </div>
                      <div>
                        <span>Submission Date</span>
                        <span>{item.submissiondate}</span>
                      </div>

                      <button
                        className="closebtn"
                        id={item.entry_id}
                        onClick={handlesavedEntries}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <AdminEntries proptext="New Entries" /> */}
          </div>
          <div className="aadmindasboard__center  p-5">
            <div className="paintBox"></div>
            <div className="aadmindasboard__center- flex justify-between items-center gap-2 my-3 px-5">
              <div className="timeBox">{currentCount}</div>
              <div className="aadmindasboard__center-center">
                <span className="block" style={{ fontSize: "10px" }}>
                  Button Frame
                </span>
                <div className=" gap-1">
                  <button
                    className=" btn btn-pink block w-100 my-1 start-button"
                    onClick={startTimer}
                  >
                    Play
                  </button>
                  <button
                    className="btn btn-pink block w-100 my-1 stop-button"
                    onClick={stopTimer}
                  >
                    Pause
                  </button>
                </div>
              </div>
              <div className="aadmindasboard__center-right">
                <h4>Word / </h4>
                <h4>Phrase </h4>
                {/* <h5>{userdata?.username}</h5> */}
              </div>
            </div>
            {/* {<Userdata user={userdata} /> } */}
          </div>
          <div className="aadmindasboard__right">
            <div className="UpcomingEntrie">
              <div className="AdminEntries__top adminheading text-center">
                Upcoming Entries
              </div>
              <div className="UpcomingEntrie__bottom">
                <ul className="list">
                  {upcomingenteries.map((item, index) => (
                    <DraggableDateElement
                      title={item.title}
                      key={index}
                      prefix={item.id}
                      user={{ name: item.name, date: item.date }}
                    />
                  ))}
                </ul>

                <button className="btn btn-sky text-center w-100">Save</button>
              </div>
            </div>
          </div>
        </div>
      </>
    </DragDropContext>
  );
}

export default AdminDashboard;
