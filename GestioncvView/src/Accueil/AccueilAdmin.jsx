import React, {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from "axios";

function Acceuil() {
    const [newCv, setNewCv] = useState(0);
    const [cvTotal, setCvTotal] = useState(0);
    const [skills, setSkills] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(()=> {
        axios.get('http://localhost:8080/personnes/stat/new_resume', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setNewCv(response.data.data);
        }).catch((error) => {
            console.log('error: ', error);
        });

        axios.get('http://localhost:8080/personnes/stat/skills/count_all_Skills', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setSkills(response.data.data);
        }).catch((error) => {
            console.log('error: ', error);
        });

        axios.get('http://localhost:8080/personnes/stat/resume/count_all_resume', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setCvTotal(response.data.data);
        }).catch((error) => {
            console.log('error: ', error);
        });
    }, []);

    const chartOptions = {
        series: [{
            name: 'Nouveaux CV reçus',
            data: [0, newCv],
        }, {
            name: 'Compétences',
            data: [0, skills]
        },{
            name: 'Cv total',
            data: [0, cvTotal]
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
        },
        colors: ['#4154f1', '#2eca6a', '#8c478c'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
    };

    return (
        <main id="main" className="main">
            <section className="section dashboard">
                <div className="row">
                    {/* Total des CV */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">Total des CV</h5>
                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-file-earmark-text"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6>{cvTotal}</h6>
                                        <p className="text-muted small">Nombre total de CV enregistrés dans le système.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="filter">
                                <a className="icon" href="#1" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a className="dropdown-item" href="#today">Today</a></li>
                                    <li><a className="dropdown-item" href="#month">This Month</a></li>
                                    <li><a className="dropdown-item" href="#year">This Year</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Nouveaux CV reçus <span>| Aujourd'hui</span></h5>
                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-file-earmark-text"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6>{newCv}</h6> {/* Utilisez la valeur récupérée */}
                                        <span className="text-success small pt-1 fw-bold"></span> <span className="text-muted small pt-2 ps-1">Nombres de cv reçus</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Candidats évalués */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card revenue-card">
                            <div className="filter">
                                <a className="icon" href="#2" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a className="dropdown-item" href="#today">Today</a></li>
                                    <li><a className="dropdown-item" href="#month">This Month</a></li>
                                    <li><a className="dropdown-item" href="#year">This Year</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Compétences totales</h5>
                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-person-check"></i> {skills}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card">
                            <div className="filter">
                                <a className="icon" href="#4" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a className="dropdown-item" href="#today">Today</a></li>
                                    <li><a className="dropdown-item" href="#month">This Month</a></li>
                                    <li><a className="dropdown-item" href="#year">This Year</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Rapports <span>/ Aujourd'hui</span></h5>
                                <ReactApexChart options={chartOptions} series={chartOptions.series} type="area" height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Acceuil;
