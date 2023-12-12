import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { loginUser } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [loginDetail, setLoginDetail] = useState({
        email: '',
        password: '',
    });

    const [error, setError, field] = useState({
        errors: {},
        fields: {},
        isError: false
    });

    const resetData = () => {
        setLoginDetail({
            email: '',
            password: ''
        });
    };

    const handleChange = (event, property) => {
        setLoginDetail({ ...loginDetail, [property]: event.target.value })
    }

    const navigate = useNavigate();

    const submitLoginForm = (event) => {
        event.preventDefault();

        if (loginDetail.email == "") {
            // toast.error("Invalid Username or Password!");
            setError({error:"Username cannot be empty",field:"email",isError:true})
            return;
        }
        else if (loginDetail.password == "") {
            // toast.error("Invalid Username or Password!");
            setError({error:"Password cannot be empty",field:"password",isError:true})
            // console.log(error.field);
            return;
        }
        // console.log(error);

        loginUser(loginDetail).then((response) => {
            // console.log(response);
            doLogin(response,()=>{
                // toast.success("User Logged In : "+response.userDetails.email);
                // console.log(response);
                navigate("/user/dashboard");
            });
        }).catch((error) => {
            console.log(error);
            if (error?.response?.status == 401 || error?.response?.status == 404) {
                // toast.error("Invalid Username or Password!");
                toast.error(error.response.data.message);
            }
            else {
                toast.error("Somthing went wrong!");
            }
        });
    }

    return (
        <Base>
            <Row className="mt-4">
                <Col sm={{ size: "6", offset: "3" }}>
                    <Container>
                        <Card>
                            <CardHeader>
                                <h2>Login</h2>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitLoginForm}>
                                    <FormGroup floating>
                                        <Input id="email" type="email" placeholder="Enter Email"
                                            onChange={(e) => handleChange(e, 'email')} value={loginDetail.email}
                                            invalid={(error.isError == true && error.field == "email") ? true : false}></Input>
                                        <FormFeedback>
                                            {"Enter Email"}
                                        </FormFeedback>
                                        <Label for="email">Email</Label>
                                    </FormGroup>
                                    {' '}
                                    <FormGroup floating>
                                        <Input id="password" type="password" placeholder="Enter Password"
                                            onChange={(e) => handleChange(e, 'password')} value={loginDetail.password}
                                            invalid={(error.isError == true && error.field == "password") ? true : false}></Input>
                                        <FormFeedback>
                                            {"Enter Password"}
                                        </FormFeedback>
                                        <Label for="password">Password</Label>
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
        </Base>
    );
};

export default Login;