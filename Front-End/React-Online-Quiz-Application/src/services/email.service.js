import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  "http://apigateway-env.eba-prjw3tjy.ap-southeast-1.elasticbeanstalk.com/email-service/";

const sendMail = async (param) => {
  console.log({ param });
  return fetch(
    `${API_URL}sendMail?email=${param.email}&score=${param.score}&title=${param.title}`,
    {
      method: "post",
      headers: authHeader(),
    }
  );
  //   return axios.post(`${API_URL}sendMail?email=${param.email}&score=${param.score}&title=${param.title}`, {
  //     headers: authHeader(),
  //     "Content-Type": "application/json",
  //   });
};

const EmailService = {
  sendMail,
};

export default EmailService;
