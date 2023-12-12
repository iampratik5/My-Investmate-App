import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { resendOTPApi, sendOTPApi, verifyOTPApi } from "../services/otp-service";
import { Toasts } from "./Toasts";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/user-service";
import { ValidateOtpInput } from "../validators/ValidateOtpInput";

export default function OTPInputBox({ data }) {
    const [otp, setOtp] = useState('');
    // const [email, setEmail] = useState(emailid);
    // const [userDetails, setUserDetails] = useState({name:name,emailId:emailid});
    const [otpDetails, setOTPDetails] = useState({eotp:'',emailId:''}); 
    const [resendOtpData, setResendOtpData] = useState({name:data?.name,emailId:data?.email}); 
    const [disabled, setDisabled] = useState(true);
    const duration = 5;
    const [remainingTime, setRemainingTime] = useState(duration); // 2 minutes in seconds
    const navigate = useNavigate();
    const resetOTPData = () => {
        setOtp('');
        setErrorFields('');
    }

    const [error, setError] = useState({
        errors: [],
        isError: false
    });
    const [errorFields, setErrorFields] = useState();

    useEffect(()=>{
        setOTPDetails({eotp:otp,emailId:data.email});
        // console.log(otp);
        setError({ ...error, errors: ValidateOtpInput(otp)});
    },[otp]);

    // console.log(error?.errors);

    // sendOTPApi(userDetails).then((response)=>{
    //     Toasts('info',"OTP sent")
    // }).catch((error)=>console.log(error));

    useEffect(() => {
        if (remainingTime > 0) {
          const timer = setInterval(() => {
            setRemainingTime(remainingTime => remainingTime - 1);
          }, 1000);
          return () => clearInterval(timer);
        } else {
          setDisabled(false);
        }
      }, [remainingTime]);

      const resendOtp = async () => {
        // console.log(data);    
        // console.log(resendOtpData);
        resendOTPApi(resendOtpData).then((response)=>{
            // signUpUser(data); //commented to avoud reg
            Toasts('success',"OTP has been sent!");
        }).catch((error)=>{
            // console.log(error)
            Toasts('error',error?.response?.data?.message);
        });
        setDisabled(true);
        setRemainingTime(duration);
      };

    const verifyOTP = async (event) => {
        event.preventDefault();
        // setError({ ...error, errors: ValidateOtpInput(otpDetails)});
        if(Object.keys(error.errors || {}).length != 0)
        {
            setErrorFields(error.errors);
            setError({ ...error, isError: true })
            // console.log("Failed");
            return;
        }
        else
        {
            setError({ ...error, isError: false });
            verifyOTPApi(otpDetails,data).then((response)=>{
                // signUpUser(data); //commented to avoud reg
                Toasts('success',"Account is successfully created!");
                navigate("/login");
            }).catch((error)=>{
                // console.log(error)
                Toasts('error',error?.response?.data?.message);
            });
        }
        // setUserDetails({otp:otp,emailId:emailid})
        // console.log(otp);
        // console.log(email);
        // console.log(otpDetails);
        // setError({ ...error, errors: ValidateOtpInput(otpDetails)}); 
        // verifyOTPApi(otpDetails).then((response)=>{
        //     // signUpUser(data); //commented to avoud reg
        //     // console.log(response);
        //     Toasts('success',"Account is successfully created!");
        //     navigate("/login");
        // }).catch((error)=>{
        //     console.log(error)
        //     Toasts('error',error?.response?.data?.message);
        // });
    }

    // useEffect(()=>{
    //     setOtp();
    // },[reset]);
    return (
        <>
            <Row className="mt-4">
                <Col sm={{ size: "6", offset: "3" }}>
                    <Container>
                        <Card>
                            <CardHeader>
                                <h2>Verify OTP</h2>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={verifyOTP}>
                                    <FormGroup floating>
                                        <p>
                                            OTP has been sent to signUped email id
                                        </p>
                                        {(error?.isError) && (
                                            <>
                                                {/* <OTPInputBox name={data.name} emailid={data.email} /> */}
                                                <p>
                                                    Invalid OTP
                                                </p>
                                            </>
                                        )}
                                        <OTPInput
                                            id="otp"
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            inputType={"number"}
                                            inputStyle={"OTPInput"}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    </FormGroup>
                                    {' '}
                                    <Container>
                                        <Button color="dark" type="submit" /*disabled={otp.length < 6}*/>Submit</Button>
                                        <Button color="secondary" className="ms-2" type="reset" disabled={otp.trim() === ''} onClick={resetOTPData}>Reset</Button>
                                    </Container>
                                    {' '}
                                    <br />
                                    <button type="button" disabled={disabled} onClick={resendOtp}>
                                        {remainingTime > 0 ? `Resend OTP (${Math.floor(remainingTime / 60)}:${remainingTime % 60})` : 'Resend OTP'}
                                    </button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </>
    );
}