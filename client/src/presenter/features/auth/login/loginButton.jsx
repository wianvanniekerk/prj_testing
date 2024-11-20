function LoginButton({ isLoading }) {
    return (
      <button
        type="submit"
        id="loginButton"
        className={isLoading ? "load" : ""}
      >
        {isLoading ? "Completed" : "Verify"}
      </button>
    );
  }
  
  export default LoginButton;
  