function RegisterLink({ onClick }) {
    return (
      <p>
        Don't have an account?
        <span id="registerUser" onClick={onClick}>
          {" "}
          Register
        </span>
      </p>
    );
  }
  
  export default RegisterLink;
  