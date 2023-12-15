import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../auth";
import Base from "../components/Base";
import { Toasts } from "../components/Toasts";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";
import AlertDialog from "../components/AlertDialogue";


export const UserDashboard = () => {
    const tData = [
        { id: 111, investment: "FD", date: "12/13/2023", amount: 100 },
        { id: 222, investment: "MF", date: "12/13/2023", amount: 200 }
    ]
    const [id, setId] = useState('');
    const [newRecordData, setNewRecordData] = useState({
        investment: '',
        date: '',
        amount: 0
    })
    const [tableData, setTableData] = useState(tData);
    
    const [error, setError] = useState({
        errors: [],
        isError: false
    });
    
    const [showModal, setShowModal] = useState(false);

    const handleDeleteItem = (id) => {
        setShowModal(true);
        setId(id);
      };

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleConfirm = () => {
        setShowModal(false);
        const updatedData = tableData.filter((item) => item.id !== id);
        setTableData(updatedData);
    }

    const handleChange = (event, property) => {
        setNewRecordData({ ...newRecordData, [property]: event.target.value })
    }
    const column = Object.keys(tableData[0]);
    const thData = () => {
        return column.filter(key => key !== "id").map((data) => {
            return <th key={data}>{data.charAt(0).toUpperCase()+data.slice(1)}</th>
        })
    }
    const tdData = () => {
        return tableData.map((data) => {   
            return (
                <tr key={data.id}>
                    {
                        column.map((value) => {
                            //  console.log(value);
                            if (value !== "id")
                                return <td key={value}>{data[value]}</td>
                        })
                    }
                    <td>
                        <Button
                            id="deleteButton"
                            color="danger"
                            outline
                            size="sm"
                            onClick={()=>handleDeleteItem(data.id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    const addRecord = (event) => {
        event.preventDefault();
        tableData.push(newRecordData);

    }

    useEffect(() => {
        
    }, [tableData]);

    const insertData = () => {
        return (
            <Table
                bordered
                hover
                responsive
            >
                <tbody>
                    <tr>
                        <td>
                            <Input
                                id="investment"
                                name="investment"
                                type="select"
                                placeholder="Investment Type"
                                onChange={(e) => handleChange(e, 'investment')} 
                                value={tableData.Investment}
                            >
                                <option>

                                </option>
                                <option>
                                    Fixed Deposits
                                </option>
                                <option>
                                    Stock
                                </option>
                                <option>
                                    Mutual Funds
                                </option>
                                <option>
                                    Gold
                                </option>
                                <option>
                                    Other
                                </option>
                            </Input>
                        </td>
                        <td>
                            <Input
                                id="date"
                                name="date"
                                placeholder="Date"
                                type="date"
                                onChange={(e) => handleChange(e, 'date')} 
                                value={tableData.Date}
                            />
                        </td>
                        <td>
                            <Input
                                id="amount"
                                name="amount"
                                placeholder="Amount"
                                type="number"
                                onChange={(e) => handleChange(e, 'amount')} 
                                value={tableData.Amount}
                            />
                        </td>
                        <td>
                            <div>
                                <Button
                                    color="primary"
                                    outline
                                    size="sm"
                                    onClick={addRecord}
                                >
                                    Add
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>)
    }

    const calculateTotal = () => {
        const sum = tableData.map((data)=>data?.amount).reduce(add,0);
        function add(accumulator, a) {
            return parseInt(accumulator) + parseInt(a);
          }
        return sum;
    }

    return (
        <Base>
            <Row className="mt-4">
                <Col sm={{ size: "6", offset: "3" }}>
                    <Container>
                        <Card>
                            <CardHeader>
                                <h2>Dashboard</h2>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup floating>
                                        <h6>Add new record</h6>
                                        {insertData()}
                                        <h6>Total Investments</h6>
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
            {(showModal) && (
                <>
                    <AlertDialog 
                        msg={"Do you really want to delete record?"} 
                        isOpen={showModal} 
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                    />
                </>
            )}
        </Base>
    );
}