import React, {useEffect, useState} from "react";
import AnswerService from "../services/answer.service";
import trophy from "../assets/trophy.json";
import Lottie from "lottie-react";
import AuthService from "../services/auth.service";

const ViewProfile = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        console.log(AuthService.getCurrentUser().id)
        getData()
    }, [])

    const getData = async() => {
        let res = await AnswerService.getAllAttemptedQuiz();
        setData(res.data)
        console.log(res.data)
    }
    return (
        <div style={{backgroundColor: "#533b7c"}}>
            <div style={{height: "30vh", backgroundColor: "#f7fdcb"}}>
                <center>
                    <Lottie animationData={trophy} loop={true} style={{height: "150px"}}/>
                    <h1>Miletstones Achieved</h1>
                </center>
            </div>
            <div style={{backgroundColor: "#533b7c", padding: "40px"}}>
                <table className="table table-hover mx-auto rounded shadow" style={{backgroundColor:"#f7fdcb",textAlign:"center"}}>
                    <thead>
                        <tr>
                            <th scope="col">Attempted Quiz</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, key) => {
                                return (
                                    <tr>
                                    <th scope="row">{item.title}</th>
                                
                                    <td>1</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default ViewProfile;