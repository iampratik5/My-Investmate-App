import { Form, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Row, Table } from "reactstrap";
import { useEffect, useState } from "react";

export const Portfolio = () => {

    const { investmentType } = useParams();
    const [id, setId] = useState('');
    const portfolioData = [
        {
            id: 111,
            investment: "FD",
            startDate: "12/13/2023",
            endDate: "12/13/2023",
            amount: 100,
            bankName: "ABC",
            interestRate: 8,
            interestPayout: "Annually",
            taxBenefit: "Y",
            duration: "365",
            totalAmount: 108,
        }
    ]

    const column = Object.keys(portfolioData[0]);
    const thData = () => {
        return column.filter(key => key !== "id").map((data) => {
            return <th className="w-auto text-truncate" key={data}>{data.charAt(0).toUpperCase() + data.slice(1).replace(/([A-Z])/g, " $1")}</th>
        })
    }

    const tdData = () => {
        return portfolioData.map((data) => {
            return (
                <tr key={data.id}>
                    {
                        column.map((value) => {
                            //  console.log(value);
                            if (value !== "id") {
                                return <td key={value}>{data[value]}</td>
                            }
                        })
                    }
                    <td>
                        <Button
                            id="updateButton"
                            color="warning"
                            outline
                            size="sm"
                        // onClick={() => handleDeleteItem(data.id)}
                        >
                            Update
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    useEffect(() => {

    }, [portfolioData]);

    const calculateTotal = () => {
        const sum = portfolioData.map((data) => data?.amount).reduce(add, 0);
        function add(accumulator, a) {
            return parseInt(accumulator) + parseInt(a);
        }
        return sum;
    }

    return (
        <Base>
            <Row className="mt-3">
                <Col sm={{ size: "18", offset: "0" }}>
                    <Container>
                        <Card>
                            <CardHeader>
                                <h2>{investmentType}</h2>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup floating>
                                        <Table
                                            bordered
                                            hover
                                            responsive
                                        >
                                            <thead>
                                                <tr>
                                                    {thData()}
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tdData()}
                                                <tr className="table-success">
                                                    <td colSpan="2">
                                                        Total
                                                    </td>
                                                    <td colSpan="2">
                                                        {calculateTotal()}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </Base>
    )
}