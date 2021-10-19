const asyncThunkError = (error, rejectWithValue) => {
  if (error.response) {
    return rejectWithValue({
      data: error.response.data,
      status: error.response.status,
    });
  } else if (error.request) {
    return rejectWithValue({
      data: { message: "Something went wrong!" },
      status: 500,
    });
  } else {
    console.log("Something went wrong!");
  }
};

export default asyncThunkError;
