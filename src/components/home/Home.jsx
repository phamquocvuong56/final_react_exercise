import React, { useState, useEffect, useRef, useMemo } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { reactMembers, javaMembers, editInfo } from "../Recoil";
import {useRecoilState} from 'recoil'
// import FormEdit from '../formEdit/FormEdit'
import "../../css/Style.css";
export default function Home(props) {
  const [reactMember, setReactMember] = useRecoilState(reactMembers);
  const [javaMember, setJavaMember] = useRecoilState(javaMembers);
  const [info, setInfo]  = useRecoilState(editInfo);
  let navigate = useNavigate();
  const Member = (props) => {
    const { name, age, handleTransfer, handleEdit, handleDelete } = props;
    return (
      <div>
        <div>
          {" "}
          name: {name}, age: {age}
        </div>
        <button
          onClick={() => {
            handleTransfer();
          }}
        >
          Transfer
        </button>
        <button
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (reactMember.length === 0) {
      alert("Warning: react class is empty now");
    } else if (javaMember.length === 0) {
      alert("Warning: java class is empty now");
    }
  }, [reactMember.length, javaMember.length]);

  const TransferReactToJava = (index) => {
    const e1 = [...reactMember]
    const e2 = e1.splice(index, 1);
    setReactMember([...e1]);
    setJavaMember([...javaMember, e2]);
  };
  const TransferJavaToReact = (index) => {
    const e1 = [...javaMember]
    const e2 = e1.splice(index, 1);
    setJavaMember([...e1]);
    setReactMember([...reactMember, e2]);
  };

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    classType: "react",
  });

  //search by name, sort by age
  const [searchUsers, setSearchUsers] = useState("");
  const sort = {
    no: 0,
    up: 1,
    down: 2,
  };

  //display users from list
  const getUsers = (list) => {
    let res = [...list];
    //search
    if (searchUsers) {
      res = res.filter((e1) => e1.name.includes(searchUsers));
    }
    // sort
    if (sortType !== sort.no) {
      res.sort((a, b) => {
        if (sortType === sort.up) return parseInt(a.age) - parseInt(b.age);
        else return parseInt(b.age) - parseInt(a.age);
      });
    }
    return res;
  };
  const [sortType, setSortType] = useState(sort.no);
  // change button text
  const getSortType = () => {
    return sortType === 0 ? "no" : sortType === 1 ? "up" : "down";
  };
  // change sort type wherever click the button
  const handleSort = () => {
    return sortType === 0
      ? setSortType(sort.up)
      : sortType === 1
      ? setSortType(sort.down)
      : setSortType(sort.no);
  };

  // edit users

  const reactEdit = (index) => {
    setInfo({
      name: reactMember[index].name,
      age: reactMember[index].age,
      type: 'react',
      index
    })
    // refInputFocus.current.focus();
    navigate("/edit")
  };
  const javaEdit =(index)=>{
    setInfo({
      name: javaMember[index].name,
      age: javaMember[index].age,
      type: 'java',
      index
    })
    // refInputFocus.current.focus();
    navigate("/edit")
  }

  //delete users

  const reactDelete = (index)=>{
    const e1= [...reactMember]
    const e2= e1.splice(index, 1)
    setReactMember([...e1])
    console.log(e1)
  }
  const javaDelete = (index)=>{
    const e1= [...javaMember]
    const e2= e1.splice(index, 1)
    setJavaMember([...e1])
  }
// focus input tag
const refInputFocus =useRef();

// optimize performance thanks to useMemo
const ReactUsersToRender = useMemo(()=>getUsers(reactMember))
const JavaUsersToRender = useMemo(()=>getUsers(javaMember))
  return (
    <div className="container">
      <h2>search by name</h2>
      <div>
        Search by name:{" "}
        <input
          value={searchUsers}
          onChange={(e) => setSearchUsers(e.target.value)}
        />
      </div>
      <h2>sort by age: </h2>
      <button
        type="button"
        onClick={() => {
          handleSort();
        }}
      >
        Sort: {getSortType()}
      </button>
      <div className="head">List members of React class</div> <br />
      <div>
        {reactMember.length > 0
          ? ReactUsersToRender.map((user, index) => {
              return (
                <div className="list react-class">
                  <Member
                    key={index}
                    name={user.name}
                    age={user.age}
                    handleTransfer={() => {
                      TransferReactToJava(index);
                    }}
                    handleEdit={() => {
                      reactEdit(index);
                    }}
                    handleDelete={()=>{
                      reactDelete(index);
                    }}
                  />
                </div>
              );
            })
          : "empty"}
      </div>
      <br />
      <div className="head">List members of Java class</div> <br />
      <div>
        {javaMember.length > 0
          ? JavaUsersToRender.map((user, index) => {
              return (
                <div className="list java-class">
                  <Member
                    key={index}
                    name={user.name}
                    age={user.age}
                    handleTransfer={() => {
                      TransferJavaToReact(index);
                    }}
                    handleEdit={() => {
                      javaEdit(index);
                    }}
                    handleDelete={()=>{
                      javaDelete(index);
                    }}
                  />
                </div>
              );
            })
          : "empty class"}
      </div>
      <br />
      <Link to="/add">Go to form add page</Link>
    </div>
  );
}
