const CustomToolbar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select
          className="ql-size"
          defaultValue={""}
          onChange={(e) => e.persist()}
        >
          <option value="small"></option>
          <option value="large"></option>
          <option value="huge"></option>
          <option selected></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-blockquote"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-link"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color">
          <option value="green"></option>
          <option value="red"></option>
          <option value="white"></option>
          <option value="black"></option>
          <option selected></option>
        </select>
        <select className="ql-background">
          <option value="green"></option>
          <option value="red"></option>
          <option value="white"></option>
          <option value="black"></option>
          <option selected></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-header" value="1"></button>
        <button className="ql-header" value="2"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option selected></option>
        </select>
      </span>
      <span className="ql-formats">
        <select className="ql-align">
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
          <option selected></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-clean"></button>
      </span>
    </div>
  );
};

export default CustomToolbar;
