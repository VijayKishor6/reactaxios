import api from "./Interceptor";


// export const fetchUserData = async () => {
//   await axios
//     .get(
//       "https://fts-backend.onrender.com/admin/testing/getallusers?offset=1&limit=10"
//     )
//     .then((response) => {
//       console.log(response);
//       return (response)
//     })
//     .catch((err) => {
//       console.log(err);
//     });

// };

export const addUserData = async (formData) => {
  await api.post("/user/newRegistration", formData)
    .then((response) => {
      console.log(response);

      return (response)


    })
};

export const deleteUserData = async (id) => {
  await api.delete(`/admin/testing/deleteUserById?id=${id}`)
  return "success";
}

export const editUserData = async (id, formData) => {
  await api.put(`/admin/testing/editUserById?id=${id}`, formData)
  return "success";
}

