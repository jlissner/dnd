function suspendable(action) {
  const result = { status: 'pending' };
  const suspender = action.then((data) => {
      result.status = 'success';
      result.data = data;
    }).catch((error) => {
      result.status = 'error';
      result.data = error;
    }
  );

  return {
    read() {
      const { data, status } = result;

      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw data;
      } else if (status === "success") {
        return data;
      }
    }
  };
}

export default suspendable;
