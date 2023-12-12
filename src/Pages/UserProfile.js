import { Button, Card, CardBody, CardHeader, Col, Container, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { doLogout, doUserUpdate, getAuthToken, getCurrentUserDetails, isLoggedIn } from "../auth";
import { getImage, getUserDetails, updateUser, uploadImage } from "../services/user-service";
import { toast } from "react-toastify";
import { BASE_URL, privateAxios } from "../services/helper";
import { userContext } from "../context/userContext";
import { Toasts } from "../components/Toasts";
export const UserProfile = () => {

    const [login, setLogin] = useState(isLoggedIn());
    // const [user, setUser] = useState(null);
    const [data, setData] = useState(getCurrentUserDetails());
    const [uploadimage, setUploadImage] = useState(null);
    const [imageName, setImageName] = useState("default.png");
    const [tokenexpiry, setTokenexpiry] = useState();
    const [updated, setUpdated] = useState(false);
    const user = useContext(userContext);
    const { userId } = useParams();
    const navigate = useNavigate();
    //   console.log(token);
    //   console.log(user);
    // console.log(userId);

    const logout = () => {
        doLogout(() => {
            setLogin(false);
            navigate("/");
        });
    }

    useEffect(() => {
        getUserDetails(userId).then((data) => {
            // console.log(userId)
            setData({ ...data })
        });
        // .catch(()=>{
        //     doLogout(() => {toast.info("Session Expired, Login");navigate('/login')});
        // });
    }, []);
    // console.log(data);

    useEffect(() => {
        setLogin(isLoggedIn())
        // getUserDetails(userId).then(response=>{
        // console.log(user);
        setData({ ...user?.userinfo });
        setImageName(user?.userinfo?.imageName);
    }, [user]);

    useEffect(() => {
        setUpdated(updated);
        // getUserDetails(userId);
    }, [user]);

    const [image, setImage] = useState("default.png");

    const getBase64 = (blob) => {
        // console.log(blob);
        // if(blob instanceof Blob)
        // {
        // console.log("trueeeeeeeeeeeeeeeeeeeeeeee");
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
        // }
    }

    const storeImage = async (imageBlob) => {
        // const base64String = await getBase64(imageBlob);
        localStorage.setItem('image', imageBlob);
    };

    useEffect(() => {
        // Fetch the image from the API
        if (imageName != undefined) {
            getImage(imageName)
                .then(imageBlob => {
                    if (imageBlob instanceof Blob) {
                        // console.log("Image Blob: "+imageBlob)
                        // if(!imageBlob || imageBlob == undefined)
                        //     return;
                        // Convert the image blob to base64 string
                        getBase64(imageBlob)
                            .then(base64String => {
                                // Store the base64 string in localStorage
                                storeImage(base64String);
                                // Update the state with the base64 string
                                setImage(base64String);
                            });
                    }
                }).catch((error => {
                    console.log(error);
                }));
        }
    }, [imageName]);
    // console.log(imageName);
    
    // const userImage = getImage(image).then((response)=>{
    //     console.log(image);
    //     setImage(response?.image)
    // }).catch((error)=>{
    //     console.log(error);
    // });
    
    const [error, setError] = useState({
        errors: [],
        isError: false
    })
    const handleChange = (event, property, updated) => {
        setData({ ...data, [property]: event.target.value })
        // console.log(updated);
        setUpdated(true);
    }

    const handleFileChange = (event) => {
        // console.log(event.target.files[0]);
        setUploadImage(event.target.files[0]);
    }
    const uploadProfileImage = (event) => {
        event.preventDefault();
        console.log(event);
        // if(event.target.files == null) 
        // {
        //     Toasts("error","Choose file to upload");
        //     return;
        // }
        // console.log(user.userinfo.id);
        user['userId'] = user?.userinfo?.id;
        // console.log(user.userId);
        uploadImage(uploadimage, user.userId).then(response => {
            Toasts("success", response.message);
        }).catch((error) => {
            // console.log(error);
            setError({
                errors: error,
                isError: true
            })
        });
    }

    const updateProfile = (event) => {
        event.preventDefault();

        updateUser(data.id, data).then((response) => {
            if (!response)
                logout();
            // console.log("Sucess")
            Toasts("success", response.message);
            setData({
                ...data,
            });
            doUserUpdate(data, (res) => { });
        }).catch((error) => {
            console.log(error);
            setError({
                errors: error,
                isError: true
            })
        });
    }

    return (
        <Base>
            <Container>
                <Card className="mt-4">
                    <CardHeader>
                        <h2>My Profile</h2>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={updateProfile}>
                            {/* {JSON.stringify(image)} */}
                            <Row className="mt-4">
                                <Col className="col-5">
                                    {/* <Card > */}
                                    <img
                                        // src={BASE_URL + '/api/v1/users/image/' + image}
                                        src={localStorage.getItem('image')}
                                        // src = {getImage(image).then().catch()}
                                        className="img-fluid"
                                        style={{ width: "150px" }}
                                        // class="rounded-circle" style={{width: "150px"}}
                                        alt="Profile Photo" />
                                    {/* </Card> */}
                                    <>
                                        <br />
                                        <br />
                                    </>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <Button className="mt-2" color="dark" type="Upload" onClick={uploadProfileImage}>Upload</Button>
                                </Col>
                                <Col className="col-6">
                                    <FormGroup floating>
                                        <Input id="name" type="text" placeholder="Enter Name"
                                            onChange={(e) => handleChange(e, 'name', 'true')} value={data?.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}></Input>
                                        <FormFeedback>
                                            {error.errors?.response?.data?.name || error.errors?.response?.data?.message}
                                        </FormFeedback>
                                        <Label for="name">Name</Label>
                                    </FormGroup>
                                    <Row>
                                        <Col className="col-6">
                                            <FormGroup floating>
                                                <Input id="email" type="text" placeholder="Enter Email"
                                                    onChange={(e) => handleChange(e, 'email')} value={data?.email}
                                                    invalid={error.errors?.response?.data?.email ? true : false}></Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.email || error.errors?.response?.data?.message}
                                                </FormFeedback>
                                                <Label for="email">Email</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-6">
                                            <InputGroup>
                                                <FormGroup floating>
                                                    <Input id="mobile" type="number" placeholder="Enter Mobile Number"
                                                        onChange={(e) => handleChange(e, 'mobile')} value={data?.mobile}
                                                        invalid={error.errors?.response?.data?.mobile ? true : false}>
                                                    </Input>
                                                    <Label for="mobile">Mobile</Label>
                                                    <FormFeedback>
                                                        {error.errors?.response?.data?.mobileNumber || error.errors?.response?.data?.message}
                                                    </FormFeedback>
                                                </FormGroup>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-6">
                                            <FormGroup floating>
                                                <Input id="dob" type="date" placeholder="Date of Birth"
                                                    onChange={(e) => handleChange(e, 'dob')} value={data?.dob}
                                                    invalid={error.errors?.response?.data?.dob ? true : false}></Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.dob || error.errors?.response?.data?.message}
                                                </FormFeedback>
                                                <Label for="dob">Date of Birth</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col className="col-6">
                                            <FormGroup floating>
                                                <Input id="gender" type="select" placeholder="Select Gender"
                                                    onChange={(e) => handleChange(e, 'gender')} value={data?.gender}
                                                    invalid={error.errors?.response?.data?.gender ? true : false}>
                                                    <option>

                                                    </option>
                                                    <option>
                                                        Male
                                                    </option>
                                                    <option>
                                                        Female
                                                    </option>
                                                </Input>
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.gender || error.errors?.response?.data?.message}
                                                </FormFeedback>
                                                <Label for="gender">Gender</Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col className="col-6">
                                            {/* {JSON.stringify(updated)} */}
                                            <Button color="dark" type="submit" disabled={updated ? false : true}>Save</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row >
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </Base >
    );
}