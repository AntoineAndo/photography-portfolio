---
const { name, onClick } = Astro.props;
console.log(onClick);
---

<div>
  <input type="radio" name="selected-category" id={name} value={name} />
  <label for={name} class="pill">
    {name}
  </label>
</div>

<style lang="scss">
  .pill {
    border: solid 1px white;
    padding: 10px;
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  input {
    display: none;
  }

  input:checked ~ .pill {
    background-color: white;
    color: black;
  }
</style>
