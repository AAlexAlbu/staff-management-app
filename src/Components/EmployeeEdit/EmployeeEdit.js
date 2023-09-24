import "./EmployeeEdit.css";
import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeEdit = (props) => {

    const {id} = useParams();
    const [employeeData, setEmployeeData] = useState();
    console.log(id);
    useEffect(() => {
        axios.get(`http://localhost:3000/employee/${id}`)
            .then((res) => {
                const employee = res.data;
                setEmployeeData(employee);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }, [id])

    

    if (!employeeData) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <header>
            <h2>{employeeData.name} {employeeData.surname}</h2>
            <h4>{employeeData.location}</h4>
        </header>
        <div className = 'table-container'>
            <table>
                <tr>
                    <td>
                        <NavLink to= {`/employeeDetails/${props.id}`} >
                            <button>
                                Detalii angajat
                            </button>
                        </NavLink >
                    </td>
                </tr>
                <tr>
                    <td>Feedback</td>
                </tr>
                <tr>
                    <td>Detalii salariale</td>
                </tr>
                <tr>
                    <td>Concedii</td>
                </tr>
            </table>
        </div>
        </>
    )
}

export default EmployeeEdit;