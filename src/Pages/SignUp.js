import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUpUser, signUpUserApi } from "../services/user-service"
import { toast } from "react-toastify";
import OTPInputBox from "../components/OTPInputBox";
import { sendOTPApi } from "../services/otp-service";
import { Toasts } from "../components/Toasts";
import { ValidateSignUp } from "../validators/ValidateSignUp";
export default function () {

    const [isOTPForm, setIsOTPForm] = useState(false); //OTP Verification box
    const [isSubmitFormOpen, setIsSubmitFormOpen] = useState(true);
    const [pressed, setPressed] = useState();
    const [errorFields, setErrorFields] = useState();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''

    })

    const [error, setError] = useState({
        errors: [],
        isError: false
    });
    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value })
    }

    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            cpassword: '',
        });
        setErrorFields('');
    }

    const [userDetails, setUserDetails] = useState({ name: '', emailId: '' });

    useEffect(() => {
        setUserDetails({ name: data.name, emailId: data.email });
        setError({ ...error, errors: ValidateSignUp(data) });
    }, [data]);

    // useEffect(()=>{setError({errors:ValidateSignUp(data)})},[data])
    // useEffect(()=>{
    //     console.log(error.errors);
    //     console.log(errorFields);
    //     if(Object.keys(error.errors || {}).length == 0 && errorFields!=undefined)
    //     {
    //         console.log("Inside IFFF")
    //         setIsSubmitFormOpen(false);
    //         setIsOTPForm(true);
    //     }
    // },[data])
    // useEffect(()=>{
    //     if(!error.isError)
    //     {
    //         console.log("Inside update forms");
    //         // setIsSubmitFormOpen(false);
    //         // setIsOTPForm(true);
    //         setError({...error,isError:false})
    //         console.log(error.isError);
    //     }
    // },[]);

    // const [x,setX] = useState(error.errors);
    // useEffect(()=>{
    //     console.log("HI P");
    //     // setX(error.errors);
    // },[pressed])

    // useEffect(()=>{
    // if (Object.keys(error.errors || {}).length == 0) 
    // {
    //     console.log("ELSE");
    //     setError({ ...error, isError: false });
    //     setIsSubmitFormOpen(false);
    //     setIsOTPForm(true);
    //     console.log(errorFields);
    //     console.log(isOTPForm);
    // }
    // },[errorFields]);

    // function OTPVerification() {
    //     // useEffect(()=>{
    //     //     if (Object.keys(error.errors || {}).length == 0) 
    //     //     {
    //     //         console.log("ELSE");
    //     //         setError({ ...error, isError: false });
    //     //         setIsSubmitFormOpen(false);
    //     //         setIsOTPForm(true);
    //     //         console.log(errorFields);
    //     //         console.log(isOTPForm);
    //     //     }
    //     // },[]);
    //     // console.log(Object.keys(error.errors || {}).length)
    //     if (Object.keys(error.errors || {}).length == 0) {
    //         console.log("ELSE");
    //         setError({ ...error, isError: false });
    //         setIsSubmitFormOpen(false);
    //         setIsOTPForm(true);
    //         // console.log(errorFields);
    //         console.log(isOTPForm);
    //     }
    // }
    // useEffect(() => {
    //     if (!error.isError && errorFields != undefined) {
    //         console.log("Inside useEffect")
    //         setError({ ...error, isError: false });
    //         setIsSubmitFormOpen(false);
    //         setIsOTPForm(true);
    //         console.log(isSubmitFormOpen);
    //         console.log(isOTPForm);
    //     }
    // }, [error.isError, data])

    // useEffect(()=>{OTPVerification();},[error])
    // console.log(Object.keys(error.errors || {}).length == 0);
    // if(Object.keys(error.errors || {}).length == 0 && errorFields!=undefined)
    // OTPVerification();

    // useEffect(()=>{
    //     if(!isSubmitFormOpen && isOTPForm && !error.isError)
    //     {
    //         setIsSubmitFormOpen(false);
    //         setIsOTPForm(true);
    //         console.log("Inside isSubmitFormOpen IF : "+isSubmitFormOpen);
    //         console.log("Inside isOTPForm IF : "+isOTPForm);
    //         console.log("Inside error.isError IF : "+error.isError);
    //         console.log(error);
            
    //     }
    // },[isSubmitFormOpen,isOTPForm]);

    // var a = this.isSubmitFormOpen;
    // console.log("A "+a);

    // useEffect(()=>{
    //     if (!isSubmitFormOpen && isOTPForm && !error.isError) {
    //         console.log(userDetails);
    //         sendOTPApi(userDetails).then((response) => {
    //             Toasts('info', "OTP sent");
    //         }).catch((error) => console.log(error));
    //     }
    // },[isOTPForm]);

    const [isValid, setIsValid] = useState(false);
    // var res = null;
    async function signUpApiCall() {
        const res = await signUpUser(data);
        // setRes(res);
        // console.log(data);
        if(res?.success)
        {
            // console.log("Send OTP");
            setIsSubmitFormOpen(false);
            setIsOTPForm(true);
            // return true;
        }
        else
        {
            Toasts('info', res?.response?.data?.message);
            // return false;
            setIsSubmitFormOpen(true);
            setIsOTPForm(false);
            return;
        }
    }

    const submitForm = async (event) => {
        // console.log("OTP Form: "+isOTPForm+" SubmitForm: "+isSubmitFormOpen);
        event.preventDefault();
        if (Object.keys(error.errors || {}).length != 0) {
            setErrorFields(error.errors);
            setError({ ...error, isError: true })
            console.log("Failed");
            return;
        }
        else {
            // console.log("Inside SubmitForm Else");
            // console.log("OTP Form: "+isOTPForm+" SubmitForm: "+isSubmitFormOpen);
            setError({ ...error, isError: false });
            signUpApiCall();
            setIsSubmitFormOpen(false);
            setIsOTPForm(true);
            // signUpApiCall().then((res)=>{
            //     if(res){
            //         setIsSubmitFormOpen(false);
            //         setIsOTPForm(true);
            //     }
            //     // setIsSubmitFormOpen(false);
            //     // setIsOTPForm(true);
            // }).catch((error) => { console.log(error) });
            // if(a)
            // {
            //     setIsSubmitFormOpen(false);
            //     setIsOTPForm(true);
            // }
            // else
            //     return;
            // console.log(data);
            // signUpUser(data);
            // console.log(signUpUser(data));
            // console.log(res);
        }
        // // OTPVerification();
        // console.log("Shold be false " + error.isError);
        // // console.log("In else");
        // setIsSubmitFormOpen(false);
        // console.log(isSubmitFormOpen);
        // console.log(isOTPForm);
        // sendOTPApi(userDetails).then((response) => {
        //     Toasts('info', "OTP sent");
        // }).catch((error) => console.log(error));
        // if (!isSubmitFormOpen && isOTPForm && !error.isError) {
        //     // console.log(error.isError);
        //     // console.log("Inside IF OTP");
        //     // sendOTPApi(userDetails).then((response)=>{
        //     //     Toasts('info',"OTP sent")
        //     // }).catch((error)=>console.log(error));
        // }

        // console.log("signUp API Call");
        /* signUpUserApi(data).then((response) => {
            // console.log(response)
            // console.log("Sucess")
            toast.success(response.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setData({
                name: '',
                email: '',
                password: '',
                cpassword: ''
            })
        }).catch((error) => {
            console.log(error);
            setError({
                errors: error,
                isError: true
            })
        }); */
    }

    return (
        <Base>
            {/* {console.log(isSubmitFormOpen)} */}
            {(isSubmitFormOpen || error.isError == true) && (
                <>
                    <Row className="mt-4">
                        {/* {JSON.stringify(data)} */}
                        <Col sm={{ size: "6", offset: "3" }}>
                            <Container>
                                <Card>
                                    <CardHeader>
                                        <h2>Sign Up</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <Form onSubmit={submitForm}>
                                            <FormGroup floating>
                                                <Input id="name" type="text" placeholder="Enter Name"
                                                    onChange={(e) => handleChange(e, 'name')} value={data.name}
                                                    invalid={(error.errors?.response?.data?.name ? true : false) || (errorFields?.name ? true : false)}></Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.name || error.errors?.response?.data?.message || errorFields?.name}
                                                </FormFeedback>
                                                <Label for="name">Name</Label>
                                            </FormGroup>
                                            {' '}
                                            <FormGroup floating>
                                                <Input id="email" type="email" placeholder="Enter Email"
                                                    onChange={(e) => handleChange(e, 'email')} value={data.email}
                                                    invalid={(error.errors?.response?.data?.email ? true : false) || (error.errors?.response?.data?.field == 'email' ? true : false) || (errorFields?.email ? true : false)}></Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.email || error.errors?.response?.data?.message || errorFields?.email}
                                                </FormFeedback>
                                                <Label for="email">Email</Label>
                                            </FormGroup>
                                            {' '}
                                            <FormGroup floating>
                                                <Input id="password" type="password" placeholder="Enter Password"
                                                    onChange={(e) => handleChange(e, 'password')} value={data.password}
                                                    invalid={(error.errors?.response?.data?.password ? true : false) || (errorFields?.password ? true : false)}></Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.password || error.errors?.response?.data?.message || errorFields?.password}
                                                </FormFeedback>
                                                <Label for="password">Password</Label>
                                            </FormGroup>
                                            {' '}
                                            <FormGroup floating>
                                                <Input id="cpassword" type="password" placeholder="Confirm Password"
                                                    onChange={(e) => handleChange(e, 'cpassword')} value={data.cpassword}
                                                    invalid={error.errors?.response?.data?.cpassword ? true : false || (error.errors?.response?.data?.field == 'cpassword' ? true : false) || (errorFields?.cpassword ? true : false)}></Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.cpassword || error.errors?.response?.data?.message || errorFields?.cpassword}
                                                </FormFeedback>
                                                <Label for="cpassword">Confirm Password</Label>
                                            </FormGroup>
                                            {' '}
                                            <Container>
                                                <Button color="dark" type="submit">Submit</Button>
                                                <Button color="secondary" className="ms-2" type="reset" onClick={resetData}>Reset</Button>
                                            </Container>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Container>
                        </Col>
                    </Row>
                </>
            )}
            {/* {console.log("isOTPForm: "+isOTPForm+" --- "+"isError:"+error.isError)} */}
            {(isOTPForm && !error.isError) && (
                <>
                    {/* <OTPInputBox name={data.name} emailid={data.email} /> */}
                    <OTPInputBox data={data} />
                </>
            )}
        </Base >
    );
};

// export default SignUp;