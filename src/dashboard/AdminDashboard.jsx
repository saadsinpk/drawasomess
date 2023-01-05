import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../services/config.json";
import AdminEntries from "./components/AdminEntries";
import Userdata from "./components/Userdata";
import { getTokenSession, removeTokenSession } from "./utils/common";
import { toast } from "react-toastify";
import Loader from "./components/common/Loader";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./dragsComponents/DraggableElement";
import styled from "styled-components";
import DraggableDateElement from "./dragsComponents/DraggableDateElement";

function AdminDashboard({ isDragging }) {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [alllistData, setAlllistData] = useState("");
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  // const [seconds, setSeconds] = useState(60);
  const [initiallyRunning, setinitiallyRunning] = useState(false);

  const [time, setTime] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [timerid, setTimerid] = useState(0);

  function handleplay() {
    setStartTimer(true);
  }

  function handlestop() {
    setStartTimer(false);
  }

  function handleReload() {
    setTime(60);
    setStartTimer(false);
  }

  useEffect(() => {
    let interval = null;
    if (startTimer) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev == 0) {
            handlestop();
            return prev;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
      setTimerid(interval);
    } else {
      clearInterval(timerid);
    }
  }, [startTimer]);

  useEffect(() => {
    !getTokenSession() && navigate(`/admin/login`);
    const now = new Date();
    // console.log(getAllDaysInMonth(now.getFullYear(), now.getMonth()));
    const date = new Date();
    if (isComponentMounted.current) {
      getDataa();
    }
    return () => {
      isComponentMounted.current = false;
      setLoading(true);
    };
  }, []);
  function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  const [adminEntrieslist, setAdminEntrieslist] = useState();
  const [savedEntrieslist, setSavedEntrieslist] = useState();
  const [userdata, setUserdata] = useState("");

  const [upcomingenteries, setupcomingenteries] = useState();
  const getDataa = async () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}dashboard`)
      .then((response) => {
        setData(response.data);
        const AdminEntriesupdate = response.data.entries.filter(
          (item) => item.saved == "0"
        );
        const savedEntriesupdate = response.data.entries.filter(
          (item) => item.saved != "0"
        );
        const responseUpcommingEntires = response.data.entries
          .filter((item) => item.upcomming_date)
          .map((el) => ({
            ...el,
            upcomming_date: new Date(el.upcomming_date),
          }));

        console.log(responseUpcommingEntires, "responseUpcommingEntires");

        setAdminEntrieslist(AdminEntriesupdate);
        setSavedEntrieslist(savedEntriesupdate);
        setAlllistData(response.data.entries);
        getUserData(`${response.data.entries[0].entry_id}`);

        const now = new Date("01-01-2023");
        const upCommingEntries = getAllDaysInMonth(
          now.getFullYear(),
          now.getMonth()
        ).map((item, index) => {
          const isEntryOnDate = responseUpcommingEntires.filter(
            (el) =>
              el.upcomming_date.getDate() + el.upcomming_date.getMonth() ===
              item.getDate() + item.getMonth()
          )[0];
          if (isEntryOnDate) {
            return {
              ...isEntryOnDate,
              date: item,
            };
          } else {
            return { date: item, name: "", title: "", id: index };
          }
        });
        console.log(upCommingEntries, "upCommingEntries");
        setupcomingenteries(upCommingEntries);
        // let  upcom = response.data.entries.filter((item) => item.upcomming_date != "");
        setLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          removeTokenSession("token");
        } else if (error?.response?.status === 401) {
          setLoading(true);
          toast.error(error.response.data.message);
        } else {
          setLoading(true);
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };
  const getUserData = async (id) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}userInfo/${id}`)
      .then((response) => {
        setUserdata(response.data.data);
      })
      .catch((error) => {
        setLoading(true);
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  };
  if (loading) return <Loader />;

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
  const handleEntrieslist = (itemsave) => {
    const savedEntriesupdate = adminEntrieslist.filter(
      (item) => item.entry_id != itemsave
    );
    const adminEntrieslistdate = adminEntrieslist.filter(
      (item) => item.entry_id == itemsave
    );
    setAdminEntrieslist(savedEntriesupdate);
    setSavedEntrieslist([...savedEntrieslist, adminEntrieslistdate[0]]);

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .put(`${config.apiEndPoint}updateEntry/${itemsave}`, {
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

  const onDragEnd = (result) => {
    const indexOfDroppableEntry = adminEntrieslist.findIndex(
      (item) => item.entry_id == result.draggableId
    );

    const indexOfDestinationEntry = upcomingenteries.findIndex(
      (item) => item.id == result.destination.droppableId
    );
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .put(`${config.apiEndPoint}addUpcomingEntry/`, {
        entryId: result.destination.droppableId,
        playDate: "2-1-2023",
      })
      .then((response) => {});
    if (!result.destination) return;
    else if (result.destination.droppableId === "newEntries") return;
    else if (result.destination.droppableId === "savedEntries") return;
    else if (upcomingenteries[indexOfDestinationEntry].submitted) {
      alert("already Submitted");
      return;
    }
    setupcomingenteries((prev) =>
      prev.map((item) => {
        if (item.id == result.destination.droppableId) {
          const user = adminEntrieslist[indexOfDroppableEntry];
          console.log(user, "drag");
          return {
            ...user,
            date: item.date,
          };
          // return {
          //   ...item,

          //   user: {
          //     name: user.username,
          //   },
          //   // date: user.submissiondate,
          // };
        } else return item;
      })
    );
    setAdminEntrieslist((prev) =>
      prev.filter((item) => item.entry_id != result.draggableId)
    );
    setSavedEntrieslist((prev) =>
      prev.filter((item) => item.entry_id != result.draggableId)
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
                  SavedMove={(item) => {
                    console.log(item);
                  }}
                />
              </div>
            </div>
            <div className="AdminEntries mb-3">
              <div className="AdminEntries__top adminheading text-center">
                {"Saved Entries"}
              </div>
              <div className="AdminEntries__bottom">
                <ul className="list adminlist">
                  <DraggableElement
                    elements={savedEntrieslist}
                    key={"savedEntries"}
                    prefix={"savedEntries"}
                    removeSaved={handlesavedEntries}
                  />
                </ul>
              </div>
            </div>
          </div>
          <div className="aadmindasboard__center  p-5">
            <div className="paintBox"></div>
            <div className="aadmindasboard__center- flex justify-between items-center gap-2 my-3 px-5">
              <div className="timeBox">{time}</div>
              <div className="aadmindasboard__center-center">
                <span className="block" style={{ fontSize: "10px" }}>
                  Button Frame
                </span>
                <div className=" gap-1">
                  <button
                    className=" btn btn-pink block w-100 my-1 start-button"
                    onClick={handleplay}
                  >
                    Play
                  </button>
                  <button
                    className="btn btn-pink block w-100 my-1 stop-button"
                    onClick={handlestop}
                  >
                    Pause
                  </button>
                  <button
                    onClick={handleReload}
                    className="btn btn-pink block w-100 my-1 stop-button"
                  >
                    clear
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
                      title={item?.word_phrase}
                      key={index}
                      prefix={item?.id}
                      user={{ name: item?.username, date: item?.date }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    </DragDropContext>
  );
}

export default AdminDashboard;
