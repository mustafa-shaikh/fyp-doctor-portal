import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const user = accountService.userValue;
    const initialValues0 = {
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const initialValues1 = {
        hospital: "",
        feePercentage: "",
        licenseNumber: "",
    };

    const validationSchema0 = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    });

    const validationSchema1 = Yup.object().shape({
        hospital: Yup.string()
            .required('Hospital is required'),
        feePercentage: Yup.string()
            .required('Fee Percentage is required'),
        licenseNumber: Yup.string()
            .required('License Number is required'),
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        console.log("I am here!!")
        if (isAddMode) {
            console.log("abc")
            createUser(fields, setSubmitting);
        } else {
            console.log("deff")
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        comsole.log(fields)
        // const data = {
        //     hospital: user.hospital,
        //     feePercentage: user.feePercentage,
        //     licenseNumber: user.licenseNumber,
        // };
        accountService.create(fields)
            .then(() => {
                alertService.success('User added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        accountService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <>
        
        <Formik initialValues={initialValues0} validationSchema={validationSchema0} >
            {({ errors, touched, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        accountService.getById(id).then(user => {
                            const fields0 = ['title', 'firstName', 'lastName', 'email'];
                            fields0.forEach(field => setFieldValue(field, user[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Edit User' : 'Edit User'}</h1>
                        <div className="form-row">
                        <div className="form-group">
                                <label>Title</label>
                                <Field name="title" type="text" readOnly className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>First Name</label>
                                <Field name="firstName" type="text" readOnly className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            </div>

                            
                            <div className="form-row">
                            <div className="form-group col-5">
                                <label>Last Name</label>
                                <Field name="lastName" type="text" readOnly className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-row">
                            <div className="form-group col-15">
                                <label>Email</label>
                                <Field name="email" type="text" readOnly className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
        <Formik initialValues={initialValues1} validationSchema={validationSchema1} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    console.log("Is add more", isAddMode);
                    if (!isAddMode) {
                        // get user and set form fields
                        accountService.getById(id).then(user => {
                            const fields1 = ['hospital','feePercentage', 'licenseNumber'];
                            fields1.forEach(field => setFieldValue(field, user[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>

                        <div className="form-row">
                        {/* <div className="form-group col-5">
                            <label>Hospital</label>
                            <Field name="hospital" as="select" className={'form-control' + (errors.hospital && touched.title ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="AKU">AKU</option>
                                <option value="LNH">LNH</option>
                                <option value="NMC">NMC</option>
                                <option value="SC">SC</option>
                            </Field>
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div> */}

                        <div className="form-group col-2">
                            <label>Hospital</label>
                            <Field name="hospital" type="text" className={'form-control' + (errors.hospital && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="hospital" component="div" className="invalid-feedback" />
                        </div>

                        
                        <div className="form-group col-2">
                            <label>Fee Percentage</label>
                            <Field name="feePercentage" type="text" className={'form-control' + (errors.feePercentage && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="feePercentage" component="div" className="invalid-feedback" />
                        </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-5">
                            <label>Doctor License Number</label>
                            <Field name="licenseNumber" type="text" className={'form-control' + (errors.licenseNumber && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="licenseNumber" component="div" className="invalid-feedback" />
                        </div>
                        </div>
                        
                        <div className="form-group">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Submit
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
        
        </>
    );
}

export { AddEdit }