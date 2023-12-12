import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base"
import { useContext, useEffect, useState } from "react";
import { updateUserPassword } from "../services/user-service";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { doLogout } from "../auth";
import { Toasts } from "../components/Toasts";

export const ChangePassword = () => {

    const navigate = useNavigate();
    const user = useContext(userContext);

    // console.log(user?.userinfo?.id);

    const [data, setData] = useState({
        id: '',
        currPassword: '',
        password: '',
        cpassword: ''

    });

    useEffect(()=>{
        setData({
            id: user.userinfo.id,
            currPassword: '',
            password: '',
            cpassword: ''
        })
        // setData({ ...data})
    },[user]);

    // console.log(data.id);

    const [error, setError, field] = useState({
        errors: {},
        fields: {},
        isError: false
    });

    const handleChange = (event, property) => {
        // setData({id: user.userinfo.id})
        setData({ ...data, [property]: event.target.value })
        // console.log(event);
    }

    const updatePassword = (event) => {
        event.preventDefault();
        console.log(data);
        if (data.currPassword === '') {
            // toast.error("Current Password cannot be empty");
            setError({error:"Current Password cannot be empty",field:"currPassword",isError:true})
            console.log(error);
            return;
        }
        else if (data.password === '') {
            // toast.error("Current Password cannot be empty");
            setError({error:"Password cannot be empty",field:"password",isError:true})
            console.log(error);
            return;
        }
        else if (data.cpassword === '') {
            // toast.error("Current Password cannot be empty");
            setError({error:"Confirm Password cannot be empty",field:"cpassword",isError:true})
            console.log(error);
            return;
        }

        updateUserPassword(data).then((response) => {
            toast.success(response.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setData({
                currPassword: '',
                password: '',
                cpassword: ''
            })
            doLogout(() => { navigate('/login') });
        }).catch((error) => {
            // doLogout(() => { navigate('/login') });
            // console.log(error);
            // Toasts("error",error?.response?.data);
            setError({
                errors: error,
                isError: true
            })
        });
        // console.log(error.errors?.response?.data);
        // console.log(data);
        console.log(error);
    }

    return (
        <Base>
            <Row className="mt-4">
                <Col sm={{ size: "6", offset: "3" }}>
                    <Container>
                        <Card>
                            <CardHeader>
                                <h2>Change Password</h2>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={updatePassword}>
                                    {' '}
                                    <FormGroup floating>
                                        <Input id="currPassword" type="password" placeholder="Enter Current Password"
                                            onChange={(e) => handleChange(e, 'currPassword')} value={data.currPassword}
                                            invalid={(error?.field == 'currPassword' ? true : false) || (error.errors?.response?.data?.field == "currPassword" ? true : false)}></Input>
                                        <FormFeedback>
                                            {error?.error || error.errors?.response?.data?.message}
                                        </FormFeedback>
                                        <Label for="currPassword">Current Password</Label>
                                    </FormGroup>
                                    {' '}
                                    <FormGroup floating>
                                        <Input id="password" type="password" placeholder="Enter New Password"
                                            onChange={(e) => handleChange(e, 'password')} value={data.password}
                                            invalid={error?.field == 'password' ? true : false || error.errors?.response?.data?.field == "password" ? true : false}></Input>
                                        <FormFeedback>
                                            {error?.error || error.errors?.response?.data?.message}
                                        </FormFeedback>
                                        <Label for="password">New Password</Label>
                                    </FormGroup>
                                    {' '}
                                    <FormGroup floating>
                                        <Input id="cpassword" type="password" placeholder="Confirm New Password"
                                            onChange={(e) => handleChange(e, 'cpassword')} value={data.cpassword}
                                            invalid={error?.field == 'cpassword' ? true : false || (error.errors?.response?.data?.field == 'cpassword' ? true : false)}></Input>
                                        <FormFeedback>
                                            {error?.error || error.errors?.response?.data?.message}
                                        </FormFeedback>
                                        <Label for="cpassword">Confirm New Password</Label>
                                    </FormGroup>
                                    {' '}
                                    <Container>
                                        <Button color="dark" type="submit">Submit</Button>
                                        {/* <Button color="secondary" className="ms-2" type="reset" onClick={resetData}>Reset</Button> */}
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
