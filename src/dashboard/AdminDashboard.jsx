import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import config from "../services/config.json";
import AdminEntries from "./components/AdminEntries";
import Userdata from "./components/Userdata";
import { getTokenSession, removeTokenSession } from "./utils/common";
import { toast } from "react-toastify";
import Loader from "./components/common/Loader";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./dragsComponents/DraggableElement";
import DraggableDateElement from "./dragsComponents/DraggableDateElement";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

function AdminDashboard({ isDragging }) {
  const [data, setData] = useState("");
  const [alllistData, setAlllistData] = useState("");
  const isComponentMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [timerid, setTimerid] = useState(0);
  const navigate = useNavigate();
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
  const [newsavedentrydata, setNewsavedentrydata] = useState("");
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
        const AdminEntriesupdate2 = AdminEntriesupdate.filter((item) => !item.upcomming_date)
        const savedEntriesupdate = response.data.entries.filter(
          (item) => item.saved != "0"
        );
        setNewsavedentrydata(response.data.entries.filter((item) => !item.upcomming_date))
        const savedEntriesupdate2 = savedEntriesupdate.filter((item) => !item.upcomming_date)
        const responseUpcommingEntires = response.data.entries
          .filter((item) => item.upcomming_date)
          .map((el) => ({
            ...el,
            upcomming_date: new Date(el.upcomming_date),
          }));


        setAdminEntrieslist(AdminEntriesupdate2);
        setSavedEntrieslist(savedEntriesupdate2);
        setAlllistData(response.data.entries);
        let user__id = response.data.entries[0].user_id
        getUserData(user__id);
        const now = new Date();
        const upCommingEntries = getAllDaysInMonth(
          now.getFullYear(),
          now.getMonth()
        ).map((item, index) => {
          const isEntryOnDate = responseUpcommingEntires.filter(
          (el) =>
            el.upcomming_date.getDate() + el.upcomming_date.getMonth() +  el.upcomming_date.getFullYear() ==
            item.getDate() + item.getMonth() + item.getFullYear()
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
        
      })
      .catch((error) => {
        removeTokenSession("token");
        navigate(`/admin/login`)
        if (error?.response?.status === 500) {
        } else if (error?.response?.status === 401) {
          setLoading(true);
          toast.error(error.response.data.message);
        } else {
          setLoading(true);
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };
  const getUserData = async (user__id) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}userInfo/${user__id}`)
      .then((response) => {
        setUserdata(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  };
  if (loading) return <Loader />;

  const handlesavedEntries = (item) => {

    if(item.saved == 1) {
      let itemid = item.entry_id;
      const savedEntriesupdate = savedEntrieslist.filter(
        (item) => item.entry_id != itemid
      );
      const adminEntrieslistdate = savedEntrieslist.filter(
        (item) => item.entry_id == itemid
      );
      adminEntrieslistdate[0].saved = 0;
      setSavedEntrieslist(savedEntriesupdate);
      setAdminEntrieslist([...adminEntrieslist, adminEntrieslistdate[0]]);
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenSession()}`,
      };
      axios
        .put(`${config.apiEndPoint}updateEntry/${itemid}`, {
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

    }
    else {
      let itemid = item.entry_id;
      swal({
        title: "Are you sure?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          const listdelete = adminEntrieslist.filter(
            (item) => item.entry_id != itemid
          );
          setAdminEntrieslist(listdelete);
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenSession()}`,
          };
          axios
            .post(
              `${config.apiEndPoint}deleteEntry/${itemid}`
            )
            .then((response) => {
              if (response) {
                // toast.success(response.message);
              }
            });
        }
      });
    }
   
  };
  const handleEntrieslist = (item) => {  
    let a = item;
    const savedEntriesupdate = adminEntrieslist.filter(
      (item) => item.entry_id != a.entry_id
    );
    const adminEntrieslistdate = adminEntrieslist.filter(
      (item) => item.entry_id == a.entry_id
    );
    adminEntrieslistdate[0].saved = 1
    setAdminEntrieslist(savedEntriesupdate);
    setSavedEntrieslist([...savedEntrieslist, adminEntrieslistdate[0]]);

  
  };

  const handleClick = (item) => {
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
let  getdate;
  const onDragEnd = (result) => {
    const indexOfDroppableEntry = newsavedentrydata.findIndex(
      (item) => item.entry_id == result.draggableId
    );
    
    const indexOfDestinationEntry = upcomingenteries.findIndex(
      (item) => item.id == result.destination.droppableId
    );

    // const userid = upcomingenteries.filter(
    //   (item) => item.entry_id == result.destination.droppableId
    // );

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
          const user = newsavedentrydata[indexOfDroppableEntry];
          getdate = item.date
      
          return {
            ...user,
            date: item.date,
          };
        } else return item;
      })
    );

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenSession()}`,
    };
    axios
      .put(`${config.apiEndPoint}addUpcomingEntry/`, {
        entryId: result.draggableId,
        playDate: `${getdate.getMonth() + 1}-${getdate.getDate()}-${getdate.getFullYear()}`,
      })
      .then((response) => {
        console.log(response.data)
      });
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
                  clickShowUser={(item) => handleClick(item)}
                  SavedMove={(item) => handleEntrieslist(item)}
                  removeSaved={(item) => handlesavedEntries(item)}
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
                    clickShowUser={(item) => handleClick(item)}
                    removeSaved={(item) => handlesavedEntries(item)}
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
            {
              console.log(userdata)
            }
            {<Userdata user={userdata} /> }
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
