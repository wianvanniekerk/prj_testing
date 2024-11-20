function FormSection({ username, setUsername, password, setPassword }) {
    return (
      <section id="formBlock">
        <form id="form">
          <div className="formRow">
            <label>Username:</label>
            <input
              name="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="formRow">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
      </section>
    );
  }
  
  export default FormSection;
  