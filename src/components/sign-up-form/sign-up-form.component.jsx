import { useState, Fragment } from "react";
import "./sign-up-form.styles.scss";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

let defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  let [formFields, setFormFields] = useState(defaultFormFields);

  let { displayName, email, password, confirmPassword } = formFields;
  

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(password !== confirmPassword){
      alert('Passwords do not match');
      return;
    }
    try{
      let {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    }catch(error){
      debugger;
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }else if(error.code === 'auth/weak-password'){
        alert(error.message);
      } 
      else {
        console.log('user creation encountered an error', error);
      }
    }

  }

  function resetFormFields(){
    setFormFields(defaultFormFields);
  }

  return (
    <Fragment>
      <div className="sign-up-container">
        <h2>Don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput label="Display Name" type="text" required name="displayName" value={displayName} onChange={handleChange}/>
          <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange}/>
          <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange}/>
          <FormInput
            label="Confirm Password"
            type="password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </Fragment>
  );
}

export default SignUpForm;
