import { useSearchParams } from "react-router-dom";
import ButtonAppBar from "./Appbar";

function HomePage() {

//  const params = useParams();
 const [searchParams] = useSearchParams();

 const name = searchParams.get("name");
 const email = searchParams.get("email");
 const password = searchParams.get("password");
 const confirmPassword = searchParams.get("confirmPassword");

  console.log("this is Home");
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);

  return (
    <>
    <ButtonAppBar />
      <div style={{display:'flex',padding:'5%'}}>
        <p>This is home HomePage</p>
        <br />
        <p>{name}</p>
        <br />
        <p>{email}</p>
        <br />
        <p>{password}</p>
        <br />
        <p>{confirmPassword}</p>
        <br />
      </div>
    </>
  );
}

export default HomePage;
