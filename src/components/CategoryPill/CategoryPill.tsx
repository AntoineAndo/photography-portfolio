import React from "react";
import "./CategoryPill.scss";

function CategoryPill({ name, onClick }: any) {
  return (
    <div>
      <input
        type="radio"
        name="category-radio"
        id={name}
        value={name}
        onClick={onClick}
      />
      <label htmlFor={name} className="pill">
        {name}
      </label>
    </div>
  );
}

export default CategoryPill;
