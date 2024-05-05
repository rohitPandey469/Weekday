import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobsBasedOnFilter } from "../../actions/jobActions";
import styles from "./JobFilter.module.css";
import Select from "react-select";
import {
  OptionsForExp,
  GroupedOptionsForRoles,
  OptionsForLocation,
  OptionsForPay,
  OptionsForRemote,
  OptionsForStack,
} from "./data";

const JobFilter = ({ setIsFormFilled, filterParams, setFilterParams }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isFormFilled = Object.values(filterParams).some(
      (value) => value && (Array.isArray(value) ? value.length > 0 : true)
    );
    console.log("Is form filled", isFormFilled);
    setIsFormFilled(isFormFilled);
  }, [filterParams]);

  // const handleSubmit = () => {
  //   console.log("Fetch Jobs based on filter!!!", filterParams);
  //   dispatch(fetchJobsBasedOnFilter(filterParams, 0)); // Assuming offset value is 0 initially
  // };

  // Usage of React Select
  const handleRoleChange = (selectedOption) => {
    setFilterParams({
      ...filterParams,
      jobRole: selectedOption.map((option) => option.value), // Assuming jobRole is an array
    });
  };

  const handleExpChange = (selectedOption) => {
    setFilterParams({
      ...filterParams,
      minExp: selectedOption ? selectedOption.value : "", // Assuming minExp is a string
    });
  };

  const handleLocationChange = (selectedOption) => {
    setFilterParams({
      ...filterParams,
      location: selectedOption ? selectedOption.value : "", // Assuming location is a string
    });
  };

  const handlePayChange = (selectedOption) => {
    setFilterParams({
      ...filterParams,
      minJdSalary: selectedOption ? selectedOption.value : "", // Assuming minJdSalary is a string
    });
  };

  const handleRemoteChange = (selectedOption) => {
    setFilterParams({
      ...filterParams,
      remote: selectedOption ? selectedOption.value : "", // Assuming remote is a string
    });
  };

  const handleStackChange = (selectedOption) => {
    setFilterParams({
      ...filterParams,
      stack: selectedOption ? selectedOption.value : "", // Assuming stack is a string
    });
  };

  const handleCompanyNameChange = (e) => {
    setFilterParams({
      ...filterParams,
      companyName: e.target.value ? e.target.value : "", // Assuming companyName is a string
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <Select
          className={styles.selectinput}
          options={GroupedOptionsForRoles}
          placeholder="Roles"
          isMulti
          isClearable
          onChange={handleRoleChange}
        />
        <Select
          className={styles.selectinput}
          options={OptionsForExp}
          placeholder="Experience"
          isClearable
          onChange={handleExpChange}
        />
        <Select
          className={styles.selectinput}
          options={OptionsForLocation}
          placeholder="Location"
          isClearable
          onChange={handleLocationChange}
        />
        <Select
          className={styles.selectinput}
          options={OptionsForPay}
          placeholder="Minimum Base Pay Salary"
          isClearable
          onChange={handlePayChange}
        />
        <Select
          className={styles.selectinput}
          options={OptionsForRemote}
          placeholder="Remote"
          isClearable
          onChange={handleRemoteChange}
        />
        <Select
          className={styles.selectinput}
          options={OptionsForStack}
          placeholder="Stack"
          isClearable
          onChange={handleStackChange}
        />
        <input
          type="text"
          name="companyName"
          onChange={handleCompanyNameChange}
          placeholder="Search Company Name"
          value={filterParams.companyName}
          className={styles.company}
        />
      </div>
    </div>
  );
};

export default JobFilter;
