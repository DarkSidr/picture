const clearFormState = (state) => {
  for (let key in state) {
    delete state[key];
  }
};

export default clearFormState;
