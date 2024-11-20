function PasswordForm({ isPassVisible, isPassButtonVisible, password, setPassword, handlePasswordUpdate }) {
  return (
    <form
      id="passForm"
      className={`${isPassVisible ? "show" : "hide"} updateForm`}
      onSubmit={handlePasswordUpdate}
    >
      <input
        type="password"
        name="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        id="passUpdate"
        className={`${isPassButtonVisible ? "show" : "hide"} button`}
      >
        Update Password
      </button>
    </form>
  );
}

export default PasswordForm;
