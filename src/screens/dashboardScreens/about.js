import { useEffect } from "react";
import { useState } from "react";
import MyCheckBox from "../../components/CheckBox";
import SMGrid from "../../components/SMGrid";
import { Get } from "../../config/apibasemethods";

function About() {
  const [usersList, setUsersList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchAbled, setSearchAbled] = useState(true);

  let handleChange = () => {
    setSearchAbled(!searchAbled);
  };

  let columns = [
    {
      key: "username",
      displayName: "User Name",
      searchAble: searchAbled,
    },
    {
      key: "email",
      displayName: "Email",
      searchAble: searchAbled,
    },
    {
      key: "phone",
      displayName: "Contact #",
      searchAble: searchAbled,
    },
    {
      key: "website",
      displayName: "Website URL",
      searchAble: searchAbled,
    },
    {
      key: "name",
      displayName: "Full Name",
      searchAble: searchAbled,
    },
  ];

  let getUsers = () => {
    setLoader(true);
    Get("users")
      .then((res) => {
        setLoader(false);
        setUsersList([...res.data]);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>About</h1>
      <MyCheckBox onClick={() => handleChange()} color="default" />
      <SMGrid
        isLoading={loader}
        title="Users Data"
        datasource={usersList}
        columns={columns}
      />
    </>
  );
}

export default About;
