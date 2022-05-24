import { useState, Fragment } from "react";
import "./sign-in-form.styles.scss";
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

let defaultFormFields = {
  email: "",
  password: ""
};

function SignInForm() {
  let [formFields, setFormFields] = useState(defaultFormFields);

  let { email, password } = formFields;
  

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  async function signInWithGoogle(){
    const response = await signInWithGooglePopup();
    console.log(response);
    createUserDocumentFromAuth(response.user);
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    try{
      
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    }catch(error){
     
     switch(error.code){
       case 'auth/wrong-password' :
        alert('Incorrect password for email');
        break;
      case 'auth/user-not-found' :
        alert('No user asscociated with this email');
        break;
      default: 
        console.log(error);
     }
    
    }

  }

  function resetFormFields(){
    setFormFields(defaultFormFields);
  }

  return (
    <Fragment>
      <div className="sign-up-container">
        <h2>Already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange}/>
          <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange}/>
          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType='google' onClick = {signInWithGoogle}>Google Sign In</Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SignInForm;
