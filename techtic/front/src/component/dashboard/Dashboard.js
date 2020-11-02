import React, { useState, Fragment } from "react";
import Header from '../layouts/Header';
import request from '../../request';
import { toast } from 'react-toastify';
import { getErrors } from '../../auth';
import classNames from 'classnames';

const Dashboard = (props) => {

  const [surveyForm, setSurveyForm] = useState({
    university_name: '',
    worth_money: '',
    seminar_rate: '',
    next_seminar_on: [],
    suggestion: ''
  });
  const [errors, setErrors] = useState({});
  const [isDisable, setIsDisable] = useState(false);

  const seminarSubject = [
      {
          name: 'artificial_intelligence',
          label: 'Artificial Intelligence',
      },
      {
        name: 'cloud_computing',
        label: 'Cloud Computing',
      },
      {
        name: 'cyber_security',
        label: 'Cyber Security',
      },
      {
        name: 'big_data_analysis',
        label: 'Big Data Analysis',
      },
  ];

  const onChange = (e) => {
    setSurveyForm({ ...surveyForm, [e.target.name] : e.target.value});
  }

  const onNextSeminarChange = (e) => {

    if (e.target.checked) {
      setSurveyForm({ ...surveyForm, next_seminar_on: [...surveyForm.next_seminar_on, e.target.value]});
    } else {
      setSurveyForm({ ...surveyForm, next_seminar_on: surveyForm.next_seminar_on.filter(val => val !== e.target.value )});
    }
  }

  const submitSurvey = () => {
    setIsDisable(true);
    request.post(`/user/survey`, surveyForm).then((res) => {
      setErrors({});
      setIsDisable(false);
      toast.success(res.response.data.message);
    }).catch((err) => {
      setIsDisable(false);
      toast.error(err.response.data.message);
      setErrors(getErrors(err.response.data).fields);
    });
  }

  return (
    <Fragment>
     <Header title="Dashboard"/>
     <div className="bd-example">
       <div className="bg-light p-25">
        <div className="survey-container">
          <div className="jumbotron">
            <b>Seminar Evaluation Survey</b>
          </div>
          <div className="p-25 center">
            <form>
              <div className="form-group">
                <label htmlFor="university_name" className="float-left">University Name</label>
                <input 
                  type="email" 
                  className={classNames('form-control', {
                    'is-invalid': errors.university_name,
                  })} 
                  name="university_name"
                  onChange={onChange}/>
              </div>
              <div className="form-group row">
                <div className="col-md-12"><label htmlFor="worth_money" className="float-left">Was it worth its money?</label> </div>
                <div className="form-check col-md-12 text-left ml-4">
                  <input className={classNames('form-check-input', {
                    'is-invalid': errors.worth_money,
                  })}  type="radio" name="worth_money" id="worth_money_yes" onChange={onChange} value="yes"/>
                  <label className="form-check-label" htmlFor="worth_money_yes">
                    Yes
                  </label>
                </div>
                <div className="form-check col-md-12 text-left ml-4">
                  <input className={classNames('form-check-input', {
                    'is-invalid': errors.worth_money,
                  })} type="radio" name="worth_money" id="wortyh_money_no" onChange={onChange} value="no"/>
                  <label className="form-check-label" htmlFor="wortyh_money_no">
                    No
                  </label>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12"><label htmlFor="university" className="float-left">On average how would you rate the seminar?</label> </div>
                <div className="form-check col-md-12 text-left ml-4">
                  <input className={classNames('form-check-input', {
                    'is-invalid': errors.seminar_rate,
                  })} type="radio" name="seminar_rate" id="seminar_rate_good" onChange={onChange} value="good"/>
                  <label className="form-check-label" htmlFor="seminar_rate_good">
                    Good
                  </label>
                </div>
                <div className="form-check col-md-12 text-left ml-4">
                  <input className={classNames('form-check-input', {
                    'is-invalid': errors.seminar_rate,
                  })} type="radio" name="seminar_rate" id="seminar_rate_bad" onChange={onChange} value="bad"/>
                  <label className="form-check-label" htmlFor="seminar_rate_bad">
                    Bad
                  </label>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12"><label htmlFor="university" className="float-left">On what subject would you like to have the seminar?</label> </div>
                {
                  seminarSubject.map((item, key) => (
                    <div className="form-check col-md-12 text-left ml-4" key={key}>
                      <input className={classNames('form-check-input', {
                          'is-invalid': errors.next_seminar_on,
                        })} type="checkbox" name={item.name} value={item.name} id={key} onChange={onNextSeminarChange}/>
                      <label className="form-check-label" htmlFor={key}>
                        {item.label}
                      </label>
                    </div>
                  ))
                }
              </div>
              <div className="form-group">
                <label htmlFor="university" className="float-left">What can be improved?</label>
                <textarea className={classNames('form-control', {
                          'is-invalid': errors.suggestion,
                        })} name="suggestion" rows="3" onChange={onChange}></textarea>
              </div>
              <div className="form-group">
                <button type="button" class="btn btn-primary mb-2" onClick={submitSurvey} disabled={isDisable}> Submit </button>
              </div>
            </form>
          </div>
        </div>
       </div>
     </div>
    </Fragment>
  );
}

export default Dashboard;