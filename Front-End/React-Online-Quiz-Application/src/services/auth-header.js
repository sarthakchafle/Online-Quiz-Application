export default function authHeader() {
  const user = localStorage.getItem("user");

  if (user) {
    console.log(true + user);
    return {
      Authorization: "Bearer " + user,
    }; // for Spring Boot back-end
  } else {
    return {};
  }
}
