import React from "react";

const authContext = React.createContext<any>(null);

function AuthContextComponent(props: any) {
  const [loggedInUser, setLoggedInUser] = React.useState<any>();

  React.useEffect(() => {
    async function addUser() {
      try {

        const storedUser = await localStorage.getItem("loggedInUser")

        const loggedInUser = await JSON.parse(storedUser || '""')

        setLoggedInUser({ ...loggedInUser })

      } catch (err) {
        console.log(err);
      }
    }
    addUser();
  }, []);

  return (
    <authContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </authContext.Provider>
  );
}

export { authContext, AuthContextComponent }
